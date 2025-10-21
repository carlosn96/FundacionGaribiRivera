<?php

require_once '../../../../../loader.php';

class InicioAdministracionAPI extends API
{

    function mostrarResultados($rs)
    {
        $this->enviarRespuesta($rs);
    }

    function recuperarUsuarios()
    {
        $asistentes = getAdminUsuario()->listarAsistentes($this->getUsuarioActual());
        $this->enviarRespuesta(
            [
                "msg" => count($asistentes) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA,
                "usuarios" => $asistentes,
                "rolesUsuario" => $this->renderizarRoles(TipoUsuario::getAllUserRoles())
            ]
        );
    }

    function eliminar()
    {
        
    }

    function renderizarRoles($roles)
    {
        unset($roles[TipoUsuario::EMPRENDEDOR]);
        return $roles;
    }

}

InicioAdministracionAPI::start();
