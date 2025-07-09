<?php

include_once '../../../../../loader.php';

class ESAPI extends API
{

    function consultarEstudioSocioeconomico()
    {
        //Util::error_log(Sesion::getInfoTemporal("estudioSocioeconomico"));
        //$es = $this->extraerInfo();
        //Util::error_log($es["estudioSocioeconomico"]["conclusiones"]["fotografias"]);
        $this->enviarRespuesta($this->extraerInfo());
    }

    function extraerInfo(array $campos = ["estudioSocioeconomico", "emprendedor"])
    {
        $info = [];
        foreach ($campos as $key) {
            $info[$key] = Sesion::getInfoTemporal($key);
        }
        return $info;
    }

    public function cambiarFotografia()
    {
        $idFotografia = $this->getData("idFoto");
        $fotografia = $this->getData("fotografia");
        $result = getAdminEstudioSocioeconomico()->cambiarFotografia($idFotografia, $fotografia);

        if ($result) {
            $info = $this->extraerInfo();
            // Buscar el objeto con el id correspondiente y actualizar la fotografía
            if (isset($info["estudioSocioeconomico"]["conclusiones"]["fotografias"]) && is_array($info["estudioSocioeconomico"]["conclusiones"]["fotografias"])) {
                foreach ($info["estudioSocioeconomico"]["conclusiones"]["fotografias"] as &$fotoObj) {
                    if (isset($fotoObj["id"]) && $fotoObj["id"] == $idFotografia) {
                        $fotoObj["fotografia"] = $fotografia;
                        break;
                    }
                }
                unset($fotoObj); // Buenas prácticas
                Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            }
        }
        $this->enviarResultadoOperacion($result);
    }
}

ESAPI::start();
