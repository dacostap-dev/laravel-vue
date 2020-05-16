<?php

namespace App\Services;

use App\Transaction;
use Illuminate\Http\Request;
use App\Traits\ConsumeExternalServices;

class Stripe{
    use ConsumeExternalServices;
    
    protected $key;
    protected $secret;
    protected $base_uri;

    public function __construct(){
        $this->base_uri = config('services.stripe.base_uri');
        $this->key = config('services.stripe.key');
        $this->secret = config('services.stripe.secret');
    }

    public function resolveAuthorization(&$headers, &$queryParams, &$formParams){
        $headers['Authorization'] = $this->resolveAccessToken();
    }

    public function decodeResponse($response){
        return json_decode($response); 
    }

    public function resolveAccessToken(){
        return "Bearer {$this->secret}";
    }

    public function handlePayment(Request $request){
      
        $request->validate([      //No estoy en controlador por eso validate del request
            'token' => 'required'
        ]);

        $intent = $this->createIntent($request->value, $request->currency, $request->token);
        session()->put('paymentIntentId', $intent->id); //Para usarios logeados en web



   /*      Transaction::create([
            'order_id' => $order->id,
            'user_id' => auth()->user()->id,
            'payment_platform_id' => '1'
        ]);
 */
        return route('approval');
    }

    public function handleApproval(){

        if(session()->has('paymentIntentId')){ 

            $paymentIntentId = session()->get('paymentIntentId');
            $confirmation = $this->confirmPayment($paymentIntentId);

            if($confirmation->status == "succeeded"){
           /*      $transaction = Transaction::where('order_id', $approvalId)->first();
                $transaction->status = 'COMPLETED';
                $transaction->save();     
 */
                $name = $confirmation->charges->data[0]->billing_details->name;
                $amount = strtoupper($confirmation->currency);
                $currency = $confirmation->amount / 100;
    
                return redirect()->route('home')->with('status', "Gracias {$name} por pagar {$amount} {$currency}");
            }

        }

        return redirect()->route('home')->withErrors('No pudimos identificar el pago');
    }

    public function createIntent($value, $currency, $paymentMethod){
        return $this->makeRequest(
            'post',
            '/v1/payment_intents',
            [],
            [
                'amount' => $value * 100,
                'currency' => strtolower($currency),
                'payment_method' => $paymentMethod,
                'confirmation_method' => 'manual',
            ],
        );
    }

    public function confirmPayment($paymentIntentId){
        return $this->makeRequest(
            'post',
            "/v1/payment_intents/{$paymentIntentId}/confirm", 
        );
    }

}