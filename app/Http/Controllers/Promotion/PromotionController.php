<?php

namespace App\Http\Controllers\Promotion;

use App\Promotion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PromotionController extends Controller
{
    public function index(){
        $promotions = Promotion::all();
        return $promotions;
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

        $promotion = Promotion::create($request->all());
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
