<?php

namespace App\Services;

use App\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Traits\ConsumeExternalServices;

class PayPal{
    use ConsumeExternalServices;
    
    protected $base_uri;
    protected $client_id;
    protected $client_secret;

    public function __construct(){
        $this->base_uri = config('services.paypal.base_uri');
        $this->client_id = config('services.paypal.client_id');
        $this->client_secret = config('services.paypal.client_secret');
    }

    public function resolveAuthorization(&$headers, &$queryParams, &$formParams){
        $headers['Authorization'] = $this->resolveAccessToken();
    }

    public function decodeResponse($response){
        return json_decode($response);
    }

    public function resolveAccessToken(){
        $credentials = base64_encode("{$this->client_id}:{$this->client_secret}");
        return "Basic {$credentials}";
    }

    public function handlePayment(Request $request){
        $order = $this->createOrder($request->value, $request->currency);

        $orderLinks = collect($order->links);

        $approve = $orderLinks->where('rel', 'approve')->first();

        //session()->put('approvalId', $order->id); //Para usarios logeados en web
        //return redirect($approve->href); para version web

      //  Para api guardar orden_id en otra tabla
        Transaction::create([
            'order_id' => $order->id,
            'user_id' => auth()->user()->id,
            'payment_platform_id' => '1'
        ]);

        return $approve->href; // para vue
    }

    public function handleApproval(){

        //dd(request()->all());

        if(request()->token){ //session()->has('approvalId')
            $approvalId = request()->token;// session()->get('approvalId');
            $payment = $this->capturePayment($approvalId);

            if($payment->status == "COMPLETED"){
                $transaction = Transaction::where('order_id', $approvalId)->first();
                $transaction->status = 'COMPLETED';
                $transaction->save();     
            }

            $name = $payment->payer->name->given_name;

            $paydetail = $payment->purchase_units[0]->payments->captures[0]->amount;
            $amount = $paydetail->value;
            $currency = $paydetail->currency_code;

            return redirect()->route('home')->with('status', "Gracias {$name} por pagar {$amount} {$currency}");;

        }

        return 'no tiene';
    }

    public function createOrder($value, $currency){
        return $this->makeRequest(
            'post', 
            '/v2/checkout/orders',
            [],
            [
                'intent' => 'CAPTURE',
                'purchase_units' => [
                    0 => [
                        'amount' => [
                            'currency_code' => strtoupper($currency),
                            'value' => $value, 
                        ]
                    ]
                ],
                'application_context' => [
                    'brand_name' => config('app.name'),
                    'shipping_preferences' => 'NO_SHIPPING',
                    'user_action' => 'PAY_NOW',
                    'return_url' => route('approval'),
                    'cancel_url' => route('cancelled')
                ]
            ],
            [],
            $isJson  = true
        );
    }

    public function capturePayment($approvalId){
        return $this->makeRequest(
            'post',
            "/v2/checkout/orders/{$approvalId}/capture",
            [],
            [],
            [
                'Content-Type' => 'application/json',
            ]
        );
    }
}