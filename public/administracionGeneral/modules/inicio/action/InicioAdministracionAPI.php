<?php

require_once '../../../../../loader.php';

class InicioAdministracionAPI extends API
{

    function recuperarUsuarios()
    {
        $asistentes = getAdminUsuario()->listarAsistentes($this->getUsuarioActual());
        $this->enviarRespuesta(
            [
                "msg" => count($asistentes) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA,
                "usuarios" => $asistentes,
                "permisosUsuario" => $this->renderizarRoles(getAdminUsuario()->getPermisosUsuarios())
            ]
        );
    }

    function crearUsuario()
    {
        $datos = $this->obtenerDatosUsuarioBase();
        $contrasena = trim($this->getData("contrasena"));
        $contrasena = $contrasena !== "" ? $contrasena : Contrasenia::generarContrasenaRand(4);
        $datos["contrasena"] = Util::encriptarContrasenia($contrasena);
        if (!isset($datos["fotografia"])) {
            $datos["fotografia"] = file_get_contents(Util::obtenerFotografiaRand());
        }
        $resultado = getAdminUsuario()->agregarAsistente(
            $datos["nombre"],
            $datos["apellidos"],
            $datos["numero_celular"],
            $datos["correo_electronico"],
            $datos["contrasena"],
            $datos["permisos"],
            $datos["fotografia"]
        );

        $this->enviarRespuesta([
            "msg" => $resultado ? OPERACION_COMPLETA : OPERACION_INCOMPLETA,
            "contrasena" => $contrasena
        ]);
    }

    function actualizarUsuario()
    {
        $admin = getAdminUsuario();
        $datos = $this->obtenerDatosUsuarioBase();
        $id = $this->getData("id");
        $persmisos = $datos["permisos"];
        $fotografia = isset($datos["fotografia"]) ? $datos["fotografia"] : null;
        unset($datos["permisos"]);
        unset($datos["fotografia"]);
        $resultado = $admin->actualizarPermisosUsuarioAsistente($persmisos, $id) &&
            $admin->actualizarInfoPersonal($datos, $id) && $fotografia ?
            $admin->actualizarFotoPerfil(["id" => $id], $fotografia) : true;
        $this->enviarRespuesta([
            "msg" => $resultado ? OPERACION_COMPLETA : OPERACION_INCOMPLETA
        ]);
    }

    public function cambiarContrasena()
    {

        $admin = getAdminUsuario();
        $id = $this->getData("id");
        $contrasena = $this->getData("contrasena");
        $correo = $admin->buscarUsuarioPorID($id)["correo_electronico"];
        $this->enviarRespuesta([
            "msg" => $admin->cambiarContrasena($correo, $contrasena) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA
        ]);
    }

    function eliminarUsuario()
    {
        $this->enviarRespuesta(getAdminUsuario()->eliminarUsuario($this->getData("id")) ?
            OPERACION_COMPLETA : OPERACION_INCOMPLETA);
    }

    private function obtenerDatosUsuarioBase(): array
    {
        $datos = [
            "nombre" => $this->getData("nombre"),
            "apellidos" => $this->getData("apellidos"),
            "numero_celular" => $this->getData("telefono"),
            "correo_electronico" => $this->getData("correo"),
            "permisos" => json_decode($this->getData("permisos")),
        ];

        $fotografia = Util::recuperarArchivosServidor("fotografia", false);
        if (count($fotografia) > 0) {
            $datos["fotografia"] = $fotografia[0];
        }

        return $datos;
    }


    private function renderizarRoles($roles)
    {
        $resultado = [];
        foreach ($roles as $rol) {
            if (intval($rol["id"]) !== TipoUsuario::EMPRENDEDOR) {
                $resultado[] = $rol;
            }
        }
        return $resultado;
    }

}

InicioAdministracionAPI::start();
