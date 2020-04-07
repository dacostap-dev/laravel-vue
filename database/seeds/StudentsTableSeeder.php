<?php

use App\Student;
use App\Promotion;
use Illuminate\Database\Seeder;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $promocion = Promotion::select('id')->get();
        
        for($i=0; $i<8; $i++){
            factory(Student::class)->create([
                'promotion_id' => $promocion->random()->id,
            ]);
        }
    }
}
