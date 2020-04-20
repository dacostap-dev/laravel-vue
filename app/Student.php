<?php

namespace App;

use App\Modul;
use App\Promotion;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'email', 'gender' , 'image'];

    protected $appends = [
        'count_moduls',
        'moduls_complete',
    ];

    public function moduls(){
        return $this->hasMany(Modul::class)->orderBy('name');;
    }

    public function promotion(){
        return $this->belongsTo(Promotion::class);
    }

    public function getCountModulsAttribute()
    {
        return $this->moduls()->count();
    }

    public function getModulsCompleteAttribute()
    {
        return $this->moduls()->where(function ($query) {
            $query->whereNotNull('informe')
            ->WhereNotNull('solicitud')
            ->WhereNotNull('memorandum');
        })->count();
    }
}
