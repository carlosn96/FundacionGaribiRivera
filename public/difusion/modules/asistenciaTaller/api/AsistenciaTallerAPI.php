<?php
require_once '../../../../../loader.php';

class AsistenciaTallerAPI extends API
{

    public function getEtapas()
    {
        $this->enviarRespuesta(getAdminEtapaFormacion()->listarEtapasFormacion());
    }

    public function getTalleresPorEtapa()
    {
        $idEtapa = $this->getData("id_etapa");
        $talleres = getAdminTaller()->listarTalleresPorEtapa($idEtapa);
        $this->enviarRespuesta($talleres);
    }

    public function getEmprendedoresPorEtapaTaller()
    {
        $idEtapa = $this->getData("id_etapa");
        $idTaller = $this->getData("id_taller");
        $emprendedores = getAdminTaller()->recuperarListaInscritosPorTaller($idTaller, $idEtapa);
        $this->enviarRespuesta($emprendedores);
    }

    public function registrarAsistencia()
    {
        $idTaller = $this->getData('id_taller');
        $idEtapa = $this->getData('id_etapa');
        $asistencias = $this->getData('asistencias');

        $admin = getAdminTaller();
        $result = true;

        foreach ($asistencias as $asistencia) {
            $idEmprendedor = $asistencia['id_emprendedor'];
            $asiste = $asistencia['asiste'];
            $observacion = $asistencia['observacion'] ?? null;
            $res = $admin->actualizarAsistencia($idTaller, $idEmprendedor, $idEtapa, $asiste, $observacion);
            $result = $result && $res;
        }
        $this->enviarRespuesta(["mensaje" => $result ? "Asistencia guardada correctamente" : "Error guardando asistencias", "es_valor_error" => !$result]);
    }
}

AsistenciaTallerAPI::start();
