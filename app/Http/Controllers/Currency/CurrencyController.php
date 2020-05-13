<?php

namespace App\Http\Controllers\Currency;

use App\Currency;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CurrencyController extends Controller
{
    public function index(){   //Para la web nomas
        $currencies = Currency::all();
        return $currencies;
    }
}
