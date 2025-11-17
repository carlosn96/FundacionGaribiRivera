<?php

include_once '../loader.php';

class RevisorSesion extends API
{

    public function cerrarSesion()
    {
        Sesion::cerrar();
        $this->enviarRespuesta(["sesionActiva" => Sesion::esActiva()]);
    }

    public function verificarSesion()
    {
        if (!Sesion::esActiva()) {
            Sesion::intentarAutoLogin();
        }
        $usuario = Sesion::obtenerUsuarioActual();
        $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
        $scriptParts = explode('/', trim($_SERVER["SCRIPT_NAME"], '/'));
        $projectFolder = '/' . $scriptParts[0];
        if ($origin === "http://localhost") {
            $root = "http://localhost" . $projectFolder;
        }
        else if ($origin) {
            $root = $origin;
        }
        else {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
            $root = $protocol . "://" . $_SERVER["SERVER_NAME"];
        }
        $this->enviarRespuesta([
            "sesionActiva" => Sesion::esActiva(),
            "usuario" => $usuario,
            "root" => $root
        ]);
    }

}

Util::iniciarAPI(RevisorSesion::class);
