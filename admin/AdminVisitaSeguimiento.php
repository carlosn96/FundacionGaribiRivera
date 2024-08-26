<?php

class AdminVisitaSeguimiento extends Admin {

    private const VISITA_REALIZADA = 6;

    public function __construct() {
        parent::__construct(new VisitaSeguimientoDAO);
    }

    public function listadoSimple($idEmprendedor) {
        return $this->dao->listadoSimpleVisitaSeguimiento($idEmprendedor);
    }

    public function recuperarListaResultadoVisitaSeguimiento() {
        return $this->extraerInfoCampoEspecifico("visita_seguimiento_resultado_visita", "id_resultado", "resultado", " WHERE id_resultado != " . self::VISITA_REALIZADA);
    }
    
    public function recuperarListaActividadComplementaria() {
        return $this->extraerInfoCampoEspecifico("visita_seguimiento_actividad_complementaria", "id_actividad", "actividad");
    }
    public function recuperarListaProblemasActuales() {
        return $this->extraerInfoCampoEspecifico("visita_seguimiento_problemas_actuales", "id_problema", "problema");
    }

}
