<?php

include_once '../../../../../loader.php';

class InicioAPI extends API {

    private function consultar_agenda($fecha = "") {
        $usuario = Sesion::info()["usuario"];
        $id_coordinador = $usuario ? $usuario->get_id_coordinador() : 0;
        $ciclos = ($adminCiclos = new AdminCicloEscolar)->recuperar_listado();
        $cicloActual = ($cicloActual = $adminCiclos->recuperar_ciclo_actual($id_coordinador)) ? $cicloActual : $ciclos[0];
        if ($id_coordinador) {
            $this->enviar_respuesta([
                "agenda" => (new AdminSupervision())->obtener_agenda_general($id_coordinador, $fecha, $cicloActual),
                "ciclos" => $ciclos,
                "ciclo_actual" => $cicloActual
            ]);
        } else {
            $this->enviar_respuesta_str("sin respuesta");
        }
    }
    
    function recuperar_agenda() {
        return $this->consultar_agenda();
    }
    
    function recuperar_agenda_ciclo_escolar() {
        $usuario = Sesion::info()["usuario"];
        $id_coordinador = $usuario ? $usuario->get_id_coordinador() : 0;
        (new AdminCicloEscolar())->actualizar_ciclo_actual($id_coordinador, $this->data["ciclo"]);       
        $this->enviar_respuesta(OPERACION_COMPLETA);
    }

    function recuperar_agenda_fecha() {
        return $this->consultar_agenda($this->data["fecha"]);
    }
}

Util::iniciar_api("InicioAPI");
