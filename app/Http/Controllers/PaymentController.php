<?php

namespace App\Http\Controllers;

use App\Services\PayPal;
use Illuminate\Http\Request;
use App\resolvers\PaymentPlatformResolver;

class PaymentController extends Controller
{
    protected $paymentPlatformResolver;

    public function __construct(PaymentPlatformResolver $paymentPlatformResolver)
    {
        $this->paymentPlatformResolver = $paymentPlatformResolver;
    }

    public function pay(Request $request){

        //dd($request->all());
        $rules = [
            'value' =>  'required|numeric|min:5',
            'currency' => 'required|exists:currencies,iso',
            'platform' => 'required|exists:payment_platforms,id'
        ];

        $this->validate($request, $rules);

        $paymentPlatform = $this->paymentPlatformResolver->resolveService($request->platform);

        session()->put('paymentPlatform_id', $request->platform);

        return $paymentPlatform->handlePayment($request);
    }

    public function approval(){
        
        if(session()->has('paymentPlatform_id')){
            $paymentPlatform = $this->paymentPlatformResolver->resolveService(session()->get('paymentPlatform_id'));
            return $paymentPlatform->handleApproval();
        }

        return redirect()->route('home')->withErrors('No sé encontró la plataforma de pago');
       
    }

    public function cancelled(){
        
        return redirect()->route('home')->withErrors('Cancelaste tu pago');
    }
}
