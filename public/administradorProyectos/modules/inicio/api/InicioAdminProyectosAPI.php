<?php

include_once '../../../../../loader.php';

class InicioAdminProyectosAPI extends API {

    function recuperarEmprendedores() {
        $this->enviarRespuesta(getAdminEmprendedor()->listar());
    }

    function eliminarEmprendedor() {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarEmprendedor($this->getData("id")));
    }
}

Util::iniciarAPI(InicioAdminProyectosAPI::class);
