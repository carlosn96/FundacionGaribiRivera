<?php
/**
 * ID Reference Guide:
 * ==================
 * - $idEmprendedor: Value from ?id=789 → id_emprendedor from tabla usuario_emprendedor
 *   PRIMARY KEY for emprendedor queries (listar, asistencias)
 *   
 * - $emprendedor["id_usuario"]: usuario.id (NOT used in this module for data queries)
 *   This is the authentication user ID, kept for reference only
 *   
 * IMPORTANT: All queries in this module use $idEmprendedor, NOT usuario.id
 * - recuperarAsistenciasEmprendedor($idEmprendedor) ← id_emprendedor
 * - listarEtapasFormacion uses id_etapa, not usuario.id
 */

include_once '../../../../../loader.php';

class VerEmprendedorAPI extends API {

    public function recuperarEmprendedor() {
        // $idEmprendedor is id_emprendedor (PRIMARY KEY for emprendedor context)
        $idEmprendedor = $this->getData('id_emprendedor');

        if (!$idEmprendedor) {
            $this->enviarRespuesta(['error' => 'No se proporcionó el ID del emprendedor.']);
            return;
        }

        try {
            // 1. Fetch Emprendedor (by id_emprendedor)
            $emprendedor = getAdminEmprendedor()->get($idEmprendedor);
            if (!$emprendedor) {
                $this->enviarRespuesta(['error' => 'Emprendedor no encontrado.']);
                return;
            }
            
            
            // Extract nombre and apellidos from nombre_completo if needed
            if (empty($emprendedor["nombre"]) && !empty($emprendedor["nombre_completo"])) {
                $partes = explode(" ", trim($emprendedor["nombre_completo"]), 2);
                $emprendedor["nombre"] = $partes[0];
                $emprendedor["apellidos"] = $partes[1] ?? "";
            }
            
            // Ensure email and phone fields are properly set
            $emprendedor["correo_electronico"] = $emprendedor["correo_electronico"] ?? $emprendedor["email"] ?? '';
            $emprendedor["numero_celular"] = $emprendedor["numero_celular"] ?? $emprendedor["telefono"] ?? '';
            
            // Handle status field
            $emprendedor["estatus"] = $emprendedor["estatus"] ?? "Activo";
            $emprendedor["fecha_inscripcion"] = $emprendedor["fecha_inscripcion"] ?? $emprendedor["fecha_registro"] ?? '';

            // Photo is already in base64 from DAO - just ensure it's a data URI
            if (!empty($emprendedor["fotografia"]) && !preg_match('/^data:image/', $emprendedor["fotografia"])) {
                // If it's just base64 string without data URI header, add it
                $emprendedor["fotografia"] = "data:image/jpeg;base64," . $emprendedor["fotografia"];
            }

            // 2. Fetch Etapa (if applicable - always use id_emprendedor)
            $etapa = null;
            if (!empty($emprendedor['id_etapa'])) {
                try {
                    $etapas = getAdminEtapaFormacion()->listarEtapasFormacion();
                    foreach ($etapas as $e) {
                        $etapaId = $e['idEtapa'] ?? $e['id'] ?? null;
                        if ($etapaId == $emprendedor['id_etapa']) {
                            $etapa = $e;
                            break;
                        }
                    }
                    
                    if (!$etapa && method_exists(getAdminEtapaFormacion(), 'obtenerEtapaPorId')) {
                        $etapa = getAdminEtapaFormacion()->obtenerEtapaPorId($emprendedor['id_etapa']);
                    }
                } catch (Exception $ex) {
                    // Etapa retrieval failed, continue without it
                }
            }

            // 3. Fetch Asistencias (always use id_emprendedor, NOT usuario.id)
            $asistencias = [];
            try {
                if (method_exists(getAdminTaller(), 'recuperarAsistenciasEmprendedor')) {
                    // IMPORTANT: Use $idEmprendedor (from id_emprendedor parameter), not usuario.id
                    $asistenciasList = getAdminTaller()->recuperarAsistenciasEmprendedor($idEmprendedor);
                    if (is_array($asistenciasList)) {
                        $asistencias = $asistenciasList;
                    }
                }
            } catch (Exception $ex) {
                // Asistencias retrieval failed, continue
            }

            $this->enviarRespuesta([
                'emprendedor' => $emprendedor,
                'etapa' => $etapa,
                'asistencias' => $asistencias
            ]);

        } catch (Exception $e) {
            $this->enviarRespuesta([
                'error' => 'Ocurrió un error en el servidor al recuperar los datos.',
                'detalles' => $e->getMessage()
            ]);
        }
    }
}

Util::iniciarAPI(VerEmprendedorAPI::class);