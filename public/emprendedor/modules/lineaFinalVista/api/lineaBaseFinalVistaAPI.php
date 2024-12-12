<?php

include_once '../../../../../loader.php';

class lineaBaseFinalVistaAPI extends API {
    function recuperarCamposInformacion() {
        $this->enviarRespuesta(
                getAdminLineaBase()->getLineaBase(Sesion::obtenerIDUsuarioActual())["final"],
        );
    }
}

Util::iniciarAPI(lineaBaseFinalVistaAPI::class);
