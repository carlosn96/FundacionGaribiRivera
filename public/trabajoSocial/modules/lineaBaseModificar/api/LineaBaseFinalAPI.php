<?php

include_once '../../../../../loader.php';

class LineaBaseFinalAPI extends API {

    function guardar() {
        Sesion::setInfoTemporal("tipoLineaBase", "final");
        $this->data["idUsuario"] = $this->data["idEmprendedor"];
        $this->enviarResultadoOperacion(getAdminLineaBase()->guardarLineaBaseFinal($this->data));
    }

    function recuperarCamposInformacion() {
        $admin = getAdminLineaBase();
        $lineaBase = $admin->getLineaBase($id = Sesion::getInfoTemporal("idUsuario"));
        $this->enviarRespuesta([
            "emprendedor" => getAdminUsuario()->buscarUsuarioPorID($id),
            "lineaBase" => $lineaBase,
            "selector" => [
                "ocupacionActual" => $admin->recuperarListaOcupaciones(),
                "ingresoMensual" => $admin->recuperarListaRangosIngreso(),
                "giroNegocio" => $admin->recuperarListaGiroNegocio(),
                "actividadNegocio" => $admin->recuperarListaActividadNegocio(),
            ],
            "checkbox" => [
                "estrategiasIncrementarVentas" => $admin->recuperarListaEstrategiasIncrementarVentas()
            ],
            "radio" => [
                "comoEmpleaGanancias" => $admin->recuperarListaEmpleaGanancias(),
                "objetivosAhorro" => $admin->recuperarObjetivosAhorro()
            ]
        ]);
    }

    function buscarCodigoPostal() {
        $this->enviarRespuesta(getAdminLineaBase()->buscarCodigoPostal($this->data["codigoPostal"]));
    }
}

Util::iniciarAPI(LineaBaseFinalAPI::class);
