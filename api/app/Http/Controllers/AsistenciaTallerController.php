<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AsistenciaTaller;
use App\Models\EtapaFormacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AsistenciaTallerController extends Controller
{
    /**
     * Devuelve las etapas que tienen talleres configurados en su cronograma.
     * Basado en la logica: AsistenciaTallerAPI -> getEtapas y getAdminEtapaFormacion()->listarEtapasConCronograma()
     */
    public function getEtapas()
    {
        // En legacy se listaban las etapas que ya estuvieran en cronograma.
        // Pero para asistencia, normalmente es util listar todas las etapas activas.
        // Simulando el query mas sencillo:
        $etapas = DB::table('etapa_formacion')
            ->orderBy('id_etapa', 'desc')
            ->get();
            
        return response()->json($etapas);
    }

    /**
     * Lista los talleres que estan asociados al cronograma de una etapa
     */
    public function getTalleresPorEtapa($idEtapa)
    {
        $sql = "SELECT c.id_taller as id,
                       t.nombre as nombre_taller, 
                       DATE_FORMAT(c.fecha, '%d/%m/%Y') as fecha
                FROM cronograma_taller c
                JOIN taller t ON c.id_taller = t.id_taller
                WHERE c.id_etapa = ?
                ORDER BY c.fecha ASC";
                
        $talleres = DB::select($sql, [$idEtapa]);
        return response()->json($talleres);
    }

    /**
     * Lista los emprendedores inscritos en la etapa dada, con su estatus de asistencia para el taller especifico.
     */
    public function getEmprendedoresPorEtapaTaller($idEtapa, $idTaller)
    {
        $sql = "SELECT e.id_emprendedor as id, 
                       e.nombre, 
                       e.apellidos, 
                       e.correo_electronico, 
                       e.numero_celular, 
                       e.fotografia,
                       COALESCE(a.asiste, 0) as asiste, 
                       a.observacion
                FROM listar_emprendedores_por_etapa e
                LEFT JOIN asistencia_taller a 
                       ON e.id_emprendedor = a.id_emprendedor AND a.id_taller = ? AND a.id_etapa = ?
                WHERE e.id_etapa = ?";
                
        $emprendedores = DB::select($sql, [$idTaller, $idEtapa, $idEtapa]);
        
        // Optimizar la fotografia (esconder BLOB o truncarlo en lista, asi como con Instructor)
        foreach ($emprendedores as &$emp) {
            if (!empty($emp->fotografia)) {
                // Return solo booleano de si tiene o no foto, el front pedira la imagen en otra ruta
                $emp->tiene_foto = true;
            } else {
                $emp->tiene_foto = false;
            }
            unset($emp->fotografia); // Ocultar el RAW Blob
            $emp->asiste = (int) $emp->asiste;
        }

        return response()->json($emprendedores);
    }

    /**
     * Registra o actualiza la asistencia de un emprendedor a un taller.
     */
    public function registrarAsistencia(Request $request, $idEtapa, $idTaller)
    {
        $validator = Validator::make($request->all(), [
            'id_asistente' => 'required|integer',
            'asiste' => 'required|integer',
            'observacion' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $idAsistente = $request->input('id_asistente');
        $asiste = $request->input('asiste');
        $observacion = $request->input('observacion', '');

        // Buscar registro de asistencia actual
        $asistencia = AsistenciaTaller::where('id_taller', $idTaller)
            ->where('id_emprendedor', $idAsistente)
            ->where('id_etapa', $idEtapa)
            ->first();

        try {
            if ($asistencia) {
                // Actualizar
                $asistencia->asiste = $asiste;
                $asistencia->observacion = $observacion;
                $asistencia->save();
            } else {
                // Crear nueva
                AsistenciaTaller::create([
                    'id_taller' => $idTaller,
                    'id_emprendedor' => $idAsistente,
                    'id_etapa' => $idEtapa,
                    'asiste' => $asiste,
                    'observacion' => $observacion,
                    'fecha' => date('Y-m-d')
                ]);
            }

            return response()->json(['success' => true, 'message' => 'Asistencia registrada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
