<?php

include_once '../../../../../loader.php';

class LineaBaseAPI extends API {

    function consultarLineaBase() {
        $this->enviarRespuesta(getAdminLineaBase()->getLineaBase(Sesion::obtenerIDUsuarioActual())["inicial"]);
    }
}

Util::iniciarAPI(LineaBaseAPI::class);
