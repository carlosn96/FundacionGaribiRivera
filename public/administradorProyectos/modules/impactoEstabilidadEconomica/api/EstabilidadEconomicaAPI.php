<?php

include_once '../../../../../loader.php';

class EstabilidadEconomicaAPI extends API {

    function recuperarSecciones() {
        $this->enviarRespuesta([
            "secciones" => getAdminImpacto()->getImpactos()
        ]);
    }
}

Util::iniciarAPI(EstabilidadEconomicaAPI::class);
