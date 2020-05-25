<?php

namespace App\Http\Controllers\Promotion;

use App\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;

class PromotionController extends ApiController
{
    public function __construct(){
        parent::__construct(); //Esto va en los que requiera si o si autenticacion, hereda de Apicontroller, podria estar en un group en api.php
      // $this->middleware('client')->only('index');
    }

    public function index(){
        $promotions = auth()->user()->promotions;
        return $this->showAll($promotions);
    }

    public function show(Promotion $promotion)
    {
        return $promotion;
    }

    public function store(Request $request){
        $rules = [
            'name' => 'required'
        ];

        $messages = [
            'name.required' => 'El nombre es requerido'
        ];

        $this->validate($request, $rules, $messages);

        $campos = $request->all();
        $campos['user_id'] = auth()->user()->id;
        $promotion = Promotion::create($campos);
        
        return $promotion;
    }

    public function update(Request $request, Promotion $promotion){
        
        if($request->has('name')){
            $promotion->name = $request->name;
        }

        if(!$promotion->isDirty()){
            return response()->json(['error' => 'Debe tener un campo diferente']);
        }

        $promotion->save();
        return $promotion;
    }
}
