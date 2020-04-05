<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker) {

    $gender = $faker->randomElement(['male', 'female']);

    return [
        'name' => $faker->name($gender),
        'email' => $faker->unique()->safeEmail,
        'gender' => $gender,
    ];
});
