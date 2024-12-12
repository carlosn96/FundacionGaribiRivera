<?php

/**
 * Description of LineaBase
 *
 * @author JuanCarlos
 */
class LineaBaseFinal {

    use Entidad;

    private LineaBasePreliminarFinal $preliminar;
    private LineaBaseSocioeconomico $socioeconomico;
    private ?LineaBaseNegocio $negocio;
    private ?LineaBaseAnalisisNegocio $analisisNegocio;
    private ?LineaBaseAdministracionIngresosNegocio $administracionIngresos;
    private int $id;
    private int $idLineaBaseInicial;
    private int $idUsuario;
    private $fechaCreacion;

    public function __construct(LineaBasePreliminarFinal $preliminar,
            LineaBaseSocioeconomico $socioeconomico, ?LineaBaseNegocio $negocio,
            ?LineaBaseAnalisisNegocio $analisisNegocio,
            ?LineaBaseAdministracionIngresosNegocio $administracionIngresos,
            int $idLineaBaseInicial, int $idUsuario, $fechaCreacion, int $id = 0) {
        $this->preliminar = $preliminar;
        $this->socioeconomico = $socioeconomico;
        $this->negocio = $negocio;
        $this->analisisNegocio = $analisisNegocio;
        $this->administracionIngresos = $administracionIngresos;
        $this->id = $id;
        $this->idLineaBaseInicial = $idLineaBaseInicial;
        $this->idUsuario = $idUsuario;
        $this->fechaCreacion = $fechaCreacion;
    }

    public function getPreliminar(): LineaBasePreliminarFinal {
        return $this->preliminar;
    }

    public function getSocioeconomico(): LineaBaseSocioeconomico {
        return $this->socioeconomico;
    }

    public function getNegocio(): ?LineaBaseNegocio {
        return $this->negocio;
    }

    public function getAnalisisNegocio(): ?LineaBaseAnalisisNegocio {
        return $this->analisisNegocio;
    }

    public function getAdministracionIngresos(): ?LineaBaseAdministracionIngresosNegocio {
        return $this->administracionIngresos;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getIdLineaBaseInicial(): int {
        return $this->idLineaBaseInicial;
    }

    public function getIdUsuario(): int {
        return $this->idUsuario;
    }

    public function getFechaCreacion() {
        return $this->fechaCreacion;
    }

    public function setPreliminar(LineaBasePreliminarFinal $preliminar): void {
        $this->preliminar = $preliminar;
    }

    public function setSocioeconomico(LineaBaseSocioeconomico $socioeconomico): void {
        $this->socioeconomico = $socioeconomico;
    }

    public function setNegocio(?LineaBaseNegocio $negocio): void {
        $this->negocio = $negocio;
    }

    public function setAnalisisNegocio(?LineaBaseAnalisisNegocio $analisisNegocio): void {
        $this->analisisNegocio = $analisisNegocio;
    }

    public function setAdministracionIngresos(?LineaBaseAdministracionIngresosNegocio $administracionIngresos): void {
        $this->administracionIngresos = $administracionIngresos;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function setIdLineaBaseInicial(int $idLineaBaseInicial): void {
        $this->idLineaBaseInicial = $idLineaBaseInicial;
    }

    public function setIdUsuario(int $idUsuario): void {
        $this->idUsuario = $idUsuario;
    }

    public function setFechaCreacion($fechaCreacion): void {
        $this->fechaCreacion = $fechaCreacion;
    }
}
