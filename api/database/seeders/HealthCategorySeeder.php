<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HealthCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('health_categories')->insert([
        //     'title' => 'Headaches/Migraines',
        //     'description' => '',
        //     'bg_color' => '#2e86de',
        //     'font_color' => '#fff'
        // ]);

        DB::table('health_categories')->insert([
            'title' => 'Tension or stress-related issues',
            'description' => '',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('health_categories')->insert([
            'title' => 'Eye infections (e.g., conjunctivitis)',
            'description' => '',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('health_categories')->insert([
            'title' => 'Glaucoma',
            'description' => '',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('health_categories')->insert([
            'title' => 'Cataracts',
            'description' => '',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);
    }
}
