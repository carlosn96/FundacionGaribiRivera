<?php

class AdminEvaluacionFormacion extends Admin {

    public function __construct() {
        parent::__construct(new EvaluacionFormacionDAO());
    }

    public function recuperarObjetivosAhorro() {
        return $this->extraerInfoCampoEspecifico("evaluacion_formacion_objetivo_ahorros",
                        "id_objetivo", "descripcion");
    }

    public function guardarEvaluacion($data) {
        return $this->dao->guardar($this->construirEvaluacionFormacion($data));
    }

    public function recuperarEvaluacion($idUsuario) {
        $evaluacion = $this->dao->consultarEvaluacion($idUsuario);
        return empty($evaluacion) ? array() : $this->construirEvaluacionFormacion($evaluacion)->toArray();
    }

    private function construirEvaluacionFormacion($data) {
        $huboBeneficioPersonal = boolval($data['huboBeneficioPersonal']);
        $beneficiosObtenidos = $data['beneficiosObtenidos'] ?? "";
        $ventasMensuales = (float) $data['ventasMensuales'];
        $gastosMensuales = (float) $data['gastosMensuales'];
        $utilidadesMensuales = (float) $data['utilidadesMensuales'];
        $sueldoMensual = (float) $data['sueldoMensual'];
        $esIngresoPrincipalPersonal = boolval($data['esIngresoPrincipalPersonal']);
        $esIngresoPrincipalFamiliar = boolval($data['esIngresoPrincipalFamiliar']);
        $tieneHabitoAhorro = boolval($data['tieneHabitoAhorro']);
        $cuentaConSistemaAhorro = boolval($data['cuentaConSistemaAhorro']);
        $detallesSistemaAhorro = $data['detallesSistemaAhorro'] ?? "";
        $objetivosAhorro = $data['objetivosAhorro'] ?? array();
        $ahorroMensual = (float) ($data['ahorroMensual'] ?? 0);
        $idUsuario = $data["id_usuario"] ?? 0;
        return new EvaluacionFormacion(
                $huboBeneficioPersonal, $beneficiosObtenidos,
                $ventasMensuales, $gastosMensuales, $utilidadesMensuales, $sueldoMensual,
                $esIngresoPrincipalPersonal, $esIngresoPrincipalFamiliar, $tieneHabitoAhorro,
                $cuentaConSistemaAhorro, $detallesSistemaAhorro, $objetivosAhorro,
                $ahorroMensual, $idUsuario);
    }

}
