<?php

namespace App\Http\Controllers;

use App\Models\Emprendedor;
use App\Http\Resources\EmprendedorResource;
use App\Http\Responses\ApiResponse;

class EmprendedorController extends Controller
{
    /**
     * Obtiene el perfil del emprendedor desde la base de datos
     * @param int $id ID de emprendedor (id_emprendedor)
     */
    public function getPerfil($id)
    {
        try {
            // Se asume que $id es el id_emprendedor de la tabla usuario_emprendedor
            $emprendedor = Emprendedor::with(['usuario', 'expediente'])->find($id);
            
            if (!$emprendedor || !$emprendedor->usuario) {
                return ApiResponse::notFound('Emprendedor no encontrado');
            }

            return ApiResponse::success(new EmprendedorResource($emprendedor), 'Perfil obtenido correctamente');

        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el perfil: ' . $e->getMessage(), ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
