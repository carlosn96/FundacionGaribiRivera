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
        ];
    }
    
    public function eliminarPorEmprendedor($emprendedor) {
        return $this->eliminarPorId("estudio_socioeconomico", "id_emprendedor", $emprendedor);
    }
}
