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
        'porcentaje',
        'promotion_name'
    ];

    public function moduls(){
        return $this->hasMany(Modul::class);
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
        return $this->moduls()->where('name', 'Modulo 1')->get()->count();
    }

    public function getPorcentajeAttribute()
    {
        return $this->count_moduls != 0 ? $this->moduls_complete * 100 / $this->count_moduls : 0 ;
    }

    public function getPromotionNameAttribute()
    {
        return $this->promotion()->first()->name; //checkear esto
    }
}
