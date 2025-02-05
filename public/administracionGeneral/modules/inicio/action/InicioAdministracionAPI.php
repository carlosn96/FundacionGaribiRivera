<?php

require_once '../../../../../loader.php';

class InicioAdministracionAPI extends API {

    function mostrarResultados($rs) {
        $this->enviarRespuesta($rs);
    }

    function recuperarUsuarios() {
        $this->enviarRespuesta(getAdminUsuario()->listarAsistentes($this->getUsuarioActual()));
    }

    function eliminar() {
        mostrarResultados($admin->eliminarAsistente($_POST["idUsuario"], $_POST["idAcceso"]));
    }
}

InicioAdministracionAPI::start();
