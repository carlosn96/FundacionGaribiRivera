<?php

class LineaBaseAnalisisNegocio {

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
    private array $comoEmpleaGanancias;
    private $conoceProductosMayorUtilidad;
    private $ahorro;
    private ?float $cuantoAhorro;
    private ?string $razonesNoAhorro;
    private $conocePuntoEquilibrio;
    private $separaGastos;
    private $elaboraPresupuesto;

    public function __construct($registraEntradaSalida, $asignaSueldo,
            $conoceUtilidades, $identificaCompetencia, ?string $quienCompetencia,
            string $clientesNegocio, string $ventajasNegocio,
            string $problemasNegocio, array $estrategiasIncrementarVentas,
            array $comoEmpleaGanancias, $conoceProductosMayorUtilidad, $ahorro,
            ?float $cuantoAhorro, ?string $razonesNoAhorro, $conocePuntoEquilibrio,
            $separaGastos, $elaboraPresupuesto) {
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
        $this->ahorro = $ahorro;
        $this->cuantoAhorro = $cuantoAhorro;
        $this->razonesNoAhorro = $razonesNoAhorro;
        $this->conocePuntoEquilibrio = $conocePuntoEquilibrio;
        $this->separaGastos = $separaGastos;
        $this->elaboraPresupuesto = $elaboraPresupuesto;
    }
}
