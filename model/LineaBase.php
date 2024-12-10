<?php

/**
 * Description of LineaBase
 *
 * @author JuanCarlos
 */
class LineaBase {

    use Entidad;

    private LineaBasePreliminarInicial $preliminar;
    private LineaBaseIdentificacion $identificacion;
    private LineaBaseDomicilio $domicilio;
    private LineaBaseSocioeconomico $socioeconomico;
    private ?LineaBaseNegocio $negocio;
    private ?LineaBaseAnalisisNegocio $analisisNegocio;
    private ?LineaBaseAdministracionIngresosNegocio $administracionIngresos;
    private int $id;
    private int $idEtapa;
    private int $idUsuario;
    private $fechaCreacion;

    public function __construct(int $idEtapa, int $idUsuario,
            LineaBasePreliminarInicial $preliminar,
            LineaBaseIdentificacion $identificacion,
            LineaBaseDomicilio $domicilio,
            LineaBaseSocioeconomico $socioeconomico,
            ?LineaBaseNegocio $negocio,
            ?LineaBaseAnalisisNegocio $analisisNegocio,
            ?LineaBaseAdministracionIngresosNegocio $administracionIngresos,
            $fechaCreacion = "",
            $id = 0) {
        $this->preliminar = $preliminar;
        $this->identificacion = $identificacion;
        $this->domicilio = $domicilio;
        $this->socioeconomico = $socioeconomico;
        $this->negocio = $negocio;
        $this->analisisNegocio = $analisisNegocio;
        $this->administracionIngresos = $administracionIngresos;
        $this->id = $id;
        $this->fechaCreacion = $fechaCreacion;
        $this->idUsuario = $idUsuario;
        $this->idEtapa = $idEtapa;
    }

    public function getAdministracionIngresos(): ?LineaBaseAdministracionIngresosNegocio {
        return $this->administracionIngresos;
    }

    public function getFechaCreacion() {
        return $this->fechaCreacion;
    }

    public function setAdministracionIngresos(?LineaBaseAdministracionIngresosNegocio $administracionIngresos): void {
        $this->administracionIngresos = $administracionIngresos;
    }

    public function setFechaCreacion($fechaCreacion): void {
        $this->fechaCreacion = $fechaCreacion;
    }

    public function getAnalisisNegocio(): ?LineaBaseAnalisisNegocio {
        return $this->analisisNegocio;
    }

    public function setAnalisisNegocio(?LineaBaseAnalisisNegocio $analisisNegocio): void {
        $this->analisisNegocio = $analisisNegocio;
    }

    public function getNegocio(): ?LineaBaseNegocio {
        return $this->negocio;
    }

    public function setNegocio(?LineaBaseNegocio $negocio): void {
        $this->negocio = $negocio;
    }

    public function getSocioeconomico(): LineaBaseSocioeconomico {
        return $this->socioeconomico;
    }

    public function setSocioeconomico(LineaBaseSocioeconomico $socioeconomico): void {
        $this->socioeconomico = $socioeconomico;
    }

    public function getDomicilio(): LineaBaseDomicilio {
        return $this->domicilio;
    }

    public function setDomicilio(LineaBaseDomicilio $domicilio): void {
        $this->domicilio = $domicilio;
    }

    public function getIdentificacion(): LineaBaseIdentificacion {
        return $this->identificacion;
    }

    public function setIdentificacion(LineaBaseIdentificacion $identificacion): void {
        $this->identificacion = $identificacion;
    }

    public function getIdEtapa(): int {
        return $this->idEtapa;
    }

    public function getIdUsuario(): int {
        return $this->idUsuario;
    }

    public function setIdEtapa(int $idEtapa): void {
        $this->idEtapa = $idEtapa;
    }

    public function setIdUsuario(int $idUsuario): void {
        $this->idUsuario = $idUsuario;
    }

    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getPreliminar(): LineaBasePreliminarInicial {
        return $this->preliminar;
    }

    public function setPreliminar(LineaBasePreliminarInicial $preliminar): void {
        $this->preliminar = $preliminar;
    }
}
