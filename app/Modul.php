<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modul extends Model
{
    const TotalMaximo = 5;
    const TotalItems = 3;

    protected $appends = [
        'items_complete',
        'total_items'
    ];

    protected $fillable = [
        'name', 'solicitud', 'memorandum', 'informe', 'student_id'
    ];
    
    public function student(){
        return $this->belongsTo(Student::class);
    }

    public function getItemsCompleteAttribute(){
        $cantidad = 0;
        if($this->informe != ""){
            $cantidad++;
        }
        if($this->solicitud != ""){
            $cantidad++;
        }
        if($this->memorandum != ""){
            $cantidad++;
        }
        return $cantidad;
    }
    public function getTotalItemsAttribute(){
        return $this::TotalItems;
    }

}
