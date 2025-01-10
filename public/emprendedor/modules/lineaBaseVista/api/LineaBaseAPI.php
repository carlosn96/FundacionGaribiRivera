<?php

include_once '../../../../../loader.php';

class LineaBaseAPI extends API {

    function consultarLineaBase() {
        if (empty($tipo = Sesion::getInfoTemporal("tipo"))) {
            $this->enviarRespuesta($tipo);
        } else {
            $this->enviarRespuesta([
                "emprendedor" => Sesion::obtenerUsuarioActual(),
                "tipo" => $tipo,
                "lineaBase" => Sesion::getInfoTemporal("lineaBase")[$tipo],
            ]);
        }
    }
}

Util::iniciarAPI(LineaBaseAPI::class);
