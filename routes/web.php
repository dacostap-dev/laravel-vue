<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home/my-tokens', 'HomeController@getTokens')->name('personal-tokens');
Route::get('/home/my-clients', 'HomeController@getClients')->name('personal-clients');
Route::get('/home/authorized-clients', 'HomeController@getAuthorizedClients')->name('authorized-clients');


Route::get('/home', 'HomeController@index')->name('home');

Route::get('/apiview', 'HomeController@apiview')->name('apiview');



Route::group(['middleware' => 'auth:web'], function () { 
  
    //Currency
    Route::get('currencies', 'Currency\CurrencyController@index');

    //PaymentPlatform
    Route::get('payment-platforms', 'PaymentPlatform\PaymentPlatformController@index');

    //Payments
    Route::get('/home/show-pay', 'HomeController@show_pay')->name('show-pay');
    Route::post('payments/pay', 'PaymentController@pay')->name('pay');   
    Route::get('payments/approval', 'PaymentController@approval')->name('approval');
    Route::get('payments/cancelled', 'PaymentController@cancelled')->name('cancelled');
});
    
