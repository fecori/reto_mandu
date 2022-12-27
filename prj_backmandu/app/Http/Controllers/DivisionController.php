<?php

namespace App\Http\Controllers;

use App\Division;
use App\SubDivision;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function crear(Request $request)
    {
        $guardarDivision = new Division;
        $guardarDivision->division_nombre = $request->division_nombre;
        $guardarDivision->division_superior = $request->division_superior;
        $guardarDivision->colaboradores = $request->colaboradores;
        $guardarDivision->nivel = $request->nivel;
        $guardarDivision->embajadores = $request->embajadores;
        $guardarDivision->save();

        return response()->json(array(
            'error' => false,
            'message' => 'Registro correcto.'
        ));
    }

    public function consultar(Request $request)
    {
        /*$query = Division::join('sub_divisions', 'sub_divisions.divisionId', '=', 'divisions.id')
            ->get(['divisions.*', 'sub_divisions.*']);*/

//        var_dump($test_division);

        $query = new Division();

        if ($request->has('sortColumna') && $request->has('sort')) {
            if ($request->get('sort') == 'asc') {
                $query = $query->orderBy($request->get('sortColumna'), 'asc');
            } else {
                $query = $query->orderBy($request->get('sortColumna'), 'desc');
            }
        }

        if ($request->has('filtro')) {
            $filtrosBusqueda = explode(",", $request->get('filtro'));
            $query = $query->whereIn("division_nombre", $filtrosBusqueda);
        }

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
            'content' => $finalQuery
        ));
    }

    public function listar(Request $request)
    {

        $query = new Division();
        $query = $query->get();

        return response()->json(array(
            'error' => false,
            'content' => $query
        ));
    }

    public function actualizar(Request $request)
    {
        $actualizarDivision = Division::where('id', $request->get('divisionId'));

        if (!$actualizarDivision->count()) {
            return response()->json(array(
                'error' => true,
                'msg' => "No existe la division a actualizar."
            ));
        }

        $actualizarDivision->update(array(
            "division_nombre" => $request->division_nombre,
            "division_superior" => $request->division_superior,
            "colaboradores" => $request->colaboradores,
            "nivel" => $request->nivel,
            "embajadores" => $request->embajadores
        ));

        return response()->json(array(
            'error' => true,
            'msg' => "Se actualizo correctamente."
        ));
    }

    public function eliminar($id)
    {
        $result = Division::find($id);

        if ($result) {
            $result->delete();
            return response()->json(array(
                'error' => false,
                'message' => 'Registro eliminado.'
            ));
        }
        return response()->json(array(
            'error' => false,
            'message' => 'No se encontro el registro.'
        ));
    }
}
