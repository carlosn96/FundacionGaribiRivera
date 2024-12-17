<?php

include_once '../../../../../loader.php';

class MedicionImpactosAPI extends API {

    function consultarMedicionImpactos() {

        $this->enviarRespuesta(getAdminImpacto()->getMedicionImpacto($this->getUsuarioActual()));
    }

    function actualizarConfiguracionAnios() {
        $inicio = $this->getData("anioInicio");
        $fin = $this->getData("anioFin");
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionAnios(
                        $inicio,
                        $fin,
                        $this->getUsuarioActual()));
    }
}

Util::iniciarAPI(MedicionImpactosAPI::class);
