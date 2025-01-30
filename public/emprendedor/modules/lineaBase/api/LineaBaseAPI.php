<?php

include_once '../../../../../loader.php';

class LineaBaseAPI extends API {

    function guardar() {
        $this->data["idUsuario"] = Sesion::obtenerIDUsuarioActual();
        $this->enviarResultadoOperacion(getAdminLineaBase()->guardarLineaBase($this->data));
    }

    function recuperarCamposInformacion() {
        $admin = getAdminLineaBase();
        $lineaBase = $admin->getLineaBase(Sesion::obtenerIDUsuarioActual());
        $existeLineaBase = $lineaBase[$tipo = "inicial"]["existeLineaBase"];
        Sesion::setInfoTemporal("lineaBase", $lineaBase);
        Sesion::setInfoTemporal("tipo", $tipo);
        $this->enviarRespuesta(
                !$existeLineaBase ?
                        [
                    "etapaFormacion" => getAdminEtapaFormacion()->obtenerEtapaActual(),
                    "checkbox" => [
                        "medioConocimiento" => $admin->recuperarListaMedioConocimientoFund(),
                        "estrategiasIncrementarVentas" => $admin->recuperarListaEstrategiasIncrementarVentas(),
                        
                    ],
                    "radio" => [
                        "comoEmpleaGanancias" => $admin->recuperarListaEmpleaGanancias(),
                        "tiempoCapacitacion" => $admin->recuperarListaTiempoCapacitacion(),
                        "razonRecurre" => $admin->recuperarListaRazonRecurreFund(),
                        "solicitaCredito" => $admin->recuperarListaSolicitaCredito(),
                        "utilizaCredito" => $admin->recuperarListaUtilizaCredito(),
                        "cantidadDependientesEconomicos" => $this->getCantidadDependientesEconomicos(),
                        "ocupacionActual" => $admin->recuperarListaOcupaciones(),
                        "ingresoMensual" => $admin->recuperarListaRangosIngreso(),
                        "objetivosAhorro" => $admin->recuperarObjetivosAhorro()
                    ],
                    "selector" => [
                        "estadoCivil" => $admin->recuperarListaEstadoCivil(),
                        "escolaridad" => $admin->recuperarListaEscolaridad(),
                        // "vicaria" => $admin->recuperarListaVicarias(),
                        "giroNegocio" => $admin->recuperarListaGiroNegocio(),
                        "actividadNegocio" => $admin->recuperarListaActividadNegocio(),
                    ]
                        ] :
                        ["existeLineaBase" => $existeLineaBase]);
    }

    function getCantidadDependientesEconomicos() {
        $opciones = [
            ["id_cantidad" => "0", "cantidad" => 0],
            ["id_cantidad" => "1", "cantidad" => 1],
            ["id_cantidad" => "2", "cantidad" => 2],
            ["id_cantidad" => "3", "cantidad" => 3],
            ["id_cantidad" => "4", "cantidad" => "4 o más"],
        ];
        return $opciones;
    }

    function recuperarListaDecanatos() {
        $this->enviarRespuesta(getAdminLineaBase()->recuperarListaDecanato($this->data["idVicaria"]));
    }

    function recuperarListaComunidadParroquial() {
        $this->enviarRespuesta(getAdminLineaBase()->recuperarListaComunidadParroquial($this->data["idDecanato"]));
    }

    function buscarCodigoPostal() {
        $this->enviarRespuesta(getAdminLineaBase()->buscarCodigoPostal($this->data["codigoPostal"]));
    }

    function buscarParroquia() {
        $this->enviarRespuesta(getAdminLineaBase()->buscarParroquia($this->data["parroquia"]));
    }
}

Util::iniciarAPI(LineaBaseAPI::class);
