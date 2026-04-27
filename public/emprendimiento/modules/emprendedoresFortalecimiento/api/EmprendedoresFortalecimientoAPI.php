<?php

include_once '../../../../../loader.php';

class EmprendedoresFortalecimientoAPI extends API
{
    public function recuperarEmprendedoresFortalecimiento()
    {
        $this->enviarRespuesta([
            'emprendedores' => getAdminEmprendedor()->listarEnFortalecimiento()
        ]);
    }

    public function eliminarEmprendedorFortalecimiento()
    {
        $idFortalecimiento = $this->getData("id");
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarEmprendedorFortalecimiento($idFortalecimiento));
    }
}

Util::iniciarAPI(EmprendedoresFortalecimientoAPI::class);
