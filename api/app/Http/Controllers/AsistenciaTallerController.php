<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Utils\StringHelper;
use Illuminate\Http\Request;
use App\Models\AsistenciaTaller;
use App\Models\Emprendedor;
use App\Models\LineaBase\LineaBase;
use Illuminate\Support\Facades\Validator;
use App\Utils\DateHelper;
use App\Http\Resources\AsistenciaEmprendedorResource;

class AsistenciaTallerController extends Controller
{

    /**
     * Lista los emprendedores inscritos en la etapa dada, con su estatus de asistencia para el taller especifico.
     */
    public function getEmprendedoresPorEtapaTaller($idEtapa, $idTaller)
    {
        try {
            $emprendedores = Emprendedor::with([
                'usuario',
                'asistencias' => function ($q) use ($idTaller, $idEtapa) {
                    $q->where('id_taller', $idTaller)
                      ->where('id_etapa', $idEtapa);
                }
            ])
            ->enEtapa($idEtapa)
            ->get();
            return response()->json(AsistenciaEmprendedorResource::collection($emprendedores));
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los emprendedores: ' . $e->getMessage());
        }
    }

    /**
     * Registra o actualiza la asistencia de un emprendedor a un taller.
     */
    public function registrarAsistencia(Request $request, $idEtapa, $idTaller)
    {
        $validator = Validator::make($request->all(), [
            'idAsistente' => 'required|integer',
            'asiste' => 'required|integer',
            'observacion' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Datos inválidos'. $validator->errors()->first(), ApiResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $idAsistente = $request->input('idAsistente');
        $asiste = $request->input('asiste');
        $observacion = StringHelper::getValidValueOrNull($request->all(), 'observacion');

        try {
            AsistenciaTaller::updateOrCreate(
                [
                    'id_taller' => $idTaller,
                    'id_emprendedor' => $idAsistente,
                    'id_etapa' => $idEtapa,
                ],
                [
                    'asiste' => $asiste,
                    'observacion' => $observacion,
                    'fecha' => DateHelper::getCurrentDate()
                ]
            );
            return ApiResponse::success();
        } catch (\Exception $e) {
            return ApiResponse::error('Error al registrar la asistencia: ' . $e->getMessage());
        }
    }
}
