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
        $admin = getAdminUsuario();
        $imgData = $this->data["img"];
        $imgData = str_replace('data:image/png;base64,', '', $imgData);
        $imgData = file_get_contents(str_replace(' ', '+', $imgData));
        $usuario = $admin->buscarUsuarioPorID($this->getData("id"));
        $this->enviarResultadoOperacion($admin->actualizarFotoPerfil($usuario, $imgData));
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

    public function estandarizarNombreCompleto()
    {
        $usuario = getAdminUsuario()->buscarUsuarioPorID($this->getData("id"));
        $nombreActual = $usuario["nombre"];
        $apellidosActual = $usuario["apellidos"];
        $instruccion = "Corrige la ortografía del nombre ({$nombreActual}) y apellidos ({$apellidosActual})'. Aplicar mayúscula inicial y el resto en minúsculas, siguiendo la ortografía del español. Devuelve solo una cadena con ambos valores estandarizados y separados por '|', sin explicación adicional.";
        $resultado = trim(getAdminLLM()->generarTextoSimple($instruccion));
        [$nombre, $apellidos] = array_pad(array_map('trim', explode('|', $resultado)), 2, '');
        if (empty($nombre) || empty($apellidos)) {
            $this->enviarResultadoOperacion(false);
        } else {
            $this->enviarResultadoOperacion(
                getAdminUsuario()->actualizarInfoPersonal([
                    "nombre" => $nombre,
                    "apellidos" => $apellidos
                ], $this->getData("id"))
            );
        }
    }
}

ConfigurarPerfilAPI::start();
