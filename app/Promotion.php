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
        'porcentaje'
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
                $query->whereNull('informe')
                ->orWhereNull('solicitud')
                ->orWhereNull('memorandum');
            })->count() == 0;
            //return $student->moduls()->whereNotNull('informe')->count() == Modul::TotalMaximo;
        })->count();
        
    }

    public function getPorcentajeAttribute()
    {
        return $this->total_alumnos != 0 ? $this->alumnos_aprobados * 100 / $this->total_alumnos : 0 ;
    }

}
