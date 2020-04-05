<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Modul;
use Faker\Generator as Faker;

$factory->define(Modul::class, function (Faker $faker) {
    return [
        'name' => 'Modulo '.$faker->numberBetween($min = 1, $max = 5),
    ];
});
