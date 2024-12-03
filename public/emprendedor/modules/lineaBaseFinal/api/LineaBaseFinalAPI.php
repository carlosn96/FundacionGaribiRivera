<?php

include_once '../../../../../loader.php';

class LineaBaseAPI extends API {

    function guardar() {
        $this->data["idUsuario"] = Sesion::obtenerIDUsuarioActual();
        $this->enviarResultadoOperacion(getAdminLineaBase()->guardarLineaBase($this->data));
    }

    function recuperarCamposInformacion() {
        $admin = getAdminLineaBase();
        $existeLineaBase = $admin->existeLineaBase(Sesion::obtenerIDUsuarioActual());
        $etapaFormacion = ["nombre"=>"ETAPA"];
        $this->enviarRespuesta(
                [
                    "etapaFormacion"=>$etapaFormacion,
                    "radio" => [
                        "ocupacionActual" => $admin->recuperarListaOcupaciones(),
                        "ingresoMensual" => $admin->recuperarListaRangosIngreso(),
                    ],
                    
                    "checkbox" => [
                        "medioConocimiento" => $admin->recuperarListaMedioConocimientoFund(),
                        "estrategiasIncrementarVentas" => $admin->recuperarListaEstrategiasIncrementarVentas(),
                        "comoEmpleaGanancias" => $admin->recuperarListaEmpleaGanancias(),
                    ],
                    "selector" => [
                        "estadoCivil" => $admin->recuperarListaEstadoCivil(),
                        "escolaridad" => $admin->recuperarListaEscolaridad(),
                        "giroNegocio" => $admin->recuperarListaGiroNegocio(),
                        "actividadNegocio" => $admin->recuperarListaActividadNegocio(),
                    ]
        ]);
    }

    function getCantidadDependientesEconomicos() {
        $opciones = [
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
