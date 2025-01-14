<?php

include_once '../../../../../loader.php';

class TallerAPI extends API {

    function recuperarTalleres() {
        $admin = getAdminTaller();
        $this->enviarRespuesta([
            "talleres" => $admin->listarDetallesTalleres(),
            "tiposTaller" => $admin->obtenerTipoTalleres(),
            "instructores" => $this->reducirListadoInstructores($admin->listarInstructores())
        ]);
    }
    
    function crearTaller() {
        $nombre = $this->data['nombreCrearTaller'];
        $tipoTaller = $this->data['tipoTallerCrear'];
        $observaciones = $this->data['observacionesTallerCrear'];
        $instructor = $this->data['instructorTallerCrear'];
        $evaluacionHabilitada = 0;
        $taller = new Taller($nombre, $tipoTaller, $evaluacionHabilitada, $observaciones, $instructor);
        $this->enviarResultadoOperacion(getAdminTaller()->agregarTaller($taller));
    }

    function recuperarInstructor() {
        $this->enviarRespuesta(getAdminTaller()->recuperarInstructor($this->data["id"]));
    }
    
    function actualizarTaller() {
        $this->enviarResultadoOperacion(getAdminTaller()->actualizarTaller($this->data));
    }
    
    function eliminarTaller() {
        $this->enviarResultadoOperacion(getAdminTaller()->eliminarTaller($this->getData("id")));
    }
    
    private function reducirListadoInstructores($instructores) {
        return array_map(function ($instructor) {
            return [$instructor["id"], $instructor['nombreCompleto']];
        }, $instructores);
    }
    
    
}

Util::iniciarAPI(TallerAPI::class);
