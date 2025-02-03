<?php

include_once '../../../../../loader.php';

class SeguimientoCasoNuevoAPI extends API {

    function listarTiposEtapasFormacion() {
        $this->enviarRespuesta(getAdminEtapaFormacion()->listarTiposEtapasFormacion());
    }

    function guardarCaso() {
        $nombreInputFile = "fotografiasCaso";
        $this->data[$nombreInputFile] = Util::recuperarArchivosServidor($nombreInputFile);
        $this->enviarResultadoOperacion(getAdminEmprendedor()->guardarSeguimientoCaso($this->data));
    }
}

Util::iniciarAPI(SeguimientoCasoNuevoAPI::class);
