<?php

include_once '../../../../../loader.php';

class InstructorAPI extends API
{

    function recuperarInstructores()
    {
        $instructores = array_filter(getAdminTaller()->listarInstructores(), function ($instructor) {
            return $instructor['id'] != 0;
        });
        $this->enviarRespuesta(array_values($instructores));
    }

    function guardarInstructor()
    {
        $nombreInputFile = "fotografiaInstructor";
        $foto = Util::recuperarArchivosServidor($nombreInputFile, false)[0] ?? null;

        $idInstructorInput = $this->data['idInstructor'] ?? 0;

        if ($idInstructorInput > 0) {
            $this->data[$nombreInputFile] = $foto !== null ? $foto : '';
            $this->enviarResultadoOperacion(getAdminTaller()->actualizarInstructor($this->data));
        } else {
            $this->data[$nombreInputFile] = $foto !== null ? $foto : file_get_contents(Util::obtenerFotografiaRand());
            $this->enviarResultadoOperacion(getAdminTaller()->guardarInstructor($this->data));
        }
    }

    function eliminarInstructor()
    {
        $this->enviarResultadoOperacion(getAdminTaller()->eliminarInstructor($this->data['idInstructor']));
    }
}

InstructorAPI::start();
