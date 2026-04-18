<?php

namespace App\Http\Controllers;

use App\Models\Taller;
use App\Http\Resources\TallerResource;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\CronogramaTaller;
use App\Models\EtapaFormacion;

class TallerController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $talleres = Taller::with(['instructor', 'tipo_taller_rel'])->get();
            return ApiResponse::success(TallerResource::collection($talleres), 'Talleres obtenidos exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los talleres: ' . $e->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $taller = Taller::with(['instructor', 'tipo_taller_rel'])->find($id);
            if (!$taller) {
                return ApiResponse::notFound('Taller no encontrado');
            }
            return ApiResponse::success(new TallerResource($taller), 'Taller obtenido exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el taller: ' . $e->getMessage());
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $this->validate($request, [
                'nombre' => 'required|string|max:150',
                'idInstructor' => 'required|integer',
                'idTipoTaller' => 'required|integer',
                'numeroTaller' => 'nullable|integer',
                'observaciones' => 'nullable|string',
                'evaluacionHabilitada' => 'nullable|boolean'
            ]);

            $data = $request->all();

            $numeroTaller = $data['numeroTaller'] ?? 0;
            $tipoTaller = $data['idTipoTaller'] ?? 1;

            if ($numeroTaller >= 1 && $numeroTaller <= 10) {
                $tipoTaller = 1; // Básico
            } else if ($numeroTaller >= 11 && $numeroTaller <= 15) {
                $tipoTaller = 3; // Fortalecimiento
            }

            $tallerData = [
                'nombre' => $data['nombre'],
                'numero_taller' => $data['numeroTaller'] ?? 0,
                'observaciones' => $data['observaciones'] ?? '',
                'evaluacion_habilitada' => $data['evaluacionHabilitada'] ?? false,
                'id_tipo_taller' => $tipoTaller,
                'id_instructor' => $data['idInstructor'],
            ];

            $taller = Taller::create($tallerData);
            $taller->load(['instructor', 'tipo_taller_rel']);

            return ApiResponse::success(new TallerResource($taller), 'Taller creado exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Fallo en la validación: ' . current($e->errors())[0]);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al crear el taller: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $taller = Taller::find($id);
            if (!$taller) {
                return ApiResponse::notFound('Taller no encontrado');
            }

            $this->validate($request, [
                'nombre' => 'required|string|max:150',
                'idInstructor' => 'required|integer',
                'idTipoTaller' => 'required|integer',
                'numeroTaller' => 'nullable|integer',
                'observaciones' => 'nullable|string',
                'evaluacionHabilitada' => 'nullable|boolean'
            ]);

            $data = $request->all();

            $numeroTaller = $data['numeroTaller'] ?? 0;
            $tipoTaller = $data['idTipoTaller'] ?? 1;

            if ($numeroTaller >= 1 && $numeroTaller <= 10) {
                $tipoTaller = 1; // Básico
            } else if ($numeroTaller >= 11 && $numeroTaller <= 15) {
                $tipoTaller = 3; // Fortalecimiento
            }

            $tallerData = [
                'nombre' => $data['nombre'],
                'numero_taller' => $data['numeroTaller'] ?? 0,
                'observaciones' => $data['observaciones'] ?? '',
                'evaluacion_habilitada' => $data['evaluacionHabilitada'] ?? false,
                'id_tipo_taller' => $tipoTaller,
                'id_instructor' => $data['idInstructor'],
            ];

            $taller->update($tallerData);
            $taller->load(['instructor', 'tipo_taller_rel']);

            return ApiResponse::updated(new TallerResource($taller), 'Taller actualizado exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Fallo en la validación: ' . current($e->errors())[0]);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar el taller: ' . $e->getMessage());
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $taller = Taller::find($id);
            if (!$taller) {
                return ApiResponse::notFound('Taller no encontrado');
            }

            $taller->delete();

            return ApiResponse::success(null, 'Taller eliminado exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar el taller: ' . $e->getMessage());
        }
    }

    /**
     * Lista los talleres que estan asociados al cronograma de una etapa
     *
     * @param mixed $idEtapa
     * @return JsonResponse
     */
    public function getTalleresPorEtapa($idEtapa): JsonResponse
    {
        try {
            $rows = CronogramaTaller::with('taller')
                ->where('id_etapa', $idEtapa)
                ->orderBy('fecha', 'asc')
                ->get();
            $result = $rows->map(function ($c) {
                return [
                    'id' => $c->taller ? $c->taller->id_taller : null,
                    'nombre_taller' => $c->taller ? $c->taller->nombre : null,
                    'fecha' => $c->fecha ? $c->fecha->format('d/m/Y') : null,
                ];
            })->values();
            return ApiResponse::success($result);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los talleres: ' . $e->getMessage());
        }
    }

    public function getTalleresPorEtapaActual(): JsonResponse
    {
        try {
            return $this->getTalleresPorEtapa(EtapaFormacion::actual()->id_etapa);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los talleres: ' . $e->getMessage());
        }
    }

}
