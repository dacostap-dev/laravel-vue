<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Modul;
use Faker\Generator as Faker;

$factory->define(Modul::class, function (Faker $faker) {
    return [
        'name' => 'Modulo '.$faker->numberBetween($min = 1, $max = 5),
        'solicitud' => $faker->optional()->dateTime($max = 'now', $timezone = null), // DateTime('2008-04-25 08:37:17', 'UTC')
        'memorandum' => $faker->optional()->dateTime($max = 'now', $timezone = null), // DateTime('2008-04-25 08:37:17', 'UTC')
        'informe' => $faker->optional()->numberBetween($min = 150, $max= 300),
    ];
});
