<?php

include_once '../../../../../loader.php';

class EstabilidadEconomicaAPI extends API {

    function recuperarSecciones() {
        $this->enviarRespuesta(getAdminImpacto()->getMedicionImpacto());
    }
}

Util::iniciarAPI(EstabilidadEconomicaAPI::class);
