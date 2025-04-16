<?php

class EstudioSocioeconomicoSeccionEmpleabilidad {

    use Entidad;

    private array $empleoActual;
    private array $empleoAnterior;
    private int $cuentaConSeguroSocial;

    public function __construct(string $empresaActual, string $puestoActual, int $antiguedadActual,
            string $empresaAnterior, string $puestoAnterior, int $antiguedadAnterior, $motivoRetiro,
            int $cuentaConSeguroSocial) {
        $this->cuentaConSeguroSocial = $cuentaConSeguroSocial;
        $this->setEmpleoAnterior($empresaAnterior, $puestoAnterior, $antiguedadAnterior, $motivoRetiro);
        $this->setEmpleoActual($empresaActual, $puestoActual, $antiguedadActual);
    }

    public function setEmpleoActual(string $empresa, string $puesto, int $antiguedad) {
        $this->empleoActual["empresa"] = $empresa;
        $this->empleoActual["puesto"] = $puesto;
        $this->empleoActual["antiguedad"] = $antiguedad;
    }

    public function setEmpleoAnterior(string $empresa, string $puesto, int $antiguedad, $motivoRetiro) {
        $this->empleoAnterior["empresa"] = $empresa;
        $this->empleoAnterior["puesto"] = $puesto;
        $this->empleoAnterior["antiguedad"] = $antiguedad;
        $this->empleoAnterior["motivoRetiro"] = $motivoRetiro;
    }
}
