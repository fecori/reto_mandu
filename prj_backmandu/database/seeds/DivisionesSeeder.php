<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('divisions')->insert([
            'division_nombre' => 'CEO',
            'division_superior' => 'Dirección General',
            'colaboradores' => 1,
            'nivel' => 1,
            'embajadores' => 'Jordyn Herwitz'
        ]);
        DB::table('divisions')->insert([
            'division_nombre' => 'Mandu-Corp',
            'division_superior' => 'Dirección General',
            'colaboradores' => null,
            'nivel' => null,
            'embajadores' => null,
        ]);
        DB::table('divisions')->insert([
            'division_nombre' => 'Growth',
            'division_superior' => 'Producto',
            'colaboradores' => null,
            'nivel' => null,
            'embajadores' => null,
        ]);
        DB::table('divisions')->insert([
            'division_nombre' => 'Strategy',
            'division_superior' => 'Dirección General',
            'colaboradores' => null,
            'nivel' => null,
            'embajadores' => null,
        ]);
        DB::table('divisions')->insert([
            'division_nombre' => 'CEO',
            'division_superior' => 'Operaciones',
            'colaboradores' => null,
            'nivel' => null,
            'embajadores' => null,
        ]);
    }
}
