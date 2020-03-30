<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::all();
        return $notes;
    }

    public function store(Request $request)
    {
        $rules = [
            'nombre' => 'required',
            'descripcion' => 'required',
        ];

        $message = [
            'nombre.required' => 'El nombre es obligatorio',
            'descripcion.required' => 'La descripcion es obligatoria',
        ];

        $this->validate($request, $rules, $message);
        $nota = Note::create($request->all());
        return $nota;
    }

    public function show($id)
    {
        $note = Note::findOrFail($id);
        return $note;
    }

    public function update(Request $request, $id)
    {
        $nota = Note::findOrFail($id);
        if($request->has('nombre')){
            $nota->nombre = $request->nombre;
        }
        if($request->has('descripcion')){
            $nota->descripcion = $request->descripcion;
        }
        if($request->has('activo')){
            $nota->activo = $request->activo;
        }
   
        if(!$nota->isDirty()){
            return response()->json(['error' => 'debe tener campos diferentes']);
        }

        $nota->save();
        return $nota;
    }

    public function destroy($id)
    {
        $nota = Note::findOrFail($id);
        $nota->delete();

        return $nota;
    }
}
