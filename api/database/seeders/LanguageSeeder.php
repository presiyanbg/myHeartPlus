<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            'locale' => 'en',
            'name' => 'English',
            'name_in_native_language' => 'English',
            'date_format' => 'YYYY-MM-DDTHH:mm:ss.sssZ',
            'currency' => '$'
        ]);

        DB::table('languages')->insert([
            'locale' => 'bg',
            'name' => 'Bulgarian',
            'name_in_native_language' => 'Български',
            'date_format' => 'YYYY-MM-DDTHH:mm:ss.sssZ',
            'currency' => 'лв'
        ]);
    }
}
