<?php

namespace App\Http\Controllers\Student;

use App\Modul;
use App\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class StudentModulController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(){
       parent::__construct(); //Esto va en los que requiera si o si autenticacion, hereda de Apicontroller, podria estar en un group en api.php
    }

    public function index(Student $student)
    {
       return $student->moduls;
    }

    public function store(Request $request, Student $student)
    {
      $rules = [
          'name' => 'required'
      ];
      $messages = [
        'name.required' => 'El nombre es requerido'
    ];

      $this->validate($request, $rules, $messages);
      $data = $request->all();
      $data['student_id'] = $student->id;
      $modul = Modul::create($data);

      return $modul;

    }
}
