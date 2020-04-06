<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modul extends Model
{
    const TotalMaximo = 5;

    protected $fillable = [
        'name', 
    ];
    
    public function student(){
        return $this->belongsTo(Student::class);
    }

}
