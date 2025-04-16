<?php

include_once '../../../../../loader.php';

class ESAPI extends API {

    function consultarEstudioSocioeconomico() {
        //Util::error_log(Sesion::getInfoTemporal("estudioSocioeconomico"));
        //$es = $this->extraerInfo();
        //Util::error_log($es["estudioSocioeconomico"]["conclusiones"]["fotografias"]);
        $this->enviarRespuesta($this->extraerInfo());
    }
    
    function extraerInfo(array $campos = ["estudioSocioeconomico", "emprendedor"]) {
        $info = [];
        foreach ($campos as $key) {
            $info[$key] = Sesion::getInfoTemporal($key);
        }
        return $info;
    }
}

ESAPI::start();
