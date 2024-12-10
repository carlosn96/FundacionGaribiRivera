<?php

include_once '../../../../../loader.php';

class NuevoVisitaSeguimientoAPI extends API {

    function recuperarCamposInformacion() {
        $admin = getAdminVisitaSeguimiento();
        $this->enviarRespuesta([
            "lineaBase" => getAdminLineaBase()->consultarLineaBaseInicial($this->data["emprendedor"]),
            "selector" => [
                "resultadoVisitaSeguimiento" => $admin->recuperarListaResultadoVisitaSeguimiento(),
                "actividadComplementaria" => $admin->recuperarListaActividadComplementaria(),
            ],
            "checkbox" => [
                "problemasActuales" => $admin->recuperarListaProblemasActuales()
                ]
        ]);
    }

}

Util::iniciarAPI(NuevoVisitaSeguimientoAPI::class);
