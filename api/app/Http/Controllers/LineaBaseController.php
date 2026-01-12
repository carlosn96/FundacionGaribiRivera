<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Str;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Database\QueryException;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Utils\StringHelper;

use App\Models\Usuario;
use App\Models\TipoUsuario;

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
use App\Models\LineaBase\LineaBaseListaObjetivosAhorro;
use App\Models\LineaBase\LineaBaseListaEmpleoGanancias;
class LineaBaseController extends Controller
{

    public function saveAll(Request $request): JsonResponse
    {
        try {
            $data = $request->all();

            /*Validator::make($data, [
                'idEtapa' => 'required|integer|exists:etapa_formacion,id_etapa'
            ], [
                'idEtapa.exists' => 'La etapa seleccionada no existe.'
            ])->validate();*/

            $lb = $this->createLineaBase();

            $idLineaBase = $lb->id_linea_base;

            $this->savePreliminar($data, $idLineaBase);
            $this->saveIdentificacion($data, $idLineaBase);
            $this->saveDomicilio($data, $idLineaBase);
            $this->saveSocioeconomico($data, $idLineaBase);
            if (StringHelper::boolValue($data['tieneNegocio'])) {
                $this->saveNegocio($data, $idLineaBase);
                $this->saveAnalisisNegocio($data, $idLineaBase);
            }
            $this->saveAdministracionIngresos($data, $idLineaBase);

            return ApiResponse::success($lb->resource(), 'Línea base guardada exitosamente');
        } catch (ValidationException $e) {
            return ApiResponse::error($e->validator->errors()->first('idEtapa'));
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
            $lineaBase = JWTAuth::user()->lineaBase;
            if (!$lineaBase) {
                return ApiResponse::notFound('El usuario aun no tiene una línea base creada.');
            }
            return ApiResponse::success($lineaBase->resource(), 'Línea base obtenida exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener la línea base: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function savePreliminar($data, $idLineaBase): void
    {
        try {

            // Map camelCase to snake_case
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'otro_medio_conocimiento' => StringHelper::getValidValueOrNull($data, 'medioConocimiento_other'),
                'otro_razon_recurre_fundacion' => StringHelper::getValidValueOrNull($data, 'razonRecurre_other'),
                'id_razon_recurre_fundacion' => isset($data['razonRecurre']) && $data['razonRecurre'] !== "0" ? $data['razonRecurre'] : null,
                'id_solicita_credito' => $data['solicitaCredito'] ?? null,
                'id_utiliza_credito' => $data['utilizaCredito'] ?? null,
                'id_tiempo_dedica_formacion' => $data['tiempoCapacitacion']
            ];
            StringHelper::cleanArrayString($mappedData);

            LineaBasePreliminarInicial::updateOrCreate(
                ['id_linea_base' => $mappedData['id_linea_base']],
                $mappedData
            );

            if (isset($data['medioConocimiento']) && is_array($data['medioConocimiento'])) {
                if (isset($data['medioConocimiento_other']) && !empty($data['medioConocimiento_other'])) {
                    $data['medioConocimiento'] = array_filter($data['medioConocimiento'], function ($value) {
                        return $value !== "0" && $value !== 0;
                    });
                }
                LineaBaseListaMedioConocimiento::where('id_linea_base', $idLineaBase)->delete();
                foreach ($data['medioConocimiento'] as $medio) {
                    LineaBaseListaMedioConocimiento::create([
                        'id_linea_base' => $idLineaBase,
                        'id_medio' => $medio
                    ]);
                }
            }
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección preliminar: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección preliminar: ' . $e->getMessage());
        }
    }

    private function saveIdentificacion($data, $idLineaBase): void
    {
        try {
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'genero' => $data['genero'],
                'edad' => $data['edad'],
                'id_estado_civil' => $data['estadoCivil'],
                'id_escolaridad' => $data['escolaridad'],
                'discapacidad' => StringHelper::boolValue($data['discapacidad']) ? $data['tipoDiscapacidad'] : null,
            ];
            StringHelper::cleanArrayString($mappedData);
            LineaBaseIdentificacion::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección de identificación: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección de identificación: ' . $e->getMessage());
        }
    }

    private function saveDomicilio($data, $idLineaBase): void
    {
        try {
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'calle' => $data['calle'],
                'calle_cruce_1' => $data['calleCruce1'],
                'calle_cruce_2' => $data['calleCruce2'],
                'numero_exterior' => $data['numeroExterior'],
                'numero_interior' => StringHelper::getValidValueOrNull($data, 'numeroInterior'),
                'id_codigo_postal' => StringHelper::intValue($data['codigoPostal']),
                'colonia' => $data['colonia'],
                'id_comunidad_parroquial' => $data['comunidadParroquial'],
            ];
            StringHelper::cleanArrayString($mappedData);
            LineaBaseDomicilio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección de domicilio: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección de domicilio: ' . $e->getMessage());
        }
    }

