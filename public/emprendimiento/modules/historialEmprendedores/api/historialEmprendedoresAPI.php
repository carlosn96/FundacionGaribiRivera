<?php


require_once '../../../../../../loader.php';
use dao\EmprendedorDAO;

class HistorialEmprendedoresAPI extends API
{
    public function getHistorialEmprendedores()
    {
        $idUsuario = $this->getUsuarioActual();
        $admin = getAdminEmprendedor();;
        $historial = $admin->getHistorialEmprendedores($idUsuario);
        $this->enviarRespuesta(['historial' => $historial]);
    }
}

Util::iniciarAPI(HistorialEmprendedoresAPI::class);