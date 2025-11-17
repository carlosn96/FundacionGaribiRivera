<?php

include_once '../../../../../loader.php';

class IndexAPI extends API {

    private $adminUsuario;

    function __construct($case, $data) {
        $this->adminUsuario = new AdminUsuario();
        parent::__construct($case, $data);
    }

    public function iniciarSesion() {
        $correo = $this->data["correo"];
        $contrasena = $this->data["contrasena"];
        if ($this->adminUsuario->existeCorreo($correo)) {
            if (($usuario = $this->adminUsuario->buscarUsuarioPorCorreo($correo)) && Util::verificarContrasenia($contrasena, $usuario["contrasena"])) {
                Sesion::iniciarSesionNueva($usuario, boolval($this->data["recordar"]));
                $this->enviarRespuesta(NO_ERROR);
            } else {
                $this->enviarRespuesta(ERROR_ACCESO_PASSWORD);
            }
        } else {
            $this->enviarRespuesta(ERROR_ACCESO_USUARIO);
        }
    }

}

Util::iniciarAPI("IndexAPI");
