<?php

namespace App;

use App\Modul;
use App\Student;
use App\Promotion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Promotion extends Model
{

    protected $fillable = ['name'];
    
    protected $appends = [
        'total_alumnos',
        'alumnos_aprobados',
    ];

    public function students(){
        return $this->hasMany(Student::class);
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
