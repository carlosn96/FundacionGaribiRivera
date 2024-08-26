<?php

include_once '../../../../../loader.php';

class SeguimientoCasoAPI extends API {

    function recuperarEmprendedores() {
        $this->enviarRespuesta(getAdminLineaBase()->listarEmprendoresConLineaBase());
    }

    function recuperarSeguimientoCaso() {
        $this->enviarRespuesta(["seguimientoCaso" => getAdminEmprendedor()->recuperarSeguimientoCaso($this->data["idLineaBase"])]);
    }
    function eliminarSeguimientoCaso() {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarSeguimientoCaso($this->data["id"]));
    }
}

Util::iniciarAPI(SeguimientoCasoAPI::class);
