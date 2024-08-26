<?php

include_once '../../../../loader.php';

class BuscarCodigoPostalAPI extends API {

    function buscarCodigoPostal() {
        $this->enviarRespuesta((new CodigoPostalDAO)->buscarCodigoPostal($this->data["codigoPostal"]));
    }

}

class CodigoPostalDAO extends DAO {

    const BUSCAR_CP = "CALL buscar_codigo_postal(?)";

    public function buscarCodigoPostal($cp) {
        $prep = $this->prepararInstruccion(self::BUSCAR_CP);
        $prep->agregarString($cp);
        return $prep->ejecutarConsultaMultiple();
    }

}

Util::iniciarAPI("BuscarCodigoPostalAPI");
