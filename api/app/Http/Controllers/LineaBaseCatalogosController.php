<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;
use App\Http\Responses\ApiResponse;
use App\Models\EtapaFormacion;
use App\Models\LineaBase\Catalogos\EmpleoGanancia;
use App\Models\LineaBase\Catalogos\TiempoDedicaFormacion;
use App\Models\LineaBase\Catalogos\RazonRecurreFundacion;
use App\Models\LineaBase\Catalogos\SolicitaCredito;
use App\Models\LineaBase\Catalogos\UtilizaCredito;
use App\Models\LineaBase\Catalogos\CantidadDependientesEconomicos;
use App\Models\LineaBase\Catalogos\Ocupacion;
use App\Models\LineaBase\Catalogos\RangoIngresoMensual;
use App\Models\LineaBase\Catalogos\NegocioGiro;
use App\Models\LineaBase\Catalogos\NegocioActividad;
use App\Models\LineaBase\Catalogos\MedioConocimiento;
use App\Models\LineaBase\Catalogos\EstrategiaIncrementarVentas;
use App\Models\LineaBase\Catalogos\ObjetivoAhorro;
use App\Models\LineaBase\Catalogos\EstadoCivil;
use App\Models\LineaBase\Catalogos\Escolaridad;
use App\Models\LineaBase\Catalogos\CodigoPostal;
use App\Models\LineaBase\Catalogos\Municipio;
use App\Models\LineaBase\Catalogos\ComunidadParroquial;
use App\Models\LineaBase\Catalogos\AntiguedadNegocio;
use App\Models\LineaBase\Catalogos\Genero;

class LineaBaseCatalogosController extends Controller
{

