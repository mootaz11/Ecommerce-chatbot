<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'secondname'=>$faker->name,
        'verified'=>$faker->boolean,
        'email' => $faker->unique->companyEmail,
        'password'=>$faker->password,
        'created_at' => $faker->date,
        'updated_at' => $faker->date 
     ];
});
