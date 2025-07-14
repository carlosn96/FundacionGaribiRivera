<?php

class EstudioSocioeconomicoDAO extends DAO {

    private const GUARDAR_ESTUDIO_SOCIOECONOMICO = "CALL guardar_estudio_socioeconomico(?)";
    private const RECUPERAR_ESTUDIO_SOCIOECONOMICO = "SELECT * FROM recuperar_estudio_socioeconomico WHERE idEmprendedor = ?";

    public function guardar(EstudioSocioeconomico $estudioSocioeconomico) {
        try {
            $prep = $this->prepararInstruccion(self::GUARDAR_ESTUDIO_SOCIOECONOMICO);
            $prep->agregarEntidad($estudioSocioeconomico);
            return $prep->ejecutar();
        } catch (Exception $exc) {
            Util::error_log($exc->getMessage());
            return false;
        }
    }

    public function getListaIDEmprendedoresConES() {
        $data = $this->selectPorCamposEspecificos("id_emprendedor emprendedor", "estudio_socioeconomico");
        return !empty($data) && is_array($data) ? array_column($data, 0) : [];
    }

    public function getEstudioSocioeconomico(int $idEmprendedor) {
        $prep = $this->prepararInstruccion(self::RECUPERAR_ESTUDIO_SOCIOECONOMICO);
        $prep->agregarInt($idEmprendedor);
        $data = $prep->ejecutarConsulta();
        return count($data) ? $this->agruparES($data) : [];
    }

    private function agruparES(array $data) {
        return [
            'id' => $data['id'],
            'idEmprendedor' => $data['idEmprendedor'],
            'trabajadorSocial' => $data['trabajadorSocial'],
            'resultadoVisita' => $data['resultadoVisita'],
            'fechaCreacion' => $data['fechaCreacion'],
            'empleabilidad' => json_decode($data['empleabilidad'], true),
            'familiares' => json_decode("[" . $data['familiares'] . "]", true),
            'economia' => json_decode($data['economia'], true),
            'vivienda' => json_decode($data['vivienda'], true),
            'otrosBienes' => json_decode($data['otrosBienes'], true),
            'referencias' => json_decode($data['referencias'], true),
            'vulnerabilidades' => ($vul = json_decode($data['vulnerabilidades'], true)) ? $vul : [],
            'conclusiones' => json_decode($data['conclusiones'], true),
            'coneval' => $this->consultarConeval(),
        ];
    }
    
    public function eliminarPorEmprendedor($emprendedor) {
        return $this->eliminarPorId("estudio_socioeconomico", "id_emprendedor", $emprendedor);
    }

    public function cambiarFotografia($idFotografia, $fotografia) {        
        $prep = $this->prepararInstruccion("UPDATE estudio_socioeconomico_seccion_conclusiones_lista_fotografias SET fotografia = ? WHERE id_fotografia = ?");
        $fotografiaBin = Util::base64ToBin($fotografia);
        $prep->agregarBlob($fotografiaBin);
        $prep->agregarInt($idFotografia);
        return $prep->ejecutar();
    }
    public function eliminarFotografia($idFotografia) {      
        return $this->eliminarPorId("estudio_socioeconomico_seccion_conclusiones_lista_fotografias", "id_fotografia", $idFotografia);
    }

    public function agregarFotografiasNuevas(int $idConclusiones, array $fotografias) {
        if (empty($fotografias)) {
            return false;
        }
        $prep = $this->prepararInstruccion("CALL guardar_estudio_socioeconomico_fotografias_nuevas (?, ?)");
        $prep->agregarInt($idConclusiones);
        $prep->agregarJSON($fotografias);
        return $prep->ejecutarConsultaMultiple();
    }

    public function actualizarObservaciones(int $id, string $observaciones) {
        $prep = $this->prepararInstruccion("UPDATE estudio_socioeconomico_seccion_conclusiones SET observaciones_generales = ? WHERE id = ?");
        $prep->agregarString($observaciones);
        $prep->agregarInt($id);
        return $prep->ejecutar();
    }

    public function consultarConeval($fecha = null) {
        $prep = $this->prepararInstruccion("CALL consultar_coneval(?)");
        $prep->agregarString(is_null($fecha) ? "" : $fecha);
        $data = $prep->ejecutarConsulta();
        return count($data) ? $data : [];
    }

    public function eliminarFamiliar($idFamiliar) {
        return $this->eliminarPorId("estudio_socioeconomico_seccion_familiares", "id_familiar", $idFamiliar);
    }
}
