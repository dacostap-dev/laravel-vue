<?php

namespace App\Services;

use App\Transaction;
use Illuminate\Http\Request;
use App\Traits\ConsumeExternalServices;

class CurrencyConversion{
    use ConsumeExternalServices;
    
    protected $base_uri;
    protected $api_key;

    public function __construct(){
        $this->base_uri = config('services.currency_conversion.base_uri');
        $this->api_key = config('services.currency_conversion.api_key');
    }

    public function resolveAuthorization(&$headers, &$queryParams, &$formParams){
        $queryParams['apiKey'] = $this->resolveAccessToken();
    }

    public function decodeResponse($response){
        return json_decode($response);
    }

    public function resolveAccessToken(){
        return $this->api_key; //Aunque retorne solo la key, es para seguir el formato
    }

    public function convertCurrency($from, $to){
        $response = $this->makeRequest(
            'get',
            '/api/v7/convert',
            [
                'q' => "{$from}_{$to}", 
                'compact' => 'ultra'
            ]
        );

        return $response->{strtoupper("{$from}_{$to}")}; //Obtenemos la data dinamicamente 
    }


}