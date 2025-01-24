<?php

include_once '../../../../../loader.php';

class InstructorAPI extends API {

    function recuperarInstructores() {
        $instructores = array_filter(getAdminTaller()->listarInstructores(), function ($instructor) {
            return $instructor['id'] != 0;
        });
        $this->enviarRespuesta(array_values($instructores));
    }

    function guardarInstructor() {
        $nombreInputFile = "fotografiaInstructor";
        $this->data[$nombreInputFile] = Util::recuperarArchivosServidor($nombreInputFile, false)[0] ??
                file_get_contents(Util::obtenerFotografiaRand());
        var_dump($this->data);
        $this->enviarResultadoOperacion(getAdminTaller()->guardarInstructor($this->data));
    }
}

InstructorAPI::start();
