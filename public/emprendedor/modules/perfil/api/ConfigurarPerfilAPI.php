<?php

include_once '../../../../../loader.php';

class ConfigurarPerfilAPI extends API {

    function recuperarInfoUsuario() {
        $this->enviarRespuesta($this->getUsuario());
    }

    function actualizarImagen() {
        $imgData = $this->data["img"];
        $imgData = str_replace('data:image/png;base64,', '', $imgData);
        $imgData = file_get_contents(str_replace(' ', '+', $imgData));
        $usuario = $this->getUsuario();
        if (($resultado = (new AdminUsuario)->actualizarFotoPerfil($usuario, $imgData))) {
            $usuario['fotografia'] = Util::binToBase64($imgData);
            Sesion::setUsuarioActual($usuario);
        }
        $this->enviarResultadoOperacion($resultado);
    }

    function actualizarContrasenia() {
        $usuario = $this->getUsuario();
        $this->enviarResultadoOperacion(
                (new AdminUsuario())->cambiarContrasena($usuario["correo_electronico"],
                        $this->data["newPassword"]
                )
        );
    }

    /* function configurar_perfil() {
      $correo = $this->data["correo"] ?? null;
      $contrasenia = $this->data["newPassword"] ?? null;
      $usuario = $this->getUsuarioActual();
      if (isset($correo)) {
      $correoCompleto = $correo . "@" . $this->data["dominio"];
      $respuesta = (new AdminUsuario())->actualizar_correo($usuario, $correoCompleto);
      if ($respuesta) {
      $usuario->set_correo_electronico($correoCompleto);
      Sesion::establecer_usuario_actual($usuario);
      }
      } elseif (isset($contrasenia)) {
      $respuesta = (new AdminUsuario())->actualizar_contrasenia($usuario, Util::encriptar_contrasenia($contrasenia));
      } else {
      $respuesta = [];
      }
      $this->enviar_resultado_operacion($respuesta);
      } */

    function actualizarCampo() {
        $usuario = $this->getUsuario();
        if (($esResCorrecto = (new AdminUsuario)->actualizarInfoPersonal($this->data, $usuario["id"]))) {
            foreach ($this->data as $key => $value) {
                $usuario[$key] = $value;
            }
            Sesion::setUsuarioActual($usuario);
        }
        return $this->enviarResultadoOperacion($esResCorrecto);
    }

    private function getUsuario() {
        return Sesion::obtenerUsuarioActual();
    }

}

Util::iniciarAPI(ConfigurarPerfilAPI::class);