    private function saveSocioeconomico($data, $idLineaBase): void
    {
        try {
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'cant_dependientes_economicos' => StringHelper::intValue($data['cantidadDependientesEconomicos']),
                'id_ocupacion' => StringHelper::intValue($data['ocupacionActual']),
                'id_rango_ingreso_mensual' => StringHelper::intValue($data['ingresoMensual']),
            ];
            LineaBaseSocioeconomico::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección socioeconómica: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección socioeconómica: ' . $e->getMessage());
        }
    }

    private function saveNegocio($data, $idLineaBase): void
    {
        try {
            $actividadNegocioVal = StringHelper::intValue($data['negocioActividad']);
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'nombre' => $data['negocioNombre'],
                'telefono' => $data['negocioTelefono'],
                'calle' => $data['negocioCalle'],
                'calle_cruce_1' => $data['negocioCalleCruce1'],
                'calle_cruce_2' => $data['negocioCalleCruce2'],
                'numero_exterior' => $data['negocioNumeroExterior'],
                'numero_interior' => StringHelper::getValidValueOrNull($data, 'negocioNumeroInterior'),
                'id_codigo_postal' => StringHelper::intValue($data['negocioCodigoPostal']),
                'colonia' => $data['negocioColonia'],
                'antiguedad' => StringHelper::intValue($data['negocioAntiguedad']),
                'cant_empleados' => StringHelper::intValue($data['negocioCantidadEmpleados']),
                'id_giro_negocio' => StringHelper::intValue($data['negocioGiro']),
                'actividad' => $actividadNegocioVal !== 0 ? $actividadNegocioVal : null,
                'otra_actividad' => StringHelper::getValidValueOrNull($data, 'negocioActividad_other'),
            ];
            StringHelper::cleanArrayString($mappedData);
            LineaBaseNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección de negocio: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección de negocio: ' . $e->getMessage());
        }
    }

    private function saveAnalisisNegocio($data, $idLineaBase): void
    {
        try {
            $asignaAhorro = StringHelper::boolValue($data['asignaAhorroMensual']);
            $identificaCompetencia = StringHelper::boolValue($data['identificaCompetencia']);
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'problemas_negocio' => $data['problemasNegocio'],
                'registra_entrada_salida' => StringHelper::intValue($data['registraEntradaSalida']),
                'asigna_sueldo' => StringHelper::intValue($data['asignaSueldo']),
                'conoce_utilidades' => StringHelper::intValue($data['conoceUtilidades']),
                'identifica_competencia' => StringHelper::intValue($data['identificaCompetencia']),
                'quien_competencia' => $identificaCompetencia ? $data['quienCompetencia'] : null,
                'clientes_negocio' => $data['clientesNegocio'],
                'ventajas_negocio' => $data['ventajasNegocio'],
                'conoce_productos_mayor_utilidad' => StringHelper::intValue($data['conoceProductosMayorUtilidad']),
                'porcentaje_ganancia' => StringHelper::boolValue($data['conoceProductosMayorUtilidad']) ? StringHelper::floatValue($data['porcentajeGananciasProductos']) : null,
                'ahorro' => StringHelper::intValue($data['asignaAhorroMensual']),
                'cuanto_ahorro' => $asignaAhorro ? StringHelper::floatValue($data['cuantoAhorro']) : null,
                'razones_no_ahorro' => !$asignaAhorro ? $data['razonesNoAhorro'] : null,
                'conoce_punto_equilibrio' => StringHelper::intValue($data['conocePuntoEquilibrio']),
                'separa_gastos' => StringHelper::intValue($data['separaGastos']),
                'elabora_presupuesto' => StringHelper::intValue($data['elaboraPresupuesto'])
            ];
            StringHelper::cleanArrayString($mappedData);
            LineaBaseAnalisisNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);

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
            if (isset($data['comoEmpleaGanancias'])) {
                LineaBaseListaEmpleoGanancias::where('id_linea_base', $idLineaBase)->delete();
                LineaBaseListaEmpleoGanancias::create([
                    'id_linea_base' => $idLineaBase,
                    'id_empleo_ganancia' => $data['comoEmpleaGanancias']
                ]);
            }
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección de análisis de negocio: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección de análisis de negocio: ' . $e->getMessage());
        }
    }

    private function saveAdministracionIngresos($data, $idLineaBase): void
    {
        try {
            $tieneNegocio = StringHelper::boolValue($data['tieneNegocio']);
            $cuentaSistemaAhorro = StringHelper::boolValue($data['cuentaConSistemaAhorro']);
            $mappedData = [
                'id_linea_base' => $idLineaBase,
                'sueldo_mensual' => StringHelper::floatValue($tieneNegocio ? $data['sueldoMensual'] : 0),
                'monto_mensual_ventas' => StringHelper::floatValue($tieneNegocio ? $data['montoVentasMensual'] : 0),
                'monto_mensual_egresos' => StringHelper::floatValue($tieneNegocio ? $data['montoGastosMensual'] : 0),
                'monto_mensual_utilidades' => StringHelper::floatValue($tieneNegocio ? $data['utilidadesMensual'] : 0),
                'es_negocio_principal_fuente_personal' => StringHelper::intValue($tieneNegocio ? $data['esIngresoPrincipalPersonal'] : 0),
                'es_negocio_principal_fuente_familiar' => StringHelper::intValue($tieneNegocio ? $data['esIngresoPrincipalFamiliar'] : 0),
                'habito_ahorro' => StringHelper::intValue(value: $data['tieneHabitoAhorro']),
                'cuenta_sistema_ahorro' => StringHelper::intValue($data['cuentaConSistemaAhorro']),
                'detalle_sistema_ahorro' => $cuentaSistemaAhorro ? StringHelper::cleanString($data['tipoSistemaAhorro']) : null,
                'monto_ahorro_mensual' => StringHelper::floatValue($cuentaSistemaAhorro ? $data['ahorroMensual'] : 0)
            ];
            LineaBaseAdministracionIngresosNegocio::updateOrCreate(['id_linea_base' => $idLineaBase], $mappedData);
            if (isset($data['objetivosAhorro'])) {
                LineaBaseListaObjetivosAhorro::where('id_linea_base', $idLineaBase)->delete();
                LineaBaseListaObjetivosAhorro::create([
                    'id_linea_base' => $idLineaBase,
                    'id_objetivo' => StringHelper::intValue($data['objetivosAhorro'])
                ]);
            }
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al guardar la sección de administración de ingresos: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error al guardar la sección de administración de ingresos: ' . $e->getMessage());
        }
    }

    private function validateEmprendedor(Usuario $usuario)
    {
        if (!$usuario || $usuario->tipo_usuario !== TipoUsuario::EMPRENDEDOR) {
            throw new \Exception('Solo los usuarios con rol Emprendedor pueden tener línea base.');
        }
    }

    private function createLineaBase(): LineaBase
    {
        $usuario = JWTAuth::user();

        $this->validateEmprendedor($usuario);

        if ($usuario->lineaBase()->exists()) {
            throw new \Exception('El usuario ya tiene una línea base creada. Solo se permite una línea base por usuario.');
        }
        try {
            return LineaBase::create([
                'id_usuario' => $usuario->id,
                'id_etapa' => EtapaFormacionController::getCurrentEtapaId(),
                'fecha_creacion' => Carbon::now()
            ]);
        } catch (QueryException $e) {
            throw new \Exception('Error en la base de datos al crear la línea base: ' . $e->getMessage());
        } catch (\Illuminate\Database\Eloquent\MassAssignmentException $e) {
            throw new \Exception('Error de asignación masiva al crear la línea base: ' . $e->getMessage());
        } catch (\Exception $e) {
            throw new \Exception('Error inesperado al crear la línea base: ' . $e->getMessage());
        }
    }
}