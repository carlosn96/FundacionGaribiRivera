<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\EtapaFormacion;
use App\Models\EtapaFormacionTipo;
use App\Http\Resources\EtapaFormacionResource;
use App\Http\Controllers\LineaBaseCatalogosController;

class EtapaFormacionController extends Controller
{

    // Listar todas las etapas de formación usando Eloquent con relaciones
    public function index(Request $request): JsonResponse
    {
        try {
            $etapas = EtapaFormacion::with('tipo')->get();
            return ApiResponse::success(EtapaFormacionResource::collection($etapas), 'Etapas de formación obtenidas exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener las etapas de formación: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function recuperarCampos(): JsonResponse
    {
        try {
            $etapas = EtapaFormacion::with('tipo')->get();
            $tipos = app(LineaBaseCatalogosController::class)->getCatalogoData('tipos-etapa-formacion');
            
            // Extraer años únicos de fecha_inicio
            $anios = $etapas->pluck('fecha_inicio')->map(function($date) {
                return date('Y', strtotime($date));
            })->unique()->values()->toArray();

            return ApiResponse::success([
                'etapas' => EtapaFormacionResource::collection($etapas),
                'tiposEtapa' => $tipos,
                'aniosEtapas' => $anios
            ], 'Campos recuperados exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al recuperar campos: ' . $e->getMessage());
        }
    }

    // Obtener una etapa específica
    public function show($id): JsonResponse
    {
        try {
            $etapa = EtapaFormacion::with('tipo')->find($id);
            if (!$etapa) {
                return ApiResponse::notFound('Etapa de formación no encontrada');
            }
            return ApiResponse::success(new EtapaFormacionResource($etapa), 'Etapa de formación obtenida exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener la etapa de formación: ' . $e->getMessage());
        }
    }

    // Crear una nueva etapa y su cronograma
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string',
                'fechaInicio' => 'required|date',
                'fechaFin' => 'required|date',
                'idTipo' => 'required|integer',
                'modalidad' => 'required|integer',
                'esActual' => 'boolean'
            ]);

            if ($validator->fails()) {
                return ApiResponse::error($validator->errors()->first());
            }

            DB::beginTransaction();
            
            $etapa = EtapaFormacion::create([
                'nombre' => $request->input('nombre'),
                'fecha_inicio' => $request->input('fechaInicio'),
                'fecha_fin' => $request->input('fechaFin'),
                'id_tipo' => $request->input('idTipo'),
                'id_modalidad' => $request->input('modalidad'),
                'es_actual' => $request->input('esActual', false)
            ]);
            
            if ($etapa) {
                $this->generarCronograma($etapa->id_etapa, $request->input('fechaInicio'), $request->input('modalidad'));
                DB::commit();
                return ApiResponse::success(new EtapaFormacionResource($etapa), 'Etapa de formación creada exitosamente');
            }
            
            DB::rollBack();
            return ApiResponse::error('No se pudo crear la etapa');
        } catch (\Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Error al crear la etapa de formación: ' . $e->getMessage());
        }
    }

    // Actualizar etapa
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $etapa = EtapaFormacion::find($id);
            if (!$etapa) return ApiResponse::notFound('Etapa no encontrada');

            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string',
                'fechaInicio' => 'required|date',
                'fechaFin' => 'required|date',
                'idTipo' => 'required|integer',
                'modalidad' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return ApiResponse::error($validator->errors()->first());
            }

            $etapa->update([
                'nombre' => $request->input('nombre'),
                'fecha_inicio' => $request->input('fechaInicio'),
                'fecha_fin' => $request->input('fechaFin'),
                'id_tipo' => $request->input('idTipo'),
                'id_modalidad' => $request->input('modalidad')
            ]);
            // Recargar con relación
            $etapa->load('tipo');
            return ApiResponse::success(new EtapaFormacionResource($etapa), 'Etapa actualizada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar: ' . $e->getMessage());
        }
    }

    // Eliminar etapa (usando el SP de legacy)
    public function destroy($id): JsonResponse
    {
        try {
            EtapaFormacion::deleteEtapa($id);
            return ApiResponse::success(null, 'Etapa eliminada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar: ' . $e->getMessage());
        }
    }

    // Establecer como etapa actual
    public function setActual($id): JsonResponse
    {
        try {
            EtapaFormacion::setActual($id);
            return ApiResponse::success(null, 'Etapa actual actualizada');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar etapa actual: ' . $e->getMessage());
        }
    }

    // Obtener la etapa marcada como actual
    public function getActual(): JsonResponse
    {
        try {
            $etapa = EtapaFormacion::actual();
            if (!$etapa) {
                return ApiResponse::notFound('No hay ninguna etapa actual activa');
            }
            return ApiResponse::success(new EtapaFormacionResource($etapa), 'Etapa actual obtenida');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener etapa actual: ' . $e->getMessage());
        }
    }
        

    /**
     * Helper para otros controladores que necesitan el ID de la etapa actual.
     */
    public static function getCurrentEtapaId(): int
    {
        $etapa = EtapaFormacion::actual();
        return $etapa ? (int)$etapa->id_etapa : 0;
    }

    // Lógica de cronograma portada de legacy
    private function getProximoDiaHabil(\DateTime $fecha, $diasAumento = 1)
    {
        for ($i = 0; $i < $diasAumento; $i++) {
            $fecha->modify('+1 day');
            while (in_array($fecha->format('N'), [6, 7])) {
                $fecha->modify('+1 day');
            }
        }
        return $fecha;
    }

    private function generarCronograma($idEtapa, $fechaInicioStr, $modalidad)
    {
        $fecha = new \DateTime($fechaInicioStr);
        while (in_array($fecha->format('N'), [6, 7])) {
            $fecha->modify('+1 day');
        }

        $talleres = DB::table('taller')->select('id_taller', 'numero_taller')->orderBy('numero_taller', 'ASC')->get();

        foreach ($talleres as $index => $t) {
            $numero = $t->numero_taller;
            $idTaller = $t->id_taller;

            if ($index > 0) {
                if ($modalidad == 1) { // MODALIDAD A
                    if ($numero <= 5) {
                        $this->getProximoDiaHabil($fecha, 1);
                    } else {
                        $fecha->modify('+7 days');
                    }
                } else { // MODALIDAD B (2)
                    if ($numero <= 10) {
                        $diasAumento = ($index % 2 == 1) ? 3 : 4;
                        $fecha->modify("+$diasAumento days");
                        while (in_array($fecha->format('N'), [6, 7])) {
                            $fecha->modify('+1 day');
                        }
                    } else {
                        $fecha->modify('+7 days');
                    }
                }
            }
            DB::table('cronograma_taller')->insert([
                'id_etapa' => $idEtapa,
                'id_taller' => $idTaller,
                'fecha' => $fecha->format('Y-m-d')
            ]);
        }
    }
}