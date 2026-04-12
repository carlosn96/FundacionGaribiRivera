<?php

// Incluir el archivo de configuración y el DAO
require_once '../../../../../loader.php';

class CrearCuentaAPI extends API {

    function revisarExisteCorreo() {
        $correo = $this->data["correo"];
        $this->enviarRespuesta(["existeCorreo" => (new AdminUsuario)->existeCorreo($correo)]);
    }

    function registrarNuevaCuenta() {
        $respuesta = [];
        $dataPreregistro = $_SESSION["preregistro"];
        $codigoPreregistro = $dataPreregistro["codigo"];
        if (($respuesta["success"] = $this->data["codigo"] === $codigoPreregistro)) {
            $nombre = $dataPreregistro["nombre"];
            $apellidos = $dataPreregistro["apellidos"];
            $correo = $dataPreregistro["correo"];
            $numeroCelular = $dataPreregistro["numero_celular"];
            $contrasena = $dataPreregistro["contrasena"];
            $success = getAdminEmprendedor()->insertarEmprendedor(
                $nombre, $apellidos, $correo, $numeroCelular, $contrasena
            );
            $respuesta["mensaje"] = $success ? "Registro exitoso" : "Ha ocurrido un error, intenta más tarde";
            if ($success) {
                Sesion::iniciarSesionNueva(getAdminUsuario()->buscarUsuarioPorCorreo($correo), true);
            }
            $respuesta["success"] = $success;
        } else {
            $respuesta["mensaje"] = "El codigo ingresado no es correcto";
        }
        $this->enviarRespuesta($respuesta);
    }

    function preregistro() {
        $codigo = Util::getCodigoValidacionCuenta();
        $_SESSION["preregistro"] = $this->data;
        $_SESSION["preregistro"]["codigo"] = $codigo;
        $_SESSION["preregistro"]["nombreCompleto"] = $this->data["nombre"] . " " . $this->data["apellidos"];
        $this->enviarRespuesta(['success' => AdminMailer::enviarCorreoVerificacionCuenta($this->data["correo"], $codigo)]);
    }


    function reenviarCodigoCrearCuenta() {
        $codigo = $_SESSION["preregistro"]["codigo"];
        $correo = $_SESSION["preregistro"]["correo"];
        $this->enviarRespuesta(['success' => AdminMailer::enviarCorreoVerificacionCuenta($correo, $codigo)]);
    }
}

Util::iniciarAPI("CrearCuentaAPI");
