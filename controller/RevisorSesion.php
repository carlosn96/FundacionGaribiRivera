<?php

include_once '../loader.php';

class RevisorSesion extends API {

    public function cerrarSesion() {
        Sesion::cerrar();
        $this->enviarRespuesta(["sesionActiva" => Sesion::esActiva()]);
    }

    public function verificarSesion() {
        $usuario = Sesion::obtenerUsuarioActual();
        $projectFolder = '/' . explode('/', trim($_SERVER["PHP_SELF"], '/'))[0];
        $origin = $_SERVER['HTTP_ORIGIN'];
        $root = $origin === "http://localhost"  ? $origin . $projectFolder : $origin;
        $this->enviarRespuesta([
            "sesionActiva" => Sesion::esActiva(),
            "usuario" => $usuario,
            "root" => $root
        ]);
    }

}

Util::iniciarAPI(RevisorSesion::class);
