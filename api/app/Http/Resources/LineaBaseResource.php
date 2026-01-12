<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Log;

class LineaBaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_linea_base' => $this->id_linea_base,
            'id_usuario' => $this->id_usuario,
            'fecha_creacion' => $this->fecha_creacion,
            'etapa' => $this->etapa,
            'preliminar' => $this->whenLoaded('preliminar', function () {
                return [
                    'mediosConocimiento' => $this->preliminar->mediosConocimiento->map(function ($item) {
                        return $item->medio;
                    }),
                    'medioConocimiento_otro' => $this->preliminar->otro_medio_conocimiento,
                    'tiempoCapacitacion' => $this->preliminar->tiempoDedicaFormacion,
                    'razonRecurre' => $this->preliminar->razonRecurreFundacion,
                    'razonRecurre_otro' => $this->preliminar->otro_razon_recurre_fundacion,
                    'solicitaCredito' => $this->preliminar->solicitaCredito,
                    'utilizaCredito' => $this->preliminar->utilizaCredito,
                ];
            }),
            // Agregar otras secciones similares
            'identificacion' => $this->whenLoaded('identificacion', function () {
                return [
                    'edad' => $this->identificacion->edad,
                    'genero' => $this->identificacion->genero,
                    'estadoCivil' => $this->identificacion->estadoCivil,
                    'escolaridad' => $this->identificacion->escolaridad,
                    'discapacidad' => $this->identificacion->discapacidad,
                ];
            }),
            'domicilio' => $this->whenLoaded('domicilio', function () {
                return [
                    'codigoPostal' => $this->domicilio->codigoPostal->only(['id_codigo', 'codigo_postal']),
                    'estado' => $this->domicilio->codigoPostal->municipio->estado,
                    'municipio' => $this->domicilio->codigoPostal->municipio->only(['id_municipio', 'nombre']),
                    'colonia' => $this->domicilio->colonia,
                    'calle' => $this->domicilio->calle,
                    'calleCruce1' => $this->domicilio->calle_cruce_1,
                    'calleCruce2' => $this->domicilio->calle_cruce_2,
                    'numeroExterior' => $this->domicilio->numero_exterior,
                    'numeroInterior' => $this->domicilio->numero_interior,
                    'comunidadParroquial' => $this->domicilio->comunidadParroquial->only(['id_comunidad', 'nombre']),
                    'decanato' => $this->domicilio->comunidadParroquial->decanato->only(['id_decanato', 'nombre']),
                    'vicaria' => $this->domicilio->comunidadParroquial->decanato->vicaria,
                ];
            }),
            'socioeconomico' => $this->whenLoaded('socioeconomico', function () {
                return [
                    'cantidadDependientesEconomicos' => $this->socioeconomico->cantidadDependientesEconomicos,
                    'ocupacionActual' => $this->socioeconomico->ocupacion,
                    'ingresoMensual' => $this->socioeconomico->rangoIngresoMensual,
                ];
            }),
            'negocio' => $this->whenLoaded('negocio', function () {
                return [
                    'nombre' => $this->negocio->nombre,
                    'telefono' => $this->negocio->telefono,
                    'calle' => $this->negocio->calle,
                    'calleCruce1' => $this->negocio->calle_cruce_1,
                    'calleCruce2' => $this->negocio->calle_cruce_2,
                    'numeroExterior' => $this->negocio->numero_exterior,
                    'numeroInterior' => $this->negocio->numero_interior,
                    'codigoPostal' => $this->negocio->codigoPostal->only(['id_codigo', 'codigo_postal']),
                    'colonia' => $this->negocio->colonia,
                    'estado' => $this->negocio->codigoPostal->municipio->estado,
                    'municipio' => $this->negocio->codigoPostal->municipio->only(['id_municipio', 'nombre']),
                    'antiguedad' => $this->negocio->antiguedad,
                    'cantidadEmpleados' => $this->negocio->cant_empleados,
                    'giroNegocio' => $this->negocio->negocioGiro,
                    'actividad' => $this->negocio->negocioActividad,
                    'otraActividad' => $this->negocio->otra_actividad,
                ];
            }),
            'analisisNegocio' => $this->whenLoaded('analisisNegocio', function () {
                return [
                    'registraEntradasSalidas' => boolval($this->analisisNegocio->registra_entrada_salida),
                    'asignaSueldo' => boolval($this->analisisNegocio->asigna_sueldo),
                    'conoceUtilidades' => boolval($this->analisisNegocio->conoce_utilidades),
                    'conoceProductosMayorUtilidad' => boolval($this->analisisNegocio->conoce_productos_mayor_utilidad),
                    'porcentajeGanancia' => $this->analisisNegocio->porcentaje_ganancia,
                    'identificaCompetencia' => boolval($this->analisisNegocio->identifica_competencia),
                    'quienCompetencia' => $this->analisisNegocio->quien_competencia,
                    'clientesNegocio' => $this->analisisNegocio->clientes_negocio,
                    'ventajasNegocio' => $this->analisisNegocio->ventajas_negocio,
                    'problemasNegocio' => $this->analisisNegocio->problemas_negocio,
                    'estrategiasIncrementarVentas' => $this->analisisNegocio->estrategiasIncrementarVentas->map(function ($item) {
                        return $item->estrategia;
                    }),
                    'empleoGanancias' => $this->analisisNegocio->empleoGanancias->first()->empleoGanancia,
                    'ahorro' => boolval($this->analisisNegocio->ahorro),
                    'cuantoAhorro' => $this->analisisNegocio->cuanto_ahorro,
                    'razonesNoAhorro' => $this->analisisNegocio->razones_no_ahorro,
                    'conocePuntoEquilibrio' => boolval($this->analisisNegocio->conoce_punto_equilibro),
                    'separaGastos' => boolval($this->analisisNegocio->separa_gastos),
                    'elaboraPresupuesto' => boolval($this->analisisNegocio->elabora_presupuesto),
                ];
            }),
            'administracionIngresos' => $this->whenLoaded('administracionIngresos', function () {
                return [
                    'montoMensualVentas' => $this->administracionIngresos->monto_mensual_ventas,
                    'montoMensualEgresos' => $this->administracionIngresos->monto_mensual_egresos,
                    'montoMensualUtilidades' => $this->administracionIngresos->monto_mensual_utilidades,
                    'sueldoMensual' => $this->administracionIngresos->sueldo_mensual,
                    'esNegocioPrincipalFuentePersonal' => boolval($this->administracionIngresos->es_negocio_principal_fuente_personal),
                    'esNegocioPrincipalFuenteFamiliar' => boolval($this->administracionIngresos->es_negocio_principal_fuente_familiar)
                ];
            }),
            'objetivosAhorro' => $this->whenLoaded('administracionIngresos', function () {
                return [
                    "tieneHabitoAhorro" => boolval($this->administracionIngresos->habito_ahorro),
                    'cuentaSistemaAhorro' => boolval($this->administracionIngresos->cuenta_sistema_ahorro),
                    'detalleSistemaAhorro' => $this->administracionIngresos->detalle_sistema_ahorro,
                    'montoAhorroMensual' => $this->administracionIngresos->monto_ahorro_mensual,
                    'objetivosAhorro' => $this->administracionIngresos->objetivosAhorro->first()->objetivoAhorro
                ];
            }),
        ];
    }
}