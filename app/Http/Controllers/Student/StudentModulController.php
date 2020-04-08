<?php

namespace App\Http\Controllers\Student;

use App\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudentModulController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Student $student)
    {
       return $student->moduls;
    }
}
