<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubDivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sub_divisions')->insert([
            'divisionId' => 1,
            'subdivision_nombre' => 'Sub division nombre 1'
        ]);
        DB::table('sub_divisions')->insert([
            'divisionId' => 1,
            'subdivision_nombre' => 'Sub division nombre 2'
        ]);
        DB::table('sub_divisions')->insert([
            'divisionId' => 1,
            'subdivision_nombre' => 'Sub division nombre 3'
        ]);
    }
}
