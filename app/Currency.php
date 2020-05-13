<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $primary_key = 'iso';

    public $incrementing = false;

    protected $fillable = [
        'name',
        'image'
    ];
}
