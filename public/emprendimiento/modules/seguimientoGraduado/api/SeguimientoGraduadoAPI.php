<?php

include_once '../../../../../loader.php';

class SeguimientoGraduadoAPI extends API
{
    public function recuperarCamposInformacion()
    {
        $adminLineaBase = getAdminLineaBase();
        $emprendedor = getAdminEmprendedor()->get($id = Sesion::getInfoTemporal("emprendedor"));
        $lineaBase = $adminLineaBase->getLineaBase(Sesion::getInfoTemporal("usuarioEmprendedor"));
        $this->enviarRespuesta([
            "emprendedor" => $emprendedor,
            "seguimientoGraduado" => $this->getSeguimiento($id),
            "lineaBase" => $lineaBase["inicial"],
            "checkbox" => [
                "estrategiasIncrementarVentas" => $adminLineaBase->recuperarListaEstrategiasIncrementarVentas()
            ],
            "radio" => [
                "comoEmpleaGanancias" => $adminLineaBase->recuperarListaEmpleaGanancias()
            ]
        ]);
    }

    public function guardar()
    {
        $this->enviarResultadoOperacion(
            getAdminImpacto()->guardarSeguimientoGraduado($this->data)
        );
    }

    public function eliminarSeguimiento() 
    {
        $this->enviarResultadoOperacion(
            getAdminImpacto()->eliminarSeguimientoGraduado($this->getData("emprendedor"))
        );
    }

    private function getSeguimiento($id)
    {
        $adminImpacto = getAdminImpacto();
        return [
            "existeSeguimientoGraduado" => $adminImpacto->existeSeguimientoGraduado($id),
            "data" => $adminImpacto->recuperarSeguimientoGraduado($id)
        ];
    }

}

SeguimientoGraduadoAPI::start();