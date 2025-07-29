<?php

class EstudioSocioeconomicoDAO extends DAO
{

    private const GUARDAR_ESTUDIO_SOCIOECONOMICO = "CALL guardar_estudio_socioeconomico(?)";
    private const RECUPERAR_ESTUDIO_SOCIOECONOMICO = "SELECT * FROM recuperar_estudio_socioeconomico WHERE idEmprendedor = ?";

    public function guardar(EstudioSocioeconomico $estudioSocioeconomico)
    {
        try {
            $prep = $this->prepararInstruccion(self::GUARDAR_ESTUDIO_SOCIOECONOMICO);
            $prep->agregarEntidad($estudioSocioeconomico);
            return $prep->ejecutar();
        } catch (Exception $exc) {
            Util::error_log($exc->getMessage());
            return false;
        }
    }

    public function getListaIDEmprendedoresConES()
    {
        $data = $this->selectPorCamposEspecificos("id_emprendedor emprendedor", "estudio_socioeconomico");
        return !empty($data) && is_array($data) ? array_column($data, 0) : [];
    }

    public function getEstudioSocioeconomico(int $idEmprendedor)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_ESTUDIO_SOCIOECONOMICO);
        $prep->agregarInt($idEmprendedor);
        $data = $prep->ejecutarConsulta();
        return count($data) ? $this->agruparES($data) : [];
    }

    private function agruparES(array $data)
    {
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
            'vulnerabilidades' => ($vul = json_decode($data['vulnerabilidades'], true)),
            'conclusiones' => json_decode($data['conclusiones'], true),
            'coneval' => json_decode($data['coneval'], true),
        ];
    }

    public function eliminarPorEmprendedor($emprendedor)
    {
        return $this->eliminarPorId("estudio_socioeconomico", "id_emprendedor", $emprendedor);
    }

    public function cambiarFotografia($idFotografia, $fotografia)
    {
        $prep = $this->prepararInstruccion("UPDATE estudio_socioeconomico_seccion_conclusiones_lista_fotografias SET fotografia = ? WHERE id_fotografia = ?");
        $fotografiaBin = Util::base64ToBin($fotografia);
        $prep->agregarBlob($fotografiaBin);
        $prep->agregarInt($idFotografia);
        return $prep->ejecutar();
    }
    public function eliminarFotografia($idFotografia)
    {
        return $this->eliminarPorId("estudio_socioeconomico_seccion_conclusiones_lista_fotografias", "id_fotografia", $idFotografia);
    }

    public function agregarFotografiasNuevas(int $idConclusiones, array $fotografias)
    {
        if (empty($fotografias)) {
            return false;
        }
        $prep = $this->prepararInstruccion("CALL guardar_estudio_socioeconomico_fotografias_nuevas (?, ?)");
        $prep->agregarInt($idConclusiones);
        $prep->agregarJSON($fotografias);
        return $prep->ejecutarConsultaMultiple();
    }

    public function actualizarObservaciones(int $id, string $observaciones)
    {
        $prep = $this->prepararInstruccion("UPDATE estudio_socioeconomico_seccion_conclusiones SET observaciones_generales = ? WHERE id = ?");
        $prep->agregarString($observaciones);
        $prep->agregarInt($id);
        return $prep->ejecutar();
    }

    public function consultarConeval($fecha = null)
    {
        $prep = $this->prepararInstruccion("CALL consultar_coneval(?)");
        $prep->agregarString(is_null($fecha) ? "" : $fecha);
        $data = $prep->ejecutarConsulta();
        return count($data) ? $data : [];
    }

    public function eliminarFamiliar($idFamiliar)
    {
        return $this->eliminarPorId("estudio_socioeconomico_seccion_familiares", "id_familiar", $idFamiliar);
    }

    public function agregarVulnerabilidad($idVulnerabilidad, $idEstudio)
    {
        return $this->modificarVulnerabilidad('INSERT INTO estudio_socioeconomico_seccion_vulnerabilidad_lista (id_estudio_socioeconomico, id_vulnerabilidad) VALUES (?, ?)', $idEstudio, $idVulnerabilidad);
    }

    public function eliminarVulnerabilidad($idVulnerabilidad, $idEstudio)
    {
        return $this->modificarVulnerabilidad('DELETE FROM estudio_socioeconomico_seccion_vulnerabilidad_lista WHERE id_estudio_socioeconomico = ? AND id_vulnerabilidad = ?', $idEstudio, $idVulnerabilidad);
    }

    private function modificarVulnerabilidad(string $sql, int $idEstudio, int $idVulnerabilidad)
    {
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idEstudio);
        $prep->agregarInt($idVulnerabilidad);
        return $prep->ejecutar();
    }

    public function modificarCantidadEspaciosVivienda($idVivienda, $idEspacio, $cantidad)
    {
        $sql= "UPDATE estudio_socioeconomico_seccion_vivienda_lista_distribucion SET cantidad = ? WHERE id_vivienda = ? AND id_distribucion = ?";
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($cantidad);
        $prep->agregarInt($idVivienda);
        $prep->agregarInt($idEspacio);
        return $prep->ejecutar();
    }

    public function eliminarEspacioVivienda($idEspacio, $idVivienda)
    {

        $sql = "DELETE FROM estudio_socioeconomico_seccion_vivienda_lista_distribucion WHERE id_vivienda = ? AND id_distribucion = ?";
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idVivienda);
        $prep->agregarInt($idEspacio);
        return $prep->ejecutar();
    }

}
