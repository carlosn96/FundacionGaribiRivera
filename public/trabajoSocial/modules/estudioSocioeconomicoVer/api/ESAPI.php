<?php

require_once '../../../../../loader.php';

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
        if (isset($info["estudioSocioeconomico"]["conclusiones"]["fotografias"]) 
            && is_array($info["estudioSocioeconomico"]["conclusiones"]["fotografias"])
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
        // El texto principal se trata por separado
        $texto = $this->getData("texto");

        // Definir las claves de las opciones que se esperan de la petición
        $clavesOpciones = ['tipo_escrito', 'anonimizar'];
        
        $opciones = [];
        foreach ($clavesOpciones as $clave) {
            $opciones[$clave] = $this->getData($clave);
        }

        // Procesamiento especial para ciertos valores
        if (isset($opciones['anonimizar'])) {
            $opciones['anonimizar'] = filter_var($opciones['anonimizar'], FILTER_VALIDATE_BOOLEAN);
        }

        // Llamar al método de la IA con el texto y el array de opciones dinámico
        $this->enviarRespuesta(getAdminLLM()->mejorarTextoAI($texto, $opciones));
    }


    public function cambiarEstadoVulnerabilidad()
    {
        $admin = getAdminEstudioSocioeconomico();
        $idVulnerabilidad = intval($this->getData("id"));
        $idEstudio = intval($this->getData("idEstudioSocioeconomico"));
        $aplica = $this->getData("aplica") === '1';
        if (($esResultadoCorrecto = $aplica? $admin->agregarVulnerabilidad($idVulnerabilidad, $idEstudio): $admin->eliminarVulnerabilidad($idVulnerabilidad, $idEstudio))
        ) {
            $info = $this->extraerInfo();
            $vulnerabilidades = $info["estudioSocioeconomico"]["vulnerabilidades"];
            $index = array_search($idVulnerabilidad, array_column($vulnerabilidades, 'id'));
            if ($index !== false) {
                $vulnerabilidades[$index]['aplica'] = $aplica;
                $info["estudioSocioeconomico"]["vulnerabilidades"] = $vulnerabilidades;
                Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            }
        }
        $this->enviarResultadoOperacion($esResultadoCorrecto);
    }
    public function modificarCantidadEspaciosVivienda()
    {
        $admin = getAdminEstudioSocioeconomico();
        $idEspacio = intval($this->getData("idEspacio"));
        $idVivienda = intval($this->getData("idVivienda"));
        $cantidad = intval($this->getData("cantidad"));
        if (($esResultadoCorrecto = $admin->modificarCantidadEspaciosVivienda($idVivienda, $idEspacio, $cantidad))) {
            $info = $this->extraerInfo();
            $distribucion = &$info["estudioSocioeconomico"]["vivienda"]["distribucion"];
            $index = array_search($idEspacio, array_column($distribucion, 'id'));
            if ($index !== false) {
                $distribucion[$index]["cantidad"] = $cantidad;
                Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            }
        }
        $this->enviarResultadoOperacion($esResultadoCorrecto);
    }


    public function eliminarEspacioVivienda()
    {
        $admin = getAdminEstudioSocioeconomico();
        $idEspacio = intval($this->getData("idEspacio"));
        $idVivienda = intval($this->getData("idVivienda"));
        if (($esResultadoCorrecto = $admin->eliminarEspacioVivienda($idEspacio, $idVivienda))) {
            $info = $this->extraerInfo();
            $distribucion = &$info["estudioSocioeconomico"]["vivienda"]["distribucion"];
            $index = array_search($idEspacio, array_column($distribucion, 'id'));
            if ($index !== false) {
                unset($distribucion[$index]);
                $info["estudioSocioeconomico"]["vivienda"]["distribucion"] = array_values($distribucion);
                Sesion::setInfoTemporal("estudioSocioeconomico", $info["estudioSocioeconomico"]);
            }
        }
        // Devolver resultado al frontend
        $this->enviarResultadoOperacion($esResultadoCorrecto);
    }

}

ESAPI::start();
