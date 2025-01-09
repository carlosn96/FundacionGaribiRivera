<?php

include_once '../../../../../loader.php';

class GrupoAPI extends API {

    public function crear_grupo() {
        $this->enviar_resultado_operacion((new AdminGrupo)->crear_grupo($this->data));
    }
    
    public function recuperar_grupos() {
        $carrera = $this->data["carrera"];
        $plantel = $this->data["plantel"];
        $this->enviar_respuesta((new AdminGrupo)->listar_grupos($carrera, $plantel));
    }
    
    public function eliminar() {
        $this->enviar_resultado_operacion((new AdminGrupo())->eliminar($this->data["id"]));
    }
}

Util::iniciar_api("GrupoAPI");
