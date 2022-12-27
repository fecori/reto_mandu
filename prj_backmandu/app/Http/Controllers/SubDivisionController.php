<?php

namespace App\Http\Controllers;

use App\Division;
use App\SubDivision;
use Illuminate\Http\Request;

class SubDivisionController extends Controller
{
    public function listar($divisionId)
    {
        $listaSubdivisiones = SubDivision::where('divisionId', $divisionId)->get();
        return response()->json(array(
            'error' => false,
            'subdiviciones' => $listaSubdivisiones
        ));
    }

    public function crear(Request $request)
    {
        $guardarSubDivision = new SubDivision;
        $guardarSubDivision->divisionId = $request->divisionId;
        $guardarSubDivision->subdivision_nombre = $request->subdivision_nombre;
        $guardarSubDivision->save();

        $query = new Division();
        $finalQuery = [];
        $query = $query->get();
        if ($query->count()) {
            foreach ($query as $key => $item) {
                $querySubdivision = SubDivision::where('divisionId', $item->id)->get();
                $finalQuery[$key] = $item;
                $finalQuery[$key]['sub_divisiones'] = $querySubdivision->count();
            }
        }

        return response()->json(array(
            'error' => false,
            'message' => 'Registro correcto.',
            'content' => $finalQuery
        ));
    }
}
