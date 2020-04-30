<?php

namespace App\Http\Controllers\Modul;

use App\Modul;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ModulController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(){
        parent::__construct(); //Esto va en los que requiera si o si autenticacion, hereda de Apicontroller, podria estar en un group en api.php
     }

    public function index()
    {
        $moduls = Modul::all();
        return $moduls;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Modul $modul)
    {
        if($modul->student->promotion->user->id != auth()->user()->id){
            return response()->json(['data' => 'No autorizado'], 401);
        };
    
        if($request->has('name')){
            $modul->name = $request->name;
        }
        if($request->has('solicitud')){
            $modul->solicitud = $request->solicitud;
        }
        if($request->has('memorandum')){
            $modul->memorandum = $request->memorandum;
        }
        if($request->has('informe')){
            $modul->informe = $request->informe;
        }
   
        if(!$modul->isDirty()){
            return response()->json(['error' => 'debe tener campos diferentes']);
        }

        $modul->save();
        return $modul;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
