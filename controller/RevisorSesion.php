<?php

include_once '../loader.php';

class RevisorSesion extends API {

    public function cerrarSesion() {
        Sesion::cerrar();
        $this->enviarRespuesta(["sesionActiva" => Sesion::esActiva()]);
    }

    public function verificarSesion() {
        $info = Sesion::info();
        $projectFolder = '/' . explode('/', trim($_SERVER["PHP_SELF"], '/'))[0];
        $origin = $_SERVER['HTTP_ORIGIN'];
        $root = $origin === "http://localhost"  ? $origin . $projectFolder : $origin;
        $this->enviarRespuesta([
            "sesionActiva" => Sesion::esActiva(),
            "url" => $info["usuario"]["tipo_usuario"]["url"] ?? null,
            "usuario" => $info["usuario"],
            "root" => $root/*,
            "server" => $_SERVER*/
        ]);
    }

}

Util::iniciarAPI("RevisorSesion");
