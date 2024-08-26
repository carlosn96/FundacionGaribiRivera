<?php

include_once '../../../../../loader.php';

class InicioAdminProyectosAPI extends API {

    function recuperarEmprendedores() {
         $this->enviarRespuesta(getAdminEmprendedor()->listar());
    }

}

Util::iniciarAPI(InicioAdminProyectosAPI::class);