    private $catalogos = [
        'estados-civiles' => EstadoCivil::class,
        'escolaridades' => Escolaridad::class,
        'giros-negocio' => NegocioGiro::class,
        'actividades-negocio' => NegocioActividad::class,
        'antiguedad-negocio' => AntiguedadNegocio::class,
        'genero' => Genero::class,
    ];
    // Método unificado para obtener catálogos
    public function getCatalogo($tipo): JsonResponse
    {
        if (!isset($this->catalogos[$tipo])) {
            return ApiResponse::error('Tipo de catálogo no válido', ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $data = $this->getCatalogoData($tipo);

            return ApiResponse::success($data, $this->catalogos[$tipo]::getMessage());
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el catálogo: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener municipios por estado
    public function getMunicipios($estadoId): JsonResponse
    {
        try {
            $municipios = Municipio::where('id_estado', $estadoId)->get();
            return ApiResponse::success($municipios, 'Municipios obtenidos');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los municipios: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener códigos postales por municipio
    public function getCodigosPostales($municipioId): JsonResponse
    {
        try {
            $codigos = CodigoPostal::where('id_municipio', $municipioId)->get();
            return ApiResponse::success($codigos, 'Códigos postales obtenidos');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los códigos postales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener códigos postales con paginación
    public function getAllCodigosPostales(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 50); // Default 50 items per page
            $relationships = CodigoPostal::getRelationships();
            $codigos = CodigoPostal::with($relationships)->paginate($perPage);
            return ApiResponse::success($codigos, 'Códigos postales obtenidos');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los códigos postales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para buscar códigos postales
    public function searchCodigosPostales(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q', '');
            $perPage = $request->get('per_page', 50);

            $relationships = CodigoPostal::getRelationships();
            $codigos = CodigoPostal::with($relationships)
                ->where('codigo_postal', 'like', '%' . $query . '%')
                ->orWhere('colonia', 'like', '%' . $query . '%')
                ->paginate($perPage);

            return ApiResponse::success($codigos, 'Códigos postales encontrados');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al buscar los códigos postales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener un código postal por ID
    public function getCodigoPostalPorId($id): JsonResponse
    {
        try {
            $relationships = CodigoPostal::getRelationships();
            $codigo = CodigoPostal::with($relationships)->find($id);
            if (!$codigo) {
                return ApiResponse::notFound('Código postal no encontrado');
            }
            return ApiResponse::success($codigo, 'Código postal obtenido');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el código postal: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener comunidades parroquiales con paginación
    public function getAllComunidadesParroquiales(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 50); // Default 50 items per page
            $relationships = ComunidadParroquial::getRelationships();
            $comunidades = ComunidadParroquial::with($relationships)->paginate($perPage);
            return ApiResponse::success($comunidades, 'Comunidades parroquiales obtenidas');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener las comunidades parroquiales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para buscar comunidades parroquiales
    public function searchComunidadesParroquiales(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q', '');
            $perPage = $request->get('per_page', 50);

            $relationships = ComunidadParroquial::getRelationships();
            $comunidades = ComunidadParroquial::with($relationships)
                ->where('nombre', 'like', '%' . $query . '%')
                ->paginate($perPage);

            return ApiResponse::success($comunidades, 'Comunidades parroquiales encontradas');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al buscar las comunidades parroquiales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener comunidades parroquiales por decanato
    public function getComunidadesParroquialesPorDecanato($decanatoId): JsonResponse
    {
        try {
            $relationships = ComunidadParroquial::getRelationships();
            $comunidades = ComunidadParroquial::with($relationships)->where('id_decanato', $decanatoId)->get();
            return ApiResponse::success($comunidades, 'Comunidades parroquiales obtenidas');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener las comunidades parroquiales: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método para obtener todos los catálogos
    public function getAllCatalogosPorTipoInput(): JsonResponse
    {
        try {
            $diccionario = [
                //"etapaFormacion" => EtapaFormacion::actual(),
                "checkbox" => [
                    MedioConocimiento::class,
                    EstrategiaIncrementarVentas::class,
                ],
                "radio" => [
                    EmpleoGanancia::class,
                    TiempoDedicaFormacion::class,
                    RazonRecurreFundacion::class,
                    SolicitaCredito::class,
                    UtilizaCredito::class,
                    CantidadDependientesEconomicos::class,
                    Ocupacion::class,
                    RangoIngresoMensual::class,
                    ObjetivoAhorro::class,
                    Genero::class,
                ],
                "select" => [
                    EstadoCivil::class,
                    Escolaridad::class,
                    NegocioGiro::class,
                    NegocioActividad::class,
                    AntiguedadNegocio::class,
                ]
            ];

            $allCatalogos = [];
            $allCatalogos['etapaFormacion'] = EtapaFormacion::actual();
            foreach ($diccionario as $tipo => $modelClass) {
                foreach ($modelClass as $model) {
                    $inputName = $model::INPUT_NAME_KEY;
                    $allCatalogos[$inputName] = [
                        "name" => $inputName,
                        "tipo" => $tipo,
                        "data" => $model::query()->get()
                    ];
                }
            }

            return ApiResponse::success($allCatalogos, 'Todos los catálogos obtenidos');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los catálogos: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Método privado para obtener los datos de un catálogo específico
    private function getCatalogoData($tipo)
    {
        try {
            $query = $this->catalogos[$tipo]::query();

            $relationships = $this->catalogos[$tipo]::getRelationships();
            if (!empty($relationships)) {
                $query->with($relationships);
            }

            $data = $query->get();

            // Si hay relaciones, devolver los modelos completos; si no, mapear a id y descripcion
            if (!empty($relationships)) {
                return $data;
            } else {
                $mappedData = $data->map(function ($item) {
                    return [
                        'id' => $item->getKey(),
                        'descripcion' => $item->descripcion ?? $item->nombre ?? 'Sin descripción'
                    ];
                });
                return $mappedData;
            }
        } catch (QueryException $e) {
            throw new \Exception('Error al acceder a la base de datos para el catálogo ' . $tipo . ': ' . $e->getMessage());
        }
    }
}