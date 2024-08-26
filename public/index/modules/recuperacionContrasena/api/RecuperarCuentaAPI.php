<?php

include_once '../../../../../loader.php';

class RecuperarCuentaAPI extends API {

    function validarCodigoSeguridad() {
        $codigo = $this->data['codigo'];
        // Verificar si se ha guardado un correo electrónico en la sesión
        if (isset($_SESSION['correoElectronico']) && Sesion::esCodigoRestablecerContraseniaCorrecto($codigo)) {
            $respuesta = Util::enum('Código válido.', NO_ES_VALOR_ERROR);
        } else {
            $respuesta = Util::enum('Código inválido.', ES_VALOR_ERROR);
        }
        $this->enviarRespuesta($respuesta);
    }

    function recuperarCuenta() {
        $correoDestino = $this->data['correo_electronico'];
        $adminUsuario = new AdminUsuario;
        if ($adminUsuario->existeCorreo($correoDestino)) {
            $_SESSION['correoElectronico'] = $correoDestino;
            if (AdminMailer::enviarCorreoRestablecerCuenta($correoDestino, Sesion::setCodigoRestablecerContrasenia())) {
                $respuesta = Util::enum('Se ha enviado un código de recuperación al correo ingresado.', NO_ES_VALOR_ERROR);
            } else {
                $respuesta = Util::enum('Error al enviar el correo de recuperación. Intenta de nuevo más tarde.', ES_VALOR_ERROR);
            }
        } else {
            $respuesta = Util::enum('El correo no se encuentra registrado', true);
        }
        $this->enviarRespuesta($respuesta);
    }

    function restablecerContrasenia() {
        if (isset($_SESSION['correoElectronico']) && isset($this->data['contrasena']) && isset($this->data['confirmar_contrasena'])) {
            $correoElectronico = $_SESSION['correoElectronico'];
            $nuevaContrasena = $this->data['contrasena'];
            // actualizar la contraseña
            if ((new AdminUsuario())->cambiarContrasena($correoElectronico, $nuevaContrasena)) {
                $respuesta = Util::enum('Contraseña cambiada correctamente', NO_ES_VALOR_ERROR);
            } else {
                $respuesta = Util::enum('Error al cambiar la contraseña', ES_VALOR_ERROR);
            }
        } else {
            // Datos incompletos, responder con error
            http_response_code(400);
            $respuesta = Util::enum('Datos incompletos', ES_VALOR_ERROR);
        }
        $this->enviarRespuesta($respuesta);
    }

}

Util::iniciarApi("RecuperarCuentaAPI");
