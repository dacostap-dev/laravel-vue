<?php

namespace App;

use App\User;
use App\Modul;
use App\Student;
use App\Promotion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Promotion extends Model
{

    protected $fillable = ['name', 'user_id'];
    
    protected $appends = [
        'total_alumnos',
        'alumnos_aprobados',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function students(){
        return $this->hasMany(Student::class)->orderBy('name');
    }

    public function getTotalAlumnosAttribute(){
        return $this->students()->count();
    }

    public function getAlumnosAprobadosAttribute(){
      
       return $this->students()->get()->filter(function ($student, $key) {
            return $student->moduls()->where(function ($query) {
                $query->whereNotNull('informe')
                ->WhereNotNull('solicitud')
                ->WhereNotNull('memorandum');
            })->count() == Modul::TotalMaximo;
            //return $student->moduls()->whereNotNull('informe')->count() == Modul::TotalMaximo;
        })->count();
        
    }
}
