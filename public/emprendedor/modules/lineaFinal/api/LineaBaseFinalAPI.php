<?php

include_once '../../../../../loader.php';

class LineaBaseFinalAPI extends API {

    function guardar() {
        $this->data["idUsuario"] = Sesion::obtenerIDUsuarioActual();
        $this->enviarResultadoOperacion(getAdminLineaBase()->guardarLineaBaseFinal($this->data));
    }

    function recuperarCamposInformacion() {
        $admin = getAdminLineaBase();
        $usuario = Sesion::obtenerIDUsuarioActual();
        $existeLineaBase = $admin->existeLineaBase($usuario);
        $this->enviarRespuesta([
            "existeLineaBase" => $existeLineaBase,
            "data" => $existeLineaBase ? $admin->consultarLineaBaseInicial($usuario) : [],
            "selector" => [
                "ocupacionActual" => $admin->recuperarListaOcupaciones(),
                "ingresoMensual" => $admin->recuperarListaRangosIngreso(),
                "giroNegocio" => $admin->recuperarListaGiroNegocio(),
                "actividadNegocio" => $admin->recuperarListaActividadNegocio(),
            ],
            "checkbox" => [
                "estrategiasIncrementarVentas" => $admin->recuperarListaEstrategiasIncrementarVentas(),
                "comoEmpleaGanancias" => $admin->recuperarListaEmpleaGanancias(),
                "objetivosAhorro" => $admin->recuperarObjetivosAhorro()
            ],
        ]);
    }

    function buscarCodigoPostal() {
        $this->enviarRespuesta(getAdminLineaBase()->buscarCodigoPostal($this->data["codigoPostal"]));
    }
}

Util::iniciarAPI(LineaBaseFinalAPI::class);
