<?php

class EstudioSocioeconomico {

    use Entidad;

    private int $idEmprendedor;
    private EstudioSocioeconomicoSeccionEmpleabilidad $empleabilidad;
    private EstudioSocioeconomicoSeccionFamiliares|null $familiares;
    private EstudioSocioeconomicoSeccionEconomiaFamiliar|null $economia;
    private EstudioSocioeconomicoSeccionVivienda|null $vivienda;
    private EstudioSocioeconomicoSeccionOtrosBienes|null $otrosBienes;
    private EstudioSocioeconomicoSeccionReferencias|null $referencias;
    private EstudioSocioeconomicoSeccionVulnerabilidades|null $vulnerabilidades;
    private EstudioSocioeconomicoSeccionConclusiones|null $conclusiones;
    private string|null $resultadoVisita;
    private $fechaCreacion;
    private int $trabajadorSocial;

    public function __construct(int $idEmprendedor, $empleabilidad, $familiares, $economia, $vivienda, $otrosBienes, $referencias, $vulnerabilidades, $conclusiones, string $resultadoVisita, int $trabajadorSocial, $fechaCreacion = "") {
        $this->idEmprendedor = $idEmprendedor;
        $this->empleabilidad = $empleabilidad;
        $this->familiares = $familiares;
        $this->economia = $economia;
        $this->vivienda = $vivienda;
        $this->otrosBienes = $otrosBienes;
        $this->referencias = $referencias;
        $this->vulnerabilidades = $vulnerabilidades;
        $this->conclusiones = $conclusiones;
        $this->resultadoVisita = $resultadoVisita;
        $this->fechaCreacion = $fechaCreacion;
        $this->trabajadorSocial = $trabajadorSocial;
    }
}
