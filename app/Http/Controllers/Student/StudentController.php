<?php

namespace App\Http\Controllers\Student;

use App\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudentController extends Controller
{
    public function index(){
        $students = Student::all();
        return $students;
    }

    public function show(Student $student)
    {
        return $student;
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required',
            'gender' => 'required',
        ];

        $message = [
            'name.required' => 'El nombre es obligatorio',
            'email.required' => 'La descripcion es obligatoria',
            'gender.required' => 'El genero es obligatorio',
        ];

        $this->validate($request, $rules, $message);
        $student = Student::create($request->all());
        return $student;
    }

    public function update(Request $request, Student $student)
    {
        if($request->has('name')){
            $student->name = $request->name;
        }
        if($request->has('email')){
            $studentv->email = $request->email;
        }
        if($request->has('gender')){
            $student->gender = $request->gender;
        }
   
        if(!$student->isDirty()){
            return response()->json(['error' => 'debe tener campos diferentes']);
        }

        $student->save();
        return $student;
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return $student;
    }
}
