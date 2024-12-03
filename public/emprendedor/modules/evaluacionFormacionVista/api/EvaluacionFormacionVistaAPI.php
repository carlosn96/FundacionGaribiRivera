<?php

include_once '../../../../../loader.php';

class EvaluacionFormacionVistaAPI extends API {

    function recuperarEvaluacion() {
        $this->enviarRespuesta(getAdminEvaluacionFormacion()->recuperarEvaluacion(Sesion::obtenerIDUsuarioActual()));
    }
}

Util::iniciarAPI(EvaluacionFormacionVistaAPI::class);
