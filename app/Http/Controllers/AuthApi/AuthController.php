<?php

namespace App\Http\Controllers\AuthApi;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller; 

class AuthController extends Controller
{
    public function login(Request $request){

        $response = Http::post(config('services.passport.login_endpoint'), [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->username,
            'password' => $request->password,
        ]);

        if($response->successful()){
            return $response->getbody();
        };

        if($response->clientError()){
             return response()->json(['data' => 'Credenciales incorrectas']);
        }

        if($response->serverError()){
            return response()->json(['data' => 'Fallo en el Servidor']);
       } 
        
    }

    public function register(Request $request){

        $rules = [ 
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ];

        $this->validate($request, $rules);

        return User::create([
            'name' => $request->name,
            'email' =>  $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    public function logout(){

        auth()->user()->tokens->each(function ($token, $key){
            $token->delete();
        });

        return response()->json(['data' => 'Logout successfully'], 200);
    }
}
