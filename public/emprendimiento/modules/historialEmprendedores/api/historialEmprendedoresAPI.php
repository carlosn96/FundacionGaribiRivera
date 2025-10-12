<?php


require_once '../../../../../loader.php';


class HistorialEmprendedoresAPI extends API
{
    public function getHistorialEmprendedores()
    {
        $this->enviarRespuesta(['historial' => getAdminEmprendedor()->listar()]);
    }

    public function actualizarGraduacion()
    {
        $result = getAdminEmprendedor()->actualizarFechaGraduacion($this->getData("graduado"), $this->getData("fechaGraduacion"), $this->getData("id"));
        $msg = $result ? "Actualización exitosa" : "Error al actualizar";
        $this->enviarRespuesta(["success" => $result, "msg" => $msg]);
    }
}

HistorialEmprendedoresAPI::start();