<?php


require_once '../../../../../loader.php';


class HistoricoEmprendedoresAPI extends API
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

    public function realizarSeguimientoGraduado()
    {
        if ($existeSeguimiento = $this->existeSeguimiento($emprendedor = $this->getData('emprendedor'))) {
            $this->enviarRespuesta([
                'success' => false,
                'msg' => 'Seguimiento ya realizado para este emprendedor.'
            ]);
        } else {
            Sesion::setInfoTemporal('emprendedor', $emprendedor);
            Sesion::setInfoTemporal('usuarioEmprendedor', $this->getData('usuario'));
            $this->enviarRespuesta([
                'success' => !$existeSeguimiento
            ]);
        }
    }

    public function getSeguimientoGraduado()
    {
        $emprendedor = $this->getData('emprendedor');
        if ($existeSeguimiento = $this->existeSeguimiento($emprendedor)) {
            Sesion::setInfoTemporal('seguimiento', getAdminImpacto()->recuperarSeguimientoGraduado($emprendedor));
        }
        $this->enviarRespuesta(['success' => $existeSeguimiento]);
    }


    private function existeSeguimiento($emprendedor)
    {
        return getAdminImpacto()->existeSeguimientoGraduado($emprendedor);
    }

}

HistoricoEmprendedoresAPI::start();