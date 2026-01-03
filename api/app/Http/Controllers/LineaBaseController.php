<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;


use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Database\QueryException;

use Illuminate\Support\Facades\Log;
use App\Models\Usuario;
use App\Models\TipoUsuario;
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
use App\Models\LineaBase\LineaBase;
use App\Models\LineaBase\LineaBasePreliminarInicial;
use App\Models\LineaBase\LineaBaseIdentificacion;
use App\Models\LineaBase\LineaBaseDomicilio;
use App\Models\LineaBase\LineaBaseSocioeconomico;
use App\Models\LineaBase\LineaBaseNegocio;
use App\Models\LineaBase\LineaBaseAnalisisNegocio;
use App\Models\LineaBase\LineaBaseAdministracionIngresosNegocio;
use App\Models\LineaBase\LineaBaseListaMedioConocimiento;
use App\Models\LineaBase\LineaBaseListaEstrategiasIncrementarVentas;
use App\Models\LineaBase\LineaBaseListaEmpleoGanancias;
use App\Models\LineaBase\LineaBaseListaObjetivosAhorro;

class LineaBaseController extends Controller
{

    public function saveAll(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $idLineaBase = $this->getOrCreateLineaBaseId($idUsuario, $data['idEtapa'] ?? 1);

            // Save preliminar
            $this->saveSection($data, $idLineaBase, 'preliminar');

            // Save medio conocimiento
            if (isset($data['medioConoceFundacion']) && is_array($data['medioConoceFundacion'])) {
                LineaBaseListaMedioConocimiento::where('id_linea_base', $idLineaBase)->delete();
                foreach ($data['medioConoceFundacion'] as $medio) {
                    LineaBaseListaMedioConocimiento::create([
                        'id_linea_base' => $idLineaBase,
                        'id_medio' => $medio
                    ]);
                }
            }

            // Save identificacion
            $this->saveSection($data, $idLineaBase, 'identificacion');

            // Save domicilio
            $this->saveSection($data, $idLineaBase, 'domicilio');

            // Save socioeconomico
            $this->saveSection($data, $idLineaBase, 'socioeconomico');

            // Save negocio if has negocio
            if (isset($data['tieneNegocio']) && $data['tieneNegocio']) {
                $this->saveSection($data, $idLineaBase, 'negocio');

                // Save analisis negocio
                $this->saveSection($data, $idLineaBase, 'analisis');

                // Save estrategias
                if (isset($data['estrategiasIncrementarVentas']) && is_array($data['estrategiasIncrementarVentas'])) {
                    LineaBaseListaEstrategiasIncrementarVentas::where('id_linea_base', $idLineaBase)->delete();
                    foreach ($data['estrategiasIncrementarVentas'] as $estrategia) {
                        LineaBaseListaEstrategiasIncrementarVentas::create([
                            'id_linea_base' => $idLineaBase,
                            'id_estrategia' => $estrategia
                        ]);
                    }
                }

                // Save empleo ganancias
                if (isset($data['comoEmpleaGanancias']) && is_array($data['comoEmpleaGanancias'])) {
                    LineaBaseListaEmpleoGanancias::where('id_linea_base', $idLineaBase)->delete();
                    foreach ($data['comoEmpleaGanancias'] as $empleo) {
                        LineaBaseListaEmpleoGanancias::create([
                            'id_linea_base' => $idLineaBase,
                            'id_empleo_ganancia' => $empleo
                        ]);
                    }
                }

                // Save administracion ingresos
                $this->saveSection($data, $idLineaBase, 'administracion');

                // Save objetivos ahorro
                if (isset($data['objetivosAhorro']) && is_array($data['objetivosAhorro'])) {
                    LineaBaseListaObjetivosAhorro::where('id_linea_base', $idLineaBase)->delete();
                    foreach ($data['objetivosAhorro'] as $objetivo) {
                        LineaBaseListaObjetivosAhorro::create([
                            'id_linea_base' => $idLineaBase,
                            'id_objetivo' => $objetivo
                        ]);
                    }
                }
            }

            return ApiResponse::success(null, 'Línea base guardada exitosamente');
        } catch (QueryException $e) {
            return ApiResponse::error('Error en la base de datos al guardar la línea base: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la línea base: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Method to get LineaBase for a user (only if exists)
    public function getLineaBase(): JsonResponse
    {
        try {
            $usuario = auth()->user();
            $lineaBase = $this->findLineaBase($usuario->id);
            if (!$lineaBase) {
                return ApiResponse::notFound('El usuario aun no tiene una línea base creada.');
            }

            $data = $lineaBase->load([
                'usuario',
                'preliminar',
                'identificacion',
                'domicilio',
                'socioeconomico',
                'negocio',
                'analisisNegocio',
                'administracionIngresos'
            ]);

            return ApiResponse::success($data, 'Línea base obtenida exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener la línea base: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function savePreliminar(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            // Map camelCase to snake_case
            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'otro_medio_conocimiento' => $data['otroMedioConoceFundacion'] ?? null,
                'otro_razon_recurre_fundacion' => $data['otraRazonRecurreFundacion'] ?? null,
                'id_razon_recurre_fundacion' => $data['razonRecurreFundacion'] ?? null,
                'id_solicita_credito' => $data['solicitaCredito'] ?? null,
                'id_utiliza_credito' => $data['utilizaCredito'] ?? null,
                'id_tiempo_dedica_formacion' => $data['tiempoDedicaCapacitacion'] ?? null,
            ];

            $preliminar = LineaBasePreliminarInicial::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($preliminar, 'Sección preliminar guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección preliminar: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveIdentificacion(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'genero' => $data['genero'],
                'edad' => $data['edad'],
                'id_estado_civil' => $data['estadoCivil'],
                'id_escolaridad' => $data['escolaridad'],
                'discapacidad' => $data['discapacidad'] ?? null,
            ];

            $identificacion = LineaBaseIdentificacion::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($identificacion, 'Sección de identificación guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección de identificación: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveDomicilio(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'calle' => $data['calle'],
                'calle_cruce_1' => $data['calleCruce1'],
                'calle_cruce_2' => $data['calleCruce2'],
                'numero_exterior' => $data['numeroExterior'],
                'numero_interior' => $data['numeroInterior'] ?? null,
                'id_codigo_postal' => $data['codigoPostal'],
                'colonia' => $data['colonia'],
                'id_comunidad_parroquial' => $data['comunidadParroquial'],
            ];

            $domicilio = LineaBaseDomicilio::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($domicilio, 'Sección de domicilio guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección de domicilio: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveSocioeconomico(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'cant_dependientes_economicos' => $data['cantidadDependientesEconomicos'],
                'id_ocupacion' => $data['ocupacionActual'],
                'id_rango_ingreso_mensual' => $data['ingresoMensual'],
            ];

            $socioeconomico = LineaBaseSocioeconomico::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($socioeconomico, 'Sección socioeconómica guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección socioeconómica: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveNegocio(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'nombre' => $data['nombre'],
                'telefono' => $data['telefono'],
                'calle' => $data['calle'],
                'calle_cruce_1' => $data['calleCruce1'],
                'calle_cruce_2' => $data['calleCruce2'],
                'numero_exterior' => $data['numExterior'],
                'numero_interior' => $data['numInterior'] ?? null,
                'id_codigo_postal' => $data['codigoPostal'],
                'colonia' => $data['colonia'],
                'antiguedad' => $data['antiguedad'],
                'cant_empleados' => $data['cantEmpleados'],
                'id_giro_negocio' => $data['giro'],
                'otra_actividad' => $data['otraActividad'] ?? null,
                'actividad' => $data['actividad'] ?? null,
            ];

            $negocio = LineaBaseNegocio::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($negocio, 'Sección de negocio guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección de negocio: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveAnalisisNegocio(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'problemas_negocio' => $data['problemasNegocio'],
                'registra_entrada_salida' => $data['registraEntradaSalida'],
                'asigna_sueldo' => $data['asignaSueldo'],
                'conoce_utilidades' => $data['conoceUtilidades'],
                'identifica_competencia' => $data['identificaCompetencia'],
                'quien_competencia' => $data['quienCompetencia'] ?? null,
                'clientes_negocio' => $data['clientesNegocio'],
                'ventajas_negocio' => $data['ventajasNegocio'],
                'conoce_productos_mayor_utilidad' => $data['conoceProductosMayorUtilidad'],
                'porcentaje_ganancia' => $data['porcentajeGanancias'] ?? null,
                'ahorro' => $data['ahorro'],
                'cuanto_ahorro' => $data['cuantoAhorro'] ?? null,
                'razones_no_ahorro' => $data['razonesNoAhorro'] ?? null,
                'conoce_punto_equilibrio' => $data['conocePuntoEquilibrio'],
                'separa_gastos' => $data['separaGastos'],
                'elabora_presupuesto' => $data['elaboraPresupuesto'],
            ];

            $analisis = LineaBaseAnalisisNegocio::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($analisis, 'Sección de análisis de negocio guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección de análisis de negocio: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function saveAdministracionIngresos(Request $request, $idUsuario): JsonResponse
    {
        try {
            $data = $request->all();
            $data['id_linea_base'] = $this->getOrCreateLineaBaseId($idUsuario);

            $mappedData = [
                'id_linea_base' => $data['id_linea_base'],
                'sueldo_mensual' => $data['sueldoMensual'] ?? null,
                'monto_mensual_ventas' => $data['ventasMensuales'] ?? null,
                'monto_mensual_egresos' => $data['gastosMensuales'] ?? null,
                'monto_mensual_utilidades' => $data['utilidadesMensuales'] ?? null,
                'es_negocio_principal_fuente_personal' => $data['esIngresoPrincipalPersonal'] ?? null,
                'es_negocio_principal_fuente_familiar' => $data['esIngresoPrincipalFamiliar'] ?? null,
                'habito_ahorro' => $data['tieneHabitoAhorro'] ?? null,
                'cuenta_sistema_ahorro' => $data['cuentaConSistemaAhorro'] ?? null,
                'detalle_sistema_ahorro' => $data['detallesSistemaAhorro'] ?? null,
                'monto_ahorro_mensual' => $data['ahorroMensual'] ?? null,
            ];

            $administracion = LineaBaseAdministracionIngresosNegocio::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            return ApiResponse::success($administracion, 'Sección de administración de ingresos guardada exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la sección de administración de ingresos: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    private function saveSection($data, $idLineaBase, $section)
    {
        switch ($section) {
            case 'preliminar':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'otro_medio_conocimiento' => $data['otroMedioConoceFundacion'] ?? null,
                    'otro_razon_recurre_fundacion' => $data['otraRazonRecurreFundacion'] ?? null,
                    'id_razon_recurre_fundacion' => $data['razonRecurreFundacion'] ?? null,
                    'id_solicita_credito' => $data['solicitaCredito'] ?? null,
                    'id_utiliza_credito' => $data['utilizaCredito'] ?? null,
                    'id_tiempo_dedica_formacion' => $data['tiempoDedicaCapacitacion'] ?? null,
                ];
                LineaBasePreliminarInicial::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'identificacion':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'genero' => $data['genero'],
                    'edad' => $data['edad'],
                    'id_estado_civil' => $data['estadoCivil'],
                    'id_escolaridad' => $data['escolaridad'],
                    'discapacidad' => $data['discapacidad'] ?? null,
                ];
                LineaBaseIdentificacion::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'domicilio':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'calle' => $data['calle'],
                    'calle_cruce_1' => $data['calleCruce1'],
                    'calle_cruce_2' => $data['calleCruce2'],
                    'numero_exterior' => $data['numeroExterior'],
                    'numero_interior' => $data['numeroInterior'] ?? null,
                    'id_codigo_postal' => $data['codigoPostal'],
                    'colonia' => $data['colonia'],
                    'id_comunidad_parroquial' => $data['comunidadParroquial'],
                ];
                LineaBaseDomicilio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'socioeconomico':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'cant_dependientes_economicos' => $data['cantidadDependientesEconomicos'],
                    'id_ocupacion' => $data['ocupacionActual'],
                    'id_rango_ingreso_mensual' => $data['ingresoMensual'],
                ];
                LineaBaseSocioeconomico::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'negocio':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'nombre' => $data['nombreNegocio'],
                    'telefono' => $data['telefonoNegocio'],
                    'calle' => $data['calleNegocio'],
                    'calle_cruce_1' => $data['calleCruce1Negocio'],
                    'calle_cruce_2' => $data['calleCruce2Negocio'],
                    'numero_exterior' => $data['numExteriorNegocio'],
                    'numero_interior' => $data['numInteriorNegocio'] ?? null,
                    'id_codigo_postal' => $data['codigoPostalNegocio'],
                    'colonia' => $data['coloniaNegocio'],
                    'antiguedad' => $data['antiguedadNegocio'],
                    'cant_empleados' => $data['cantEmpleadosNegocio'],
                    'id_giro_negocio' => $data['giroNegocio'],
                    'otra_actividad' => $data['otraActividadNegocio'] ?? null,
                    'actividad' => $data['actividadNegocio'] ?? null,
                ];
                LineaBaseNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'analisis':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'problemas_negocio' => $data['problemasNegocio'],
                    'registra_entrada_salida' => $data['registraEntradaSalida'],
                    'asigna_sueldo' => $data['asignaSueldo'],
                    'conoce_utilidades' => $data['conoceUtilidades'],
                    'identifica_competencia' => $data['identificaCompetencia'],
                    'quien_competencia' => $data['quienCompetencia'] ?? null,
                    'clientes_negocio' => $data['clientesNegocio'],
                    'ventajas_negocio' => $data['ventajasNegocio'],
                    'conoce_productos_mayor_utilidad' => $data['conoceProductosMayorUtilidad'],
                    'porcentaje_ganancia' => $data['porcentajeGanancias'] ?? null,
                    'ahorro' => $data['ahorro'],
                    'cuanto_ahorro' => $data['cuantoAhorro'] ?? null,
                    'razones_no_ahorro' => $data['razonesNoAhorro'] ?? null,
                    'conoce_punto_equilibrio' => $data['conocePuntoEquilibrio'],
                    'separa_gastos' => $data['separaGastos'],
                    'elabora_presupuesto' => $data['elaboraPresupuesto'],
                ];
                LineaBaseAnalisisNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
            case 'administracion':
                $mappedData = [
                    'id_linea_base' => $idLineaBase,
                    'sueldo_mensual' => $data['sueldoMensual'] ?? null,
                    'monto_mensual_ventas' => $data['ventasMensuales'] ?? null,
                    'monto_mensual_egresos' => $data['gastosMensuales'] ?? null,
                    'monto_mensual_utilidades' => $data['utilidadesMensuales'] ?? null,
                    'es_negocio_principal_fuente_personal' => $data['esIngresoPrincipalPersonal'] ?? null,
                    'es_negocio_principal_fuente_familiar' => $data['esIngresoPrincipalFamiliar'] ?? null,
                    'habito_ahorro' => $data['tieneHabitoAhorro'] ?? null,
                    'cuenta_sistema_ahorro' => $data['cuentaConSistemaAhorro'] ?? null,
                    'detalle_sistema_ahorro' => $data['detallesSistemaAhorro'] ?? null,
                    'monto_ahorro_mensual' => $data['ahorroMensual'] ?? null,
                ];
                LineaBaseAdministracionIngresosNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
                break;
        }
    }

    private function validateEmprendedor($idUsuario)
    {
        $usuario = Usuario::find($idUsuario);
        Log::info('Usuario encontrado: ' . $usuario->nombre);
        if (!$usuario || $usuario->tipo_usuario !== TipoUsuario::EMPRENDEDOR) {
            throw new \Exception('Solo los usuarios con rol Emprendedor pueden tener línea base.');
        }
        return $usuario;
    }

    private function findLineaBase($idUsuario)
    {
        $usuario = $this->validateEmprendedor($idUsuario);
        return $usuario->lineaBase;
    }

    private function createLineaBase($idUsuario, $idEtapa = 1)
    {
        $usuario = $this->validateEmprendedor($idUsuario);

        return LineaBase::create([
            'id_usuario' => $idUsuario,
            'id_etapa' => $idEtapa,
            'fecha_creacion' => Carbon::now()
        ]);
    }

    private function ensureLineaBaseExists($idUsuario, $idEtapa = 1)
    {
        $lineaBase = $this->findLineaBase($idUsuario);

        if (!$lineaBase) {
            $lineaBase = $this->createLineaBase($idUsuario, $idEtapa);
        }

        return $lineaBase;
    }

    private function getOrCreateLineaBaseId($idUsuario, $idEtapa = 1)
    {
        $lineaBase = $this->ensureLineaBaseExists($idUsuario, $idEtapa);

        return $lineaBase->id;
    }

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
                ],
                "select" => [
                    EstadoCivil::class,
                    Escolaridad::class,
                    NegocioGiro::class,
                    NegocioActividad::class,
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

    /* Método privado para obtener los datos de un catálogo específico
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
    }*/
}