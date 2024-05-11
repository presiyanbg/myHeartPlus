<?php

namespace Database\Seeders;

use App\Models\Constant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert([
            'role' => 'patient',
            'level' => '1'
        ]);

        DB::table('user_roles')->insert([
            'role' => 'doctor',
            'level' => '2'
        ]);

        DB::table('user_roles')->insert([
            'role' => 'manager',
            'level' => '3'
        ]);

        DB::table('user_roles')->insert([
            'role' => 'admin',
            'level' => Constant::ADMIN_LEVEL,
        ]);
    }
}
