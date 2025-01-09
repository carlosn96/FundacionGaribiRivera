<?php

include_once '../../../../../loader.php';

class InformeAPI extends API {

    function recuperar_supervisiones() {
        $plantel = $this->data["plantel"];
        $carrera = $this->data["carrera"];
        $ciclo = $this->data["ciclo"];
        $this->enviar_respuesta((new AdminSupervision)->recuperar_supervisiones($plantel, $carrera, $ciclo));
    }
}

Util::iniciar_api("InformeAPI");
