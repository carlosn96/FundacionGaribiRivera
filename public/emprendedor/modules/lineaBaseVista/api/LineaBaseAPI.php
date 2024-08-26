<?php

include_once '../../../../../loader.php';

class LineaBaseAPI extends API {

    function consultarLineaBase() {
        $admin = getAdminLineaBase();
        $usuario = Sesion::obtenerIDUsuarioActual();
        $existeLineaBase = $admin->existeLineaBase($usuario);
        $this->enviarRespuesta([
            "existeLineaBase" => $existeLineaBase,
            "data" => $existeLineaBase ? $admin->consultarLineaBase($usuario) : []
        ]);
    }
}

Util::iniciarAPI(LineaBaseAPI::class);
