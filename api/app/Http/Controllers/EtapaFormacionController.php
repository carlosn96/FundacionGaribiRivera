<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\EtapaFormacion;

class EtapaFormacionController extends Controller
{
    // Listar todas las etapas de formación usando la vista
    public function index(Request $request): JsonResponse
    {
        try {
            $etapas = EtapaFormacion::all();
            return ApiResponse::success($etapas, 'Etapas de formación obtenidas exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener las etapas de formación: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener una etapa específica usando la vista
    public function show(Request $request, $id): JsonResponse
    {
        try {
            $etapa = EtapaFormacion::findById($id);
            if (!$etapa) {
                return ApiResponse::notFound('Etapa de formación no encontrada');
            }
            return ApiResponse::success($etapa, 'Etapa de formación obtenida exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener la etapa de formación: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Ejemplo de método para crear (usando el modelo de la tabla)
    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'nombre' => 'required|string',
                'fecha_inicio' => 'required|date',
                'fecha_fin' => 'required|date',
                'id_tipo' => 'required|integer',
                'es_actual' => 'boolean'
            ]);

            $etapa = EtapaFormacion::create($data);
            return ApiResponse::success($etapa, 'Etapa de formación creada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al crear la etapa de formación: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public static function getCurrentEtapaId(): int
    {
        $etapa = EtapaFormacion::actual();
        return $etapa
            ? ($etapa->id_etapa ?? $etapa->idEtapa ?? 0)
            : 0;
    }

    // Otros métodos CRUD si se necesitan
}