<?php

include_once '../../../../../loader.php';

class SeguimientoCasoAPI extends API {

    function recuperarInfoEmprendedor() {
        $this->enviarRespuesta([
            "emprendedor" => getAdminUsuario()->buscarUsuarioPorID($this->getData("emprendedor")),
            "seguimientoCaso" => getAdminEmprendedor()->recuperarSeguimientoCaso($this->getData("lineaBase")),
        ]);
    }
    
    function eliminarImagen() {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarImagenSeguimientoCaso($this->getData("id")));
    }

    function listarTiposEtapasFormacion() {
        $this->enviarRespuesta(getAdminEtapaFormacion()->listarTiposEtapasFormacion());
    }

    function guardarCaso() {
        $nombreInputFile = "fotografiasCaso";
        $this->data[$nombreInputFile] = Util::recuperarArchivosServidor($nombreInputFile);
        $this->enviarResultadoOperacion(getAdminEmprendedor()->guardarSeguimientoCaso($this->data));
    }
}

SeguimientoCasoAPI::start();
