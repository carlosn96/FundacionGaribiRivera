<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\EmprendedorExpedienteResource;
use App\Models\EmprendedorExpediente;
use Illuminate\Validation\Rule;
use App\Models\Emprendedor;

class CobranzaController extends Controller
{
    /**
     * Obtiene el historial de emprendedores llamando a la vista "listar_emprendedores"
     */
    public function getHistorialEmprendedores()
    {
        try {
            // Seleccionamos todo de la vista (o tabla) 'listar_emprendedores'
            $historial = DB::table('listar_emprendedores')->get();
            
            // Convertimos la fotografía binaria a base64 tal como lo hace el backend legacy
            $historial = $historial->map(function ($row) {
                if (!empty($row->fotografia)) {
                    $row->fotografia = base64_encode($row->fotografia);
                }
                return $row;
            });

            return ApiResponse::success([
                'historial' => $historial
            ], 'Historial obtenido correctamente');
            
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener historial: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Actualiza la referencia y la fecha de crédito de un emprendedor
     */
    public function actualizarReferencia(Request $request)
    {
        $id = $request->input('id');
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'referencia' => [
                'required',
                Rule::unique('usuario_emprendedor', 'referencia')->ignore($id, 'id_emprendedor')
            ],
            'fechaOtorgamiento' => 'nullable|date'
        ], [
            'referencia.unique' => 'El número de referencia ya está asignado a otro emprendedor.'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $emprendedor = Emprendedor::find($id);
            
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
     * Obtiene el expediente de un emprendedor desde la base de datos
     */
    public function getExpediente($id)
    {
        try {
            $expediente = EmprendedorExpediente::where('id_emprendedor', $id)->first();

            if (!$expediente) {
                return ApiResponse::success(null, 'Sin expediente');
            }

            return ApiResponse::success(new EmprendedorExpedienteResource($expediente), 'Expediente obtenido');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener expediente: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Guarda o actualiza un expediente de emprendedor
     */
    public function saveExpediente(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_emprendedor' => 'required|integer',
            'montoSolicitado' => 'required|numeric|min:0',
            'fechaInicio' => 'nullable|date',
            'fechaTermino' => 'nullable|date',
            'cantidadDocumentosElaborados' => 'required|integer|min:0',
            'cantidadDocumentosExtraElaborados' => 'nullable|integer|min:0',
            'montoDocumento' => 'nullable|numeric|min:0',
            'montoPorDocumentoExtra' => 'nullable|numeric|min:0',
            'cantAportacionesSolidariasPactado' => 'nullable|integer|min:0',
            'montoAportacionSolidariaPactado' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Datos inválidos: ' . json_encode($validator->errors()), ApiResponse::HTTP_BAD_REQUEST);
        }

        try {
            $data = [
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
                ['id_emprendedor' => $request->input('id_emprendedor')],
                $data
            );

            return ApiResponse::success([
                'expediente' => new EmprendedorExpedienteResource($expediente)
            ], 'Expediente guardado correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar el expediente: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}


