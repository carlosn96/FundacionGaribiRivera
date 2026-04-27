<?php

require_once '../../../../../loader.php';


class ReportesAPI extends API
{

    public function getPersonasCapacitadasPorAnio()
    {
        $anio = $this->getData('anio');
        $dao = new ReportesDAO();
        $resultado = $dao->getPersonasCapacitadasPorAnio($anio);
        $this->enviarRespuesta($resultado);
    }

    public function getEmprendedoresConAsistenciaIncompleta()
    {
        $dao = new ReportesDAO();
        $resultado = $dao->getEmprendedoresConAsistenciaIncompleta();
        $this->enviarRespuesta($resultado);
    }

    
    public function getAniosDisponibles()
    {
        $dao = new ReportesDAO();
        $resultado = $dao->getAniosDisponibles();
        $this->enviarRespuesta($resultado);
    }
}

ReportesAPI::start();
