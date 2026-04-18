<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\EmprendedorExpedienteResource;
use App\Models\EmprendedorExpediente;
use App\Models\ExpedienteAval;
use App\Models\ExpedienteInmuebleGarantia;
use App\Models\ExpedienteResumenEjecutivo;
use Illuminate\Validation\Rule;
use App\Models\Emprendedor;
use App\Utils\StringHelper;
use Carbon\Carbon;
use App\Http\Controllers\PdfController;

class CobranzaController extends Controller
{
    /**
     * Actualiza la referencia y la fecha de crédito de un emprendedor
     */
    public function actualizarReferencia(Request $request)
    {
        $idEmprendedor = $request->input('idEmprendedor');
        $validator = Validator::make($request->all(), [
            'idEmprendedor' => [
                'required',
                Rule::unique('usuario_emprendedor', 'referencia')->ignore($idEmprendedor, 'id_emprendedor')
            ],
            'fechaOtorgamiento' => 'nullable|date'
        ], [
            'referencia.unique' => 'El número de referencia ya está asignado a otro emprendedor.'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $emprendedor = Emprendedor::find($idEmprendedor);

            if (!$emprendedor) {
                return ApiResponse::notFound('Emprendedor no encontrado');
            }

            $emprendedor->referencia = $request->input('referencia');
            $fecha = $request->input('fechaOtorgamiento');
            $emprendedor->fecha_credito = empty($fecha) ? null : $fecha;
            $updated = $emprendedor->save();

            return ApiResponse::success([], $updated > 0 ? "Actualización exitosa" : "No se encontró el registro o no hubo cambios");

        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtiene el expediente completo (con aval, inmueble, resumen ejecutivo)
     */
    public function getExpediente($id)
    {
        try {
            $expediente = EmprendedorExpediente::with([
                'emprendedor.usuario',
                'aval.codigoPostal.municipio.estado',
                'inmuebleGarantia.codigoPostal.municipio.estado',
                'resumenEjecutivo.viabilidad',
                'resumenEjecutivo.diagnosticoSocial',
                'resumenEjecutivo.vulnerabilidadRel',
            ])->where('id_emprendedor', $id)->first();

            if (!$expediente) {
                return ApiResponse::success(null, 'Sin expediente');
            }

            return ApiResponse::success(new EmprendedorExpedienteResource($expediente), 'Expediente obtenido');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener expediente: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Guarda o actualiza el expediente financiero del emprendedor
     */
    public function saveInfoFinanciera(Request $request)
    {
        $idEmprendedor = $request->input('idEmprendedor');
        $validator = Validator::make($request->all(), [
            'idEmprendedor' => 'required|integer',
            'numeroExpediente' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique('emprendedor_expediente', 'numero_expediente')->ignore($idEmprendedor, 'id_emprendedor')
            ],
            'montoSolicitado' => 'required|numeric|min:0',
            'fechaInicio' => 'nullable|date',
            'fechaTermino' => 'nullable|date',
            'cantidadDocumentosElaborados' => 'required|integer|min:0',
            'cantidadDocumentosExtraElaborados' => 'nullable|integer|min:0',
            'montoDocumento' => 'nullable|numeric|min:0',
            'montoPorDocumentoExtra' => 'nullable|numeric|min:0',
            'cantAportacionesSolidariasPactado' => 'nullable|integer|min:0',
            'montoAportacionSolidariaPactado' => 'nullable|numeric|min:0',
        ], [
            'numeroExpediente.unique' => "El número de expediente {$request->input('numeroExpediente')} ya está asignado a otro emprendedor."
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $data = [
                'numero_expediente' => StringHelper::getValidValueOrNull($request->all(), 'numeroExpediente'),
                'monto_solicitado' => $request->input('montoSolicitado'),
                'fecha_inicio' => $request->input('fechaInicio') ?: null,
                'fecha_termino' => $request->input('fechaTermino') ?: null,
                'cantidad_documentos_elaborados' => $request->input('cantidadDocumentosElaborados'),
                'cantidad_documentos_extra_elaborados' => $request->input('cantidadDocumentosExtraElaborados', 0),
                'monto_documento' => $request->input('montoDocumento', 0.00),
                'monto_por_documento_extra' => $request->input('montoPorDocumentoExtra', 0.00),
                'cant_aportaciones_solidarias_pactado' => $request->input('cantAportacionesSolidariasPactado', 0),
                'monto_aportacion_solidaria_pactado' => $request->input('montoAportacionSolidariaPactado', 0.00),
            ];

            $expediente = EmprendedorExpediente::updateOrCreate(
                ['id_emprendedor' => $request->input('idEmprendedor')],
                $data
            );

            return ApiResponse::success([
                'expediente' => new EmprendedorExpedienteResource($expediente)
            ], 'Información financiera guardada correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar la información financiera: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Guarda o actualiza los datos del aval del expediente
     */
    public function saveAval(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idExpediente' => 'required|integer|exists:emprendedor_expediente,id_expediente',
            'nombreCompleto' => 'required|string|max:255',
            'edad' => 'required|integer|min:1|max:120',
            'idParentesco' => 'required|integer|exists:cat_parentescos,id_parentesco',
            'relacionParentesco' => 'nullable|string|max:100',
            'celular' => 'required|string|max:15',
            'telFijo' => 'nullable|string|max:15',
            'calle' => 'required|string|max:255',
            'calleCruce1' => 'required|string|max:255',
            'calleCruce2' => 'required|string|max:255',
            'numeroExterior' => 'required|string|max:20',
            'numeroInterior' => 'nullable|string|max:20',
            'idCodigoPostal' => 'required|integer|exists:linea_base_cpostal,id_codigo',
            'colonia' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $aval = ExpedienteAval::updateOrCreate(
                ['id_expediente' => $request->input('idExpediente')],
                [
                    'nombre_completo' => $request->input('nombreCompleto'),
                    'edad' => $request->input('edad'),
                    'id_parentesco' => $request->input('idParentesco'),
                    'relacion_parentesco' => $request->input('relacionParentesco', ''),
                    'celular' => $request->input('celular'),
                    'tel_fijo' => $request->input('telFijo'),
                    'calle' => $request->input('calle'),
                    'calle_cruce_1' => $request->input('calleCruce1'),
                    'calle_cruce_2' => $request->input('calleCruce2'),
                    'numero_exterior' => $request->input('numeroExterior'),
                    'numero_interior' => $request->input('numeroInterior'),
                    'id_codigo_postal' => $request->input('idCodigoPostal'),
                    'colonia' => $request->input('colonia'),
                ]
            );

            return ApiResponse::success(['aval' => new \App\Http\Resources\ExpedienteAvalResource($aval)], 'Datos del aval guardados correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar el aval: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Guarda o actualiza el domicilio del inmueble en garantía
     */
    public function saveInmuebleGarantia(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idExpediente' => 'required|integer|exists:emprendedor_expediente,id_expediente',
            'calle' => 'required|string|max:255',
            'numeroExterior' => 'required|string|max:20',
            'numeroInterior' => 'nullable|string|max:20',
            'calleCruce1' => 'required|string|max:255',
            'calleCruce2' => 'required|string|max:255',
            'idCodigoPostal' => 'required|integer|exists:linea_base_cpostal,id_codigo',
            'colonia' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $inmueble = ExpedienteInmuebleGarantia::updateOrCreate(
                ['id_expediente' => $request->input('idExpediente')],
                [
                    'calle' => $request->input('calle'),
                    'numero_exterior' => $request->input('numeroExterior'),
                    'numero_interior' => $request->input('numeroInterior'),
                    'calle_cruce_1' => $request->input('calleCruce1'),
                    'calle_cruce_2' => $request->input('calleCruce2'),
                    'id_codigo_postal' => $request->input('idCodigoPostal'),
                    'colonia' => $request->input('colonia'),
                ]
            );

            return ApiResponse::success(['inmueble' => new \App\Http\Resources\ExpedienteInmuebleGarantiaResource($inmueble)], 'Domicilio del inmueble guardado correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar el inmueble: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Guarda o actualiza el resumen ejecutivo del préstamo
     */
    public function saveResumenEjecutivo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idExpediente' => 'required|integer|exists:emprendedor_expediente,id_expediente',
            'nombreProyecto' => 'required|string|max:255',
            'resumenProyecto' => 'required|string',
            'idViabilidad' => 'required|integer|exists:cat_viabilidades,id_viabilidad',
            'idDiagnosticoSocial' => 'required|integer|exists:cat_diagnosticos_sociales,id_diagnostico_social',
            'quienOtorgaDiagnostico' => 'required|string|max:255',
            'observaciones' => 'required|string',
            'idVulnerabilidad' => 'required|integer|exists:cat_vulnerabilidades,id_vulnerabilidad',
            'importeSolicitado' => 'required|numeric|min:0',
            'inversionEmprendedor' => 'required|numeric|min:0',
            'importeSugeridoCoordinador' => 'required|numeric|min:0',
            'aprobadoPorAuxiliarDireccion' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $resumen = ExpedienteResumenEjecutivo::updateOrCreate(
                ['id_expediente' => $request->input('idExpediente')],
                [
                    'nombre_proyecto' => $request->input('nombreProyecto'),
                    'resumen_proyecto' => $request->input('resumenProyecto'),
                    'id_viabilidad' => $request->input('idViabilidad'),
                    'id_diagnostico_social' => $request->input('idDiagnosticoSocial'),
                    'quien_otorga_diagnostico' => $request->input('quienOtorgaDiagnostico'),
                    'observaciones' => $request->input('observaciones'),
                    'id_vulnerabilidad' => $request->input('idVulnerabilidad'),
                    'importe_solicitado' => $request->input('importeSolicitado'),
                    'inversion_emprendedor' => $request->input('inversionEmprendedor'),
                    'importe_sugerido_coordinador' => $request->input('importeSugeridoCoordinador'),
                    'aprobado_por_auxiliar_direccion' => $request->input('aprobadoPorAuxiliarDireccion'),
                ]
            );

            return ApiResponse::success(['resumen' => new \App\Http\Resources\ExpedienteResumenEjecutivoResource($resumen)], 'Resumen ejecutivo guardado correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar el resumen ejecutivo: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Reune los datos y solicita al PdfController la generación de la tarjeta de pagos en PDF.
     */
    public function getTarjetaPagosPdf($id)
    {
        try {
            $emprendedor = Emprendedor::with([
                'usuario',
                'expediente.resumenEjecutivo',
            ])->find($id);

            if (!$emprendedor || !$emprendedor->usuario || !$emprendedor->expediente) {
                return ApiResponse::notFound('Información insuficiente para generar la tarjeta de pagos.');
            }

            $expediente = $emprendedor->expediente;

            $monto = floatval($expediente->monto_solicitado);
            $num_pagos = intval($expediente->cantidad_documentos_elaborados);
            if ($num_pagos == 0) {
                $num_pagos = ($expediente->resumenEjecutivo && $expediente->resumenEjecutivo->numero_pagos)
                    ? intval($expediente->resumenEjecutivo->numero_pagos)
                    : 12;
            }

            $montoMensual = floatval($expediente->monto_documento);
            if ($montoMensual == 0 && $num_pagos > 0) {
                $montoMensual = $monto / $num_pagos;
            }

            $fechaCreditoRaw = $emprendedor->fecha_credito ?: Carbon::now('America/Mexico_City');
            $fecha_credito = Carbon::parse($fechaCreditoRaw);

            // Calculate payments list
            $pagos = [];
            $saldo = $monto;

            for ($i = 1; $i <= $num_pagos; $i++) {
                $pagoMonto = $montoMensual;
                $saldo -= $pagoMonto;
                if ($saldo < 0) {
                    $pagoMonto += $saldo; // ajuste final
                    $saldo = 0;
                }
                $fecha_pago = (clone $fecha_credito)->addMonths($i);
                $pagos[] = [
                    'numero' => $i,
                    'fecha' => $fecha_pago->format('d/m/Y'),
                    'monto' => $pagoMonto,
                    'saldo' => $saldo > 0 ? $saldo : 0
                ];
                if ($saldo <= 0)
                    break;
            }

            $viewData = [
                'emprendedor' => $emprendedor,
                'expediente' => $expediente,
                'monto' => $monto,
                'num_pagos' => $num_pagos,
                'monto_mensual' => $montoMensual,
                'pagos' => $pagos
            ];

            $pdfController = new PdfController();
            $pdfController->renderPdfBase(
                'tarjeta_pagos_pdf', // $viewName
                $viewData,      // $viewData
                "Tarjeta_Pagos_{$emprendedor->usuario->nombre}.pdf", // $filename
            );

        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al generar la tarjeta de pagos: ' . $e->getMessage());
        }
    }

    /**
     * Elimina el expediente completo (aval, inmueble, resumen) de un emprendedor
     */
    public function eliminarExpediente($id)
    {

        return DB::transaction(function () use ($id) {
            $expediente = EmprendedorExpediente::where('id_emprendedor', $id)->first();

            if (!$expediente) {
                return ApiResponse::notFound('Expediente no encontrado');
            }
            
            $expediente->aval()->delete();
            $expediente->inmuebleGarantia()->delete();
            $expediente->resumenEjecutivo()->delete();
            $deleted = $expediente->delete();

            return ApiResponse::deleted($deleted);
        });

    }
}
