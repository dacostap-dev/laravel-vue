<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);//admin
        $this->call(NotesTableSeeder::class);
        $this->call(PromotionsTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
        $this->call(ModulsTableSeeder::class);
        $this->call(PromotionsTableSeeder::class);
    }
}
