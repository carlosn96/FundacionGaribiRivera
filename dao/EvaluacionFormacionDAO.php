<?php

class EvaluacionFormacionDAO extends DAO {

    private const TABLA_LINEA_BASE = "linea_base";
    private const GUARDAR_EVALUACION = "CALL guardar_evaluacion_formacion (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private const RECUPERAR_EVALUACION = "SELECT * FROM recuperar_evaluacion_formacion WHERE id_linea_base = ?";
    private const LISTAR_OBJETIVOS_AHORRO = "SELECT * FROM listar_objetivos_ahorro WHERE id_linea_base = ?";

    public function guardar(EvaluacionFormacion $evaluacion) {
        $prepStmt = $this->prepararInstruccion(self::GUARDAR_EVALUACION);
        $idLineaBase = $this->recuperarIDLineaBase($evaluacion->getIdUsuario());
        $prepStmt->agregarInt($idLineaBase);
        $prepStmt->agregarBoolean($evaluacion->getHuboBeneficioPersonal());
        $prepStmt->agregarString($evaluacion->getBeneficiosObtenidos());
        $prepStmt->agregarDouble($evaluacion->getSueldoMensual());
        $prepStmt->agregarDouble($evaluacion->getVentasMensuales());
        $prepStmt->agregarDouble($evaluacion->getGastosMensuales());
        $prepStmt->agregarBoolean($evaluacion->getEsIngresoPrincipalPersonal());
        $prepStmt->agregarBoolean($evaluacion->getEsIngresoPrincipalFamiliar());
        $prepStmt->agregarBoolean($evaluacion->getTieneHabitoAhorro());
        $prepStmt->agregarBoolean($evaluacion->getCuentaConSistemaAhorro());
        $prepStmt->agregarString($evaluacion->getDetallesSistemaAhorro());
        $prepStmt->agregarJSON($evaluacion->getObjetivosAhorro());
        $prepStmt->agregarDouble($evaluacion->getAhorroMensual());
        return $prepStmt->ejecutar();
    }

    private function recuperarIDLineaBase($idUsuario) {
        return $this->extraerIdTupla("id_linea_base", "id_usuario",
                        $idUsuario, self::TABLA_LINEA_BASE);
    }

    public function consultarEvaluacion(int $idUsuario) {
        $idLineaBase = $this->recuperarIDLineaBase($idUsuario);
        $evaluacion = [];
        if (!is_null($idLineaBase)) {
            $evaluacion = $this->selectPorId(self::RECUPERAR_EVALUACION, $idLineaBase);
            if ($evaluacion) {
                $evaluacion["objetivosAhorro"] = $this->selectAllPorId(self::LISTAR_OBJETIVOS_AHORRO, $idLineaBase);
            }
        }
        return $evaluacion;
    }

}
