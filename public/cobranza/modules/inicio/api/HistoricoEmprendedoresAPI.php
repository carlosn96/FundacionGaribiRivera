<?php


require_once '../../../../../loader.php';


class HistoricoEmprendedoresAPI extends API
{
    public function getHistorialEmprendedores()
    {
        $this->enviarRespuesta(['historial' => getAdminEmprendedor()->listar()]);
    }

    public function actualizarReferencia()
    {
        $result = getAdminEmprendedor()->actualizarReferencia($this->getData("referencia"), $this->getData("fechaOtorgamiento"), $this->getData("id"));
        $msg = $result ? "Actualización exitosa" : "Error al actualizar";
        $this->enviarRespuesta(["success" => $result, "msg" => $msg]);
    }

    public function realizarSeguimientoGraduado()
    {
        Sesion::setInfoTemporal('existeSeguimiento', $this->existeSeguimiento($emprendedor = $this->getData('emprendedor')));
        Sesion::setInfoTemporal('emprendedor', $emprendedor);
        Sesion::setInfoTemporal('usuarioEmprendedor', $this->getData('usuario'));

        $this->enviarRespuesta([
            'success' => true
        ]);

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