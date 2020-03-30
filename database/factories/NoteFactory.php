<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Note;
use Faker\Generator as Faker;

$factory->define(Note::class, function (Faker $faker) {
    return [
        'nombre' => $faker->name(),
        'descripcion' => 'una descripcion',
        'activo' => $faker->randomElement(['activo', 'inactivo']),
    ];
});
