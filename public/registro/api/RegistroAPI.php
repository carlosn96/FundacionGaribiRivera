<?php


include_once '../../../loader.php';

class RegistroAPI extends API {
    function registro_temporal() {
        $this->enviar_respuesta(Util::enum("Mensaje", false));
    }
    
    function verificar_matricula_existe() {
        $matricula = $this->get_data("matricula");
        $existe_matricula = false;
        $mensaje = $existe_matricula ? "La matricula $matricula ya cuenta con un registro en el sistema" : "Matricula disponible";
        $this->enviar_respuesta(Util::enum($mensaje, $existe_matricula));
    }
}

Util::iniciar_api(RegistroAPI::class);