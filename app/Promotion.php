<?php

namespace App;

use App\Student;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    public function students(){
        return $this->hasMany(Student::class);
    }
}
