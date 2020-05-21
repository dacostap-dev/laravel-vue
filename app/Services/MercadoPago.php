<?php

namespace App\Services;

use App\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;
use App\Services\CurrencyConversion;
use App\Traits\ConsumeExternalServices;

class MercadoPago{
    use ConsumeExternalServices;
    
    protected $key;
    protected $secret;
    protected $base_uri;
    protected $base_currency;
    protected $converter;

    public function __construct(CurrencyConversion $converter){
        $this->base_uri = config('services.mercadopago.base_uri');
        $this->key = config('services.mercadopago.key');
        $this->secret = config('services.mercadopago.secret');
        $this->base_currency = config('services.mercadopago.base_currency');
        
        $this->converter = $converter;
    }

    public function resolveAuthorization(&$headers, &$queryParams, &$formParams){
        $queryParams['access_token'] = $this->resolveAccessToken();
    }

    public function decodeResponse($response){
        return json_decode($response); 
    }

    public function resolveAccessToken(){
        return $this->secret;
    }

    public function handlePayment(Request $request){

        $request->validate([      //No estoy en controlador por eso validate del request
            'card_network' => 'required',
            'token' => 'required'
        ]);
  
        $payment = $this->createPayment($request->value, $request->currency, $request->card_network, $request->token, 'example@hotmail.com');

        if($payment->status == "approved"){

            $name = $payment->payer->first_name;
            $currency = strtoupper($payment->currency_id);
            $amount = number_format($payment->transaction_amount, 0, '', '.');

          
            $originalAmount = $request->value;
            $originalCurrency = strtoupper($request->currency);

             //Opcion al no poder redireccionar por ser ajax
            session()->flash('status', "Gracias {$name}, tu pago por {$originalAmount} {$originalCurrency} fue recibibo en {$amount} {$currency}");
            return route('home');
        }

        //Opcion al no poder redireccionar por ser ajax
        $messageBag = new MessageBag;
        $messageBag->add('errors', 'No pudimos identificar el pago');
        session()->flash('errors', $messageBag);
        return route('home');

    }

    public function createPayment($value, $currency, $cardNetwork, $token, $email, $installments = 1){

        return $this->makeRequest(
            'post',
            '/v1/payments',
            [],
            [
                'payer' => [
                    'email' => $email
                ],
                'binary_mode' => true,
                'transaction_amount' => round($value * $this->resolveFactor($currency)),
                'payment_method_id' => $cardNetwork,
                'token' => $token,
                'installments' => $installments,
                'statement_descriptor' => config('app.name')
            ],
            [],
            $isJsonRequest = true 
        );
    }

    public function resolveFactor($currency){
        return $this->converter->convertCurrency($currency, $this->base_currency);
    }

}
