<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/* 
DB::listen(function($e){ //Para ver las consultas que se ejecuttan
    dump($e->sql);
}); */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('notas', 'Note\NoteController')->except(['edit', 'create']);

//Promotions
Route::resource('promotions', 'Promotion\PromotionController')->except(['edit', 'create']);
Route::resource('promotions.students', 'Promotion\PromotionStudentController')->only(['index']);

//Students
Route::resource('students', 'Student\StudentController')->except(['edit', 'create']);
Route::resource('students.moduls', 'Student\StudentModulController')->only(['index', 'store']);

//Moduls
Route::resource('moduls', 'Modul\ModulController')->except(['edit', 'create']);