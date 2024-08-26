<?php

include_once '../../../../../loader.php';

class SeguimientoCasoAPI extends API {

    function recuperarSeguimientoCaso() {
        $this->enviarRespuesta(["seguimientoCaso" => getAdminEmprendedor()->recuperarSeguimientoCaso($this->data["idLineaBase"])]);
    }

}

Util::iniciarAPI(SeguimientoCasoAPI::class);
