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
        getAdminEtapaFormacion()->listarTalleresPorEtapa();
        $talleres = $dao->listarTalleresPorEtapa($idEtapa);
        $this->exito($talleres);
    }

    public function getEmprendedoresPorEtapa()
    {
        $idEtapa = $this->getParams()->id_etapa;
        $dao = new EmprendedorDAO();
        $emprendedores = $dao->listarPorEtapa($idEtapa);
        $this->exito($emprendedores);
    }

    public function registrarAsistencia()
    {
        $data = json_decode($this->getParams()->data);
        $dao = new AsistenciaTallerDAO();
        $idTaller = $data->id_taller;
        $fecha = $data->fecha;
        $emprendedores = $data->emprendedores;
        $result = true;
        foreach ($emprendedores as $idEmprendedor) {
            $result = $result && $dao->guardarAsistencia($idTaller, $idEmprendedor, $fecha);
        }
        $this->exito($result);
    }
}

AsistenciaTaller::start();
