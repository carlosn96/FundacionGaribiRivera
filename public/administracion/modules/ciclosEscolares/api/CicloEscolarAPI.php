<?php

include_once '../../../../../loader.php';

class PlantelAPI extends API {

    private function get_admin(): AdminCicloEscolar {
        return new AdminCicloEscolar();
    }

    function agregar() {
        $ciclo = $this->data["anio"]."-". $this->data["ciclo"];
        $this->enviar_resultado_operacion($this->get_admin()->agregar($ciclo));
    }

    function listar() {
        $this->enviar_respuesta($this->get_admin()->recuperar_listado());
    }

    function editar() {
        $nombre = $this->get_data("nombre");
        $id = $this->get_data("id");
        $ciclo = new CicloEscolar($nombre, $id);
        $this->enviar_resultado_operacion($this->get_admin()->editar($ciclo));
    }

    function eliminar() {
        $this->enviar_resultado_operacion($this->get_admin()->eliminar($this->data["id"]));
    }

}

Util::iniciar_api("PlantelAPI");
