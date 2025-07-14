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
    private function actualizarFotografiaEnInfo(&$info, $idFotografia, $fotografia = null, $eliminar = false)
    {
        if (
            isset($info["estudioSocioeconomico"]["conclusiones"]["fotografias"]) &&
            is_array($info["estudioSocioeconomico"]["conclusiones"]["fotografias"])
        ) {
            foreach ($info["estudioSocioeconomico"]["conclusiones"]["fotografias"] as $idx => &$fotoObj) {
                if (isset($fotoObj["id"]) && $fotoObj["id"] == $idFotografia) {
                    if ($eliminar) {
                        unset($info["estudioSocioeconomico"]["conclusiones"]["fotografias"][$idx]);
                    } else {
                        $fotoObj["fotografia"] = $fotografia;
                    }
                    break;
                }
            }
            unset($fotoObj); // Buenas prácticas
            // Reindexar si se eliminó
            if ($eliminar) {
                $info["estudioSocioeconomico"]["conclusiones"]["fotografias"] = array_values($info["estudioSocioeconomico"]["conclusiones"]["fotografias"]);
            }
        }
    }

    public function cambiarFotografia()
    {
        $idFotografia = $this->getData("idFoto");
        $fotografia = $this->getData("fotografia");
        $result = getAdminEstudioSocioeconomico()->cambiarFotografia($idFotografia, $fotografia);
        if ($result) {
            $info = $this->extraerInfo();
            $this->actualizarFotografiaEnInfo($info, $idFotografia, $fotografia, false);
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
        }
        $this->enviarResultadoOperacion($result);
    }

    public function eliminarFotografia()
    {
        $idFotografia = $this->getData("idFoto");
        $result = getAdminEstudioSocioeconomico()->eliminarFotografia($idFotografia);
        if ($result) {
            $info = $this->extraerInfo();
            $this->actualizarFotografiaEnInfo($info, $idFotografia, null, true);
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
        }
        $this->enviarResultadoOperacion($result);
    }

    public function agregarFotografias()
    {
        $fotos = $this->getData("fotos");
        $idConclusiones = $this->getData("idConclusiones");
        $result = getAdminEstudioSocioeconomico()->agregarFotografiasNuevas($idConclusiones, $fotos);
        if ($result) {
            $info = $this->extraerInfo();
            if (!isset($info["estudioSocioeconomico"]["conclusiones"]["fotografias"])) {
                $info["estudioSocioeconomico"]["conclusiones"]["fotografias"] = [];
            }
            $info["estudioSocioeconomico"]["conclusiones"]["fotografias"] = array_merge(
                $info["estudioSocioeconomico"]["conclusiones"]["fotografias"],
                $result
            );
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            $this->enviarResultadoOperacion(true);
        } else {
            $this->enviarResultadoOperacion(false);
        }
    }

    public function actualizarObservaciones()
    {
        $info = $this->extraerInfo();
        $observaciones = $this->getData("observaciones");
        $id = $this->getData("id");
        if (getAdminEstudioSocioeconomico()->actualizarObservaciones($id, $observaciones)) {
            if (!isset($info["estudioSocioeconomico"]["conclusiones"]["observacionesGenerales"])) {
                $info["estudioSocioeconomico"]["conclusiones"]["observaciones"] = [];
            }
            $info["estudioSocioeconomico"]["conclusiones"]["observaciones"] = $observaciones;
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            $this->enviarResultadoOperacion(true);
        } else {
            $this->enviarResultadoOperacion(false);
            return;
        }
    }

    public function eliminarFamiliar()
    {
        $idFamiliar = $this->getData("idFamiliar");
        if (getAdminEstudioSocioeconomico()->eliminarFamiliar($idFamiliar)) {
            $info = $this->extraerInfo();
            if (isset($info["estudioSocioeconomico"]["familiares"]) && is_array($info["estudioSocioeconomico"]["familiares"])) {
                foreach ($info["estudioSocioeconomico"]["familiares"] as $idx => $familiar) {
                    if ($familiar["idFamiliar"] == $idFamiliar) {
                        unset($info["estudioSocioeconomico"]["familiares"][$idx]);
                        break;
                    }
                }
                // Reindexar el array
                $info["estudioSocioeconomico"]["familiares"] = array_values($info["estudioSocioeconomico"]["familiares"]);
            }
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            $this->enviarResultadoOperacion(true);
        } else {
            $this->enviarResultadoOperacion(false);
        }
    }


    function mejorarTextoObservaciones()
    {
        $texto = $this->getData("texto");
        $modelo = $this->getData("modelo");
        $this->enviarRespuesta(Util::enum("Función no implementada en este momento ...", true));
        /*$result = $this->callOpenRouterAPI($texto);
        if ($result) {
            $info = $this->extraerInfo();
            if (!isset($info["estudioSocioeconomico"]["conclusiones"]["observacionesMejoradas"])) {
                $info["estudioSocioeconomico"]["conclusiones"]["observacionesMejoradas"] = [];
            }
            $info["estudioSocioeconomico"]["conclusiones"]["observacionesMejoradas"] = $result;
            Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            $this->enviarRespuesta(Util::emum($result, false));
        } else {
            $this->enviarResultadoOperacion(false);
        }*/
    }
    //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

    private function callOpenRouterAPI($texto)
    {
        $url = "https://openrouter.ai/api/v1/chat/completions";

        $data = [
            "model" => "openai/gpt-4o",
            "messages" => [
                [
                    "role" => "user",
                    "content" => $texto
                ]
            ]
        ];

        $headers = [
            "Authorization: Bearer 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", // Recomendado desde variable de entorno
            "Content-Type: application/json"
        ];

        // Llamada a la función HTTPPost con JSON
        $response = Util::HTTPPost($url, $data, $headers, true);

        // Decodificar respuesta JSON y devolver el contenido del mensaje
        $json = json_decode($response, true);

        if (!isset($json['choices'][0]['message']['content'])) {
            throw new Exception("No se pudo obtener la respuesta de OpenRouter.");
        }

        return $json['choices'][0]['message']['content'];
    }

}

ESAPI::start();
