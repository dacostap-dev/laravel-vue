<?php

use App\User;
use App\Promotion;
use Illuminate\Database\Seeder;

class PromotionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::select('id')->get();
        for($i=0; $i<10; $i++){
            factory(Promotion::class)->create([
                'user_id' => $users->random()->id
            ]);
        }
     
    }
}
