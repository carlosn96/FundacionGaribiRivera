<?php

include_once '../../../../../loader.php';

class ConfigurarPerfilAPI extends API
{

    function getEmprendedor()
    {
        try {
            $emprendedor = getAdminUsuario()->buscarUsuarioPorID($this->getData("id"));
            $this->enviarRespuesta([
                "data" => $emprendedor
            ]);
        } catch (Exception $e) {
            $this->enviarRespuestaStr($e->getMessage());
        }

    }

    function actualizarImagen()
    {
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

    function actualizarContrasenia()
    {
        $admin = getAdminUsuario();
        $usuario = $admin->buscarUsuarioPorID($this->getData("idEmprendedor"));
        $this->enviarResultadoOperacion(
            $admin->cambiarContrasena(
                $usuario["correo_electronico"],
                $this->data["newPassword"]
            )
        );
    }

    function actualizarCampo()
    {
        $id = $this->getData("id");
        $data = [
            $this->getData("input") => $this->getData("text")
        ];
        return $this->enviarResultadoOperacion(getAdminUsuario()->actualizarInfoPersonal($data, $id));
    }

    public function estandarizarTexto()
    {
        $texto = $this->getData("texto");
        $instruccion = "Reescribe el nombre propio '{$texto}' usando la ortografía estándar del español (mayúscula inicial y resto en minúsculas). Si el nombre ya está correctamente escrito, devuélvelo tal cual. No incluyas explicaciones, ejemplos ni texto adicional: solo el nombre corregido.";
        $this->enviarRespuesta(["nombre" => trim(getAdminLLM()->generarTextoSimple($instruccion))]);
    }

}

ConfigurarPerfilAPI::start();
