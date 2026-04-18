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

            // Asignar como relación virtual para que el recurso la consuma
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

            $historial = EmprendedorResource::collection($historial);

            return ApiResponse::success($historial);

        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al obtener historial: ' . $e->getMessage());
        }
    }

    /**
     * Endpoint dedicado para servir el BLOB de la fotografía directamente como archivo
     * para los emprendedores (obtenida desde su registro de usuario).
     */
    public function fotografia($id)
    {
        // Encontrar al emprendedor y cargar su relación con usuario para obtener la foto
        $emprendedor = Emprendedor::with(['usuario' => function($query) {
            $query->select('id', 'fotografia');
        }])->find($id);

        if (!$emprendedor || !$emprendedor->usuario || empty($emprendedor->usuario->fotografia)) {
            return response()->json(['error' => 'Fotografía no encontrada'], 404);
        }

        $fotografia = $emprendedor->usuario->fotografia;

        // Intentar detectar el tipo MIME, por defecto jpeg
        $mime = 'image/jpeg';
        try {
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $detectedMime = $finfo->buffer($fotografia);
            if ($detectedMime) $mime = $detectedMime;
        } catch (\Exception $e) {
            // Ignorar silenciosamente si finfo no está disponible
        }

        return response($fotografia)
            ->header('Content-Type', $mime)
            ->header('Cache-Control', 'max-age=86400, public');
    }
}
