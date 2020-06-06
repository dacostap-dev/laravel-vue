<?php

namespace App\Http\Controllers\Student;

use App\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class StudentController extends ApiController
{
    public function index(){
        $students = Student::all();
        return $this->showAll($students);
    }

    public function show(Student $student)
    {
        return $student;
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:students',
            'gender' => 'required',
        ];

        $message = [
            'name.required' => 'El nombre es obligatorio',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'El email debe ser único',
            'gender.required' => 'El genero es obligatorio',
        ];

        $this->validate($request, $rules, $message);
        $data = $request->all();

        if($request->has('image')){
            $data['image']  = $request->image->store('');
        }else{
            $data['image'] = "6.jpg";
        }
        
        $student = Student::create($data);
        return $student;
    }

    public function update(Request $request, Student $student)
    {
        if($request->has('name')){
            $student->name = $request->name;
        }
        if($request->has('email')){
            $student->email = $request->email;
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
