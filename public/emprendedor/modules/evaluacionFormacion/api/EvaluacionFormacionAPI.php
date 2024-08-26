<?php

include_once '../../../../../loader.php';

class EvaluacionFormacionAPI extends API {

    function guardarEvaluacion() {
        $this->data["id_usuario"] = Sesion::obtenerIDUsuarioActual();
        $this->enviarResultadoOperacion(getAdminEvaluacionFormacion()->guardarEvaluacion($this->data));
    }

    function recuperarEvaluacion() {
        $admin = getAdminEvaluacionFormacion();
        $idUsuario = Sesion::obtenerIDUsuarioActual();
        $this->enviarRespuesta([
            "existeLineaBase" => getAdminLineaBase()->existeLineaBase($idUsuario),
            "evaluacion" => $admin->recuperarEvaluacion($idUsuario),
            "camposFormulario" => [
                "objetivosAhorro" => $admin->recuperarObjetivosAhorro()
            ]
        ]);
    }
}

Util::iniciarAPI(EvaluacionFormacionAPI::class);
