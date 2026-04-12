<?php

namespace App\Http\Controllers;

use App\Models\Emprendedor;
use App\Models\LineaBase\LineaBase;
use App\Http\Resources\EmprendedorResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\HistorialEmprendedorResource;

class EmprendedorController extends Controller
{
    /**
     * Obtiene el perfil completo del emprendedor para el dashboard de expediente.
     * Incluye: usuario, expediente (con aval, inmuebleGarantia, resumenEjecutivo)
     * y última línea base (con etapa, domicilio personal y domicilio negocio).
     *
     * @param int $id  id_emprendedor de usuario_emprendedor
     */
    public function getPerfil($id)
    {
        try {
            $emprendedor = Emprendedor::with([
                'usuario',
                'expediente.aval.parentesco',
                'expediente.aval.codigoPostal.municipio.estado',
                'expediente.inmuebleGarantia.codigoPostal.municipio.estado',
                'expediente.resumenEjecutivo',
            ])->find($id);

            if (!$emprendedor || !$emprendedor->usuario) {
                return ApiResponse::notFound('Emprendedor no encontrado');
            }

            // Cargar la última línea base del usuario (linea_base.id_usuario = usuario.id)
            $lineaBase = LineaBase::with([
                'etapa',
                'domicilio.codigoPostal.municipio.estado',
                'negocio.codigoPostal.municipio.estado',
            ])
                ->where('id_usuario', $emprendedor->usuario->id)
                ->latest('id_linea_base')
                ->first();

            // Asignar como relación virtual para que EmprendedorResource la consuma
            $emprendedor->setRelation('lineaBase', $lineaBase);

            return ApiResponse::success(new EmprendedorResource($emprendedor));

        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al obtener el perfil: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene el historial de emprendedores llamando a la vista "listar_emprendedores"
     */
    public function getHistorialEmprendedores()
    {
        try {
            $historial = DB::table('listar_emprendedores')
                ->join("linea_base", "listar_emprendedores.id", "linea_base.id_usuario")
                ->select("listar_emprendedores.*")->get();

            $historial = HistorialEmprendedorResource::collection($historial);

            return ApiResponse::success($historial);

        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al obtener historial: ' . $e->getMessage());
        }
    }
}
