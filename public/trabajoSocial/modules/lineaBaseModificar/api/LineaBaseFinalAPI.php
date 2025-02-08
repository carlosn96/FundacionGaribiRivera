<?php

include_once '../../../../../loader.php';

class LineaBaseFinalAPI extends API {

    function guardar() {
        $nombreInputFile = "fotografiasCaso";
        $this->data[$nombreInputFile] = Util::recuperarArchivosServidor($nombreInputFile);
        getAdminLineaBase()->guardarLineaBaseFinal($this->data);
        getAdminEmprendedor()->guardarSeguimientoCaso($this->data);
        Sesion::setInfoTemporal("tipoLineaBase", "final");
        //$this->enviarResultadoOperacion();
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
            ],
            "etapasDisponibles" => getAdminEtapaFormacion()->listarTiposEtapasFormacion()
        ]);
    }

    function buscarCodigoPostal() {
        $this->enviarRespuesta(getAdminLineaBase()->buscarCodigoPostal($this->data["codigoPostal"]));
    }
}

Util::iniciarAPI(LineaBaseFinalAPI::class);
