<?php

namespace App\Http\Controllers;

use App\Models\Emprendedor;
use App\Models\LineaBase\LineaBase;
use App\Http\Resources\EmprendedorResource;
use App\Http\Responses\ApiResponse;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;

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

            return ApiResponse::success(new EmprendedorResource($emprendedor), 'Perfil obtenido correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el perfil: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
