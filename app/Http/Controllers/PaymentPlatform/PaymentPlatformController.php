<?php

namespace App\Http\Controllers\PaymentPlatform;

use App\PaymentPlatform;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentPlatformController extends Controller
{
    public function index(){   //Para la web nomas
        $platfroms = PaymentPlatform::all();
        return $platfroms;
    }
}
