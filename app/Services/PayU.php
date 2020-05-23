<?php

namespace App\Services;

use App\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;
use App\Services\CurrencyConversion;
use App\Traits\ConsumeExternalServices;

class PayU{
    use ConsumeExternalServices;
    
    protected $key;
    protected $secret;
    protected $base_uri;
    protected $account_id;
    protected $merchant_id;
    protected $base_currency;
    protected $converter;

    public function __construct(CurrencyConversion $converter){
        $this->base_uri = config('services.payu.base_uri');
        $this->key = config('services.payu.key');
        $this->secret = config('services.payu.secret');
        $this->account_id = config('services.payu.account_id');
        $this->merchant_id = config('services.payu.merchant_id');
        $this->base_currency = strtoupper(config('services.payu.base_currency')); //Siempre en mayúsculas para el signature y enviar la petición
        
        $this->converter = $converter;
    }

    public function resolveAuthorization(&$headers, &$queryParams, &$formParams){
       $formParams['merchant']['apiKey'] = $this->key;
       $formParams['merchant']['apiLogin'] = $this->secret;
    }

    public function decodeResponse($response){
        return json_decode($response); 
    }

    public function generateSignature($refereceCode, $value){
        return md5("{$this->key}~{$this->merchant_id}~{$refereceCode}~{$value}~{$this->base_currency}");
    }


    public function handlePayment(Request $request){

       // dd($request->all());
        $request->validate([      //No estoy en controlador por eso validate del request
            'card' => 'required',
            'cvc' => 'required',
            'month' => 'required',
            'year' => 'required',
            'card_network' => 'required',
            'name' => 'required',
            'email' => 'required',
        ]);
  
        $payment = $this->createPayment($request->value, $request->currency, $request->name, $request->enamil, $request->card, $request->cvc, $request->year, $request->month, $request->card_network);

      //  dd($payment);
        if($payment->error){
            return response()->json(['error' => $payment->error], 422);
        }

        if($payment->transactionResponse->state == "approved"){

            //PayU no devulve info de de como fue la peticion así que los saco del requeste nomas
            $name = $request->name;
            $currency = strtoupper($request->currency);
            $amount = $request->value;

             //Opcion al no poder redireccionar por ser ajax
            session()->flash('status', "Gracias {$name}, por pagar {$amount} {$currency}");
            return route('home');
        }

        //Opcion al no poder redireccionar por ser ajax
        $messageBag = new MessageBag;
        $messageBag->add('errors', "No pudimos identificar el pago - {$payment->transactionResponse->responseCode}");
        session()->flash('errors', $messageBag);
        return route('home');

    }

    public function createPayment($value, $currency, $name, $email, $card, $cvc, $year, $month, $cardNetwork, $installments = 1, $paymentCountry = 'PE'){

        return $this->makeRequest(
            'post',
            'payments-api/4.0/service.cgi',
            [],
            [
                'language' => $language = config('app.locale'),
                'command' => "SUBMIT_TRANSACTION",
                'test' => false,
                'transaction' => [
                    'type' => 'AUTHORIZATION_AND_CAPTURE',
                    'paymentMethod' => strtoupper($cardNetwork),
                    'paymentCountry' => strtoupper($paymentCountry),
                    'deviceSessionId' => session()->getId(),
                    'ipAddress' => request()->ip,
                    'userAgent' => request()->header('User-Agent'),
                    'order' => [
                      'accountId' => $this->account_id,
                      'referenceCode' => $reference = Str::random(12), //Porque debe ser unico, y todos los dev usamos la misa cuenta 
                      'description' => "Testing PayU",
                      'language' => $language,
                      'signature' => $this->generateSignature($reference, $value = round($value * $this->resolveFactor($currency))),
                      'additionalValues' => [
                         'TX_VALUE' => [
                            'value' => $value,
                            'currency' => $this->base_currency
                         ]
                      ],
                      'buyer' => [
                         'fullName' => $value,
                         'emailAddress' => $email,
                         'shippingAddress'=> [
                            'street1' => '',
                            'city' => ''
                         ]
                      ],
                    ],
                   'payer' => [
                      'fullName' => $name,
                      'emailAddress' => $email
                   ],
                   'creditCard' => [
                      'number' =>  $card,
                      'securityCode' => $cvc,
                      'expirationDate' => "{$year}/{$month}",
                      'name' => "APPROVED"
                   ],
                   'extraParameters' => [
                      'INSTALLMENTS_NUMBER' => $installments,
                   ],
                ],
            ],
            [
                'Accept' => 'application/json'
            ],
            $isJsonRequest = true 
        );
    }

    public function resolveFactor($currency){
        return $this->converter->convertCurrency($currency, $this->base_currency);
    }

}
