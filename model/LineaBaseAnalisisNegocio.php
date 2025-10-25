<?php

class LineaBaseAnalisisNegocio
{

    use Entidad;

    private $registraEntradaSalida;
    private $asignaSueldo;
    private $conoceUtilidades;
    private $identificaCompetencia;
    private ?string $quienCompetencia;
    private string $clientesNegocio;
    private string $ventajasNegocio;
    private string $problemasNegocio;
    private array $estrategiasIncrementarVentas;
    private int $comoEmpleaGanancias;
    private $conoceProductosMayorUtilidad;
    private $ahorro;
    private ?float $cuantoAhorro;
    private ?float $porcentajeGanancias;
    private ?string $razonesNoAhorro;
    private $conocePuntoEquilibrio;
    private $separaGastos;
    private $elaboraPresupuesto;

    public function __construct(
        $registraEntradaSalida = null,
        $asignaSueldo = null,
        $conoceUtilidades = null,
        $identificaCompetencia = null,
        ?string $quienCompetencia = null,
        string $clientesNegocio = '',
        string $ventajasNegocio = '',
        string $problemasNegocio = '',
        array $estrategiasIncrementarVentas = [],
        int $comoEmpleaGanancias,
        int $conoceProductosMayorUtilidad = 0,
        ?float $porcentajeGanancias,
        $ahorro = null,
        ?float $cuantoAhorro = null,
        ?string $razonesNoAhorro = null,
        $conocePuntoEquilibrio = null,
        $separaGastos = null,
        $elaboraPresupuesto = null
    ) {
        $this->registraEntradaSalida = $registraEntradaSalida;
        $this->asignaSueldo = $asignaSueldo;
        $this->conoceUtilidades = $conoceUtilidades;
        $this->identificaCompetencia = $identificaCompetencia;
        $this->quienCompetencia = $quienCompetencia;
        $this->clientesNegocio = $clientesNegocio;
        $this->ventajasNegocio = $ventajasNegocio;
        $this->problemasNegocio = $problemasNegocio;
        $this->estrategiasIncrementarVentas = $estrategiasIncrementarVentas;
        $this->comoEmpleaGanancias = $comoEmpleaGanancias;
        $this->conoceProductosMayorUtilidad = $conoceProductosMayorUtilidad;
        $this->porcentajeGanancias = $porcentajeGanancias;
        $this->ahorro = $ahorro;
        $this->cuantoAhorro = $cuantoAhorro;
        $this->razonesNoAhorro = $razonesNoAhorro;
        $this->conocePuntoEquilibrio = $conocePuntoEquilibrio;
        $this->separaGastos = $separaGastos;
        $this->elaboraPresupuesto = $elaboraPresupuesto;
    }
}
