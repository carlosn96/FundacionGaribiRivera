<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Emprendedor;
use App\Models\PagoMensual;
use App\Models\PagoParcial;
use App\Http\Resources\PagoMensualResource;
use App\Http\Resources\PagoParcialResource;
use Carbon\Carbon;
use App\Http\Responses\ApiResponse;

class PagoController extends Controller
{
    /**
     * Obtiene el histórico de pagos (mensuales y parciales).
     */
    public function getPagos($idEmprendedor)
    {
        $emprendedor = Emprendedor::with(['pagosMensuales', 'pagosParciales', 'expediente'])->find($idEmprendedor);
        
        if (!$emprendedor) {
            return ApiResponse::notFound('Emprendedor no encontrado');
        }

        return ApiResponse::success([
            'pagosMensuales' => PagoMensualResource::collection($emprendedor->pagosMensuales),
            'pagosParciales' => PagoParcialResource::collection($emprendedor->pagosParciales),
        ], 'Pagos obtenidos correctamente');
    }

    /**
     * Calcula las próximas fechas de vencimiento pendientes
     */
    public function getFechasPendientes($idEmprendedor)
    {
        $emprendedor = Emprendedor::with('expediente')->find($idEmprendedor);
        
        if (!$emprendedor || !$emprendedor->expediente) {
            return ApiResponse::success(['fechas' => []], 'Sin expediente');
        }

        $expediente = $emprendedor->expediente;
        $cantidadMensualidades = $expediente->cantidad_documentos_elaborados;
        $cantidadExtras = $expediente->cantidad_documentos_extra_elaborados;
        
        $totalPagos = $cantidadMensualidades + $cantidadExtras;
        
        $fechaInicio = $expediente->fecha_inicio ? Carbon::parse($expediente->fecha_inicio) : Carbon::parse($expediente->fecha_entrega)->addMonth();
        
        // Generar todas las fechas teóricas
        $fechasTeoricas = [];
        for ($i = 0; $i < $totalPagos; $i++) {
            $fechasTeoricas[] = $fechaInicio->copy()->addMonths($i)->format('Y-m-d');
        }
        
        // Obtener fechas ya pagadas (sólo pagos Mensuales y Extras que cubren cuota)
        $pagosRealizados = PagoMensual::where('id_emprendedor', $idEmprendedor)
                                      ->pluck('fecha_aplicacion')
                                      ->toArray();
                                      
        $fechasPendientes = array_values(array_diff($fechasTeoricas, $pagosRealizados));
        
        // Retornar las próximas 2
        return ApiResponse::success([
            'fechas' => array_slice($fechasPendientes, 0, 2)
        ], 'Fechas pendientes calculadas');
    }

    /**
     * Agregar Pago Mensual o Extra
     */
    public function agregarPago(Request $request)
    {
        $this->validate($request, [
            'idEmprendedor' => 'required|integer',
            'monto' => 'required|numeric',
            'tipoPago' => 'required|in:Mensual,Extra',
            'fechaAplicacion' => 'required|date',
            'fechaRecepcion' => 'required|date'
        ]);

        try {
            // Generar número de recibo simple basado en timestamp o ID
            $numeroRecibo = 'FGR-' . time() . '-' . rand(100, 999);

            $pago = PagoMensual::create([
                'id_emprendedor' => $request->input('idEmprendedor'),
                'numero_recibo' => $numeroRecibo,
                'tipo_pago' => $request->input('tipoPago'),
                'monto' => $request->input('monto'),
                'aportacion_solidaria' => $request->input('aportacionSolidaria', 0),
                'donativo' => $request->input('donativo', 0),
                'fecha_aplicacion' => $request->input('fechaAplicacion'),
                'fecha_recepcion' => $request->input('fechaRecepcion')
            ]);

            return ApiResponse::success([
                'pago' => new PagoMensualResource($pago)
            ], 'Pago registrado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al guardar el pago: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function eliminarPago($idPago)
    {
        try {
            PagoMensual::destroy($idPago);
            return ApiResponse::success([], 'Pago eliminado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar el pago: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function actualizarFechaRecepcionPago(Request $request, $idPago)
    {
        $this->validate($request, [
            'fechaRecepcion' => 'required|date'
        ]);

        try {
            $pago = PagoMensual::findOrFail($idPago);
            $pago->fecha_recepcion = $request->input('fechaRecepcion');
            $pago->save();
            return ApiResponse::success([], 'Fecha actualizada correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar la fecha: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Pago Parcial
     */
    public function agregarPagoParcial(Request $request)
    {
        $this->validate($request, [
            'idEmprendedor' => 'required|integer',
            'monto' => 'required|numeric',
            'fecha' => 'required|date'
        ]);

        try {
            $pago = PagoParcial::create([
                'id_emprendedor' => $request->input('idEmprendedor'),
                'monto' => $request->input('monto'),
                'fecha' => $request->input('fecha')
            ]);

            return ApiResponse::success([
                'pago' => new PagoParcialResource($pago)
            ], 'Abono registrado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al registrar el abono: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function modificarPagoParcial(Request $request, $idPago)
    {
        $this->validate($request, [
            'monto' => 'required|numeric',
            'fecha' => 'required|date'
        ]);

        try {
            $pago = PagoParcial::findOrFail($idPago);
            $pago->monto = $request->input('monto');
            $pago->fecha = $request->input('fecha');
            $pago->save();

            return ApiResponse::success(['pago' => new PagoParcialResource($pago)], 'Abono modificado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al modificar el abono: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function eliminarPagoParcial($idPago)
    {
        try {
            PagoParcial::destroy($idPago);
            return ApiResponse::success([], 'Abono eliminado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar el abono: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
