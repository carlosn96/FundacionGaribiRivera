<?php

include_once '../../../../../loader.php';

class TallerAPI extends API
{

    function recuperarTalleres()
    {
        $admin = getAdminTaller();
        $this->enviarRespuesta([
            "talleres" => $admin->listarDetallesTalleres(),
            "tiposTaller" => $admin->obtenerTipoTalleres(),
            "instructores" => $this->reducirListadoInstructores($admin->listarInstructores())
        ]);
    }

    function crearTaller()
    {
        $nombre = $this->data['nombreCrearTaller'];
        $tipoTaller = $this->data['tipoTallerCrear'];
        $numeroTaller = $this->data['numeroTallerCrear'] ?? 0;

        if ($numeroTaller >= 1 && $numeroTaller <= 10) {
            $tipoTaller = 1; // Básico
        } else if ($numeroTaller >= 11 && $numeroTaller <= 15) {
            $tipoTaller = 3; // Fortalecimiento
        }

        $observaciones = $this->data['observacionesTallerCrear'];
        $instructor = $this->data['instructorTallerCrear'];
        $evaluacionHabilitada = 0;
        $taller = new Taller($nombre, $tipoTaller, $evaluacionHabilitada, $observaciones, $instructor, $numeroTaller);
        $this->enviarResultadoOperacion(getAdminTaller()->agregarTaller($taller));
    }

    function recuperarInstructor()
    {
        $this->enviarRespuesta(getAdminTaller()->recuperarInstructor($this->data["id"]));
    }

    function actualizarTaller()
    {
        $this->enviarResultadoOperacion(getAdminTaller()->actualizarTaller($this->data));
    }

    function eliminarTaller()
    {
        $this->enviarResultadoOperacion(getAdminTaller()->eliminarTaller($this->getData("id")));
    }

    private function reducirListadoInstructores($instructores)
    {
        return array_map(function ($instructor) {
            return [$instructor["id"], $instructor['nombreCompleto']];
        }, $instructores);
    }


}

Util::iniciarAPI(TallerAPI::class);
