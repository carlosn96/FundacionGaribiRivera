<?php

class LineaBaseAnalisisNegocio {

    use Entidad;

    private string $problemasNegocio;
    private $registraEntradaSalida;
    private $asignaSueldo;
    private $conoceUtilidades;
    private $identificaCompetencia;
    private ?string $quienCompetencia;
    private string $clientesNegocio;
    private string $ventajasNegocio;
    private array $estrategiasIncrementarVentas;
    private $conoceProductosMayorUtilidad;
    private ?float $porcentajeGanancias;
    private $ahorro;
    private ?float $cuantoAhorro;
    private ?string $razonesNoAhorro;
    private array $comoEmpleaGanancias;
    private $conocePuntoEquilibrio;
    private $separaGastos;
    private $elaboraPresupuesto;

    public function __construct(string $problemasNegocio, $registraEntradaSalida, 
            $asignaSueldo, $conoceUtilidades, $identificaCompetencia, 
            ?string $quienCompetencia, string $clientesNegocio, 
            string $ventajasNegocio, array $estrategiasIncrementarVentas, 
            $conoceProductosMayorUtilidad, ?float $porcentajeGanancias, 
            $ahorro, ?float $cuantoAhorro, ?string $razonesNoAhorro,
            array $comoEmpleaGanancias, $conocePuntoEquilibrio, $separaGastos, $elaboraPresupuesto) {
        $this->problemasNegocio = $problemasNegocio;
        $this->registraEntradaSalida = $registraEntradaSalida;
        $this->asignaSueldo = $asignaSueldo;
        $this->conoceUtilidades = $conoceUtilidades;
        $this->identificaCompetencia = $identificaCompetencia;
        $this->quienCompetencia = $quienCompetencia;
        $this->clientesNegocio = $clientesNegocio;
        $this->ventajasNegocio = $ventajasNegocio;
        $this->estrategiasIncrementarVentas = $estrategiasIncrementarVentas;
        $this->conoceProductosMayorUtilidad = $conoceProductosMayorUtilidad;
        $this->porcentajeGanancias = $porcentajeGanancias;
        $this->ahorro = $ahorro;
        $this->cuantoAhorro = $cuantoAhorro;
        $this->razonesNoAhorro = $razonesNoAhorro;
        $this->comoEmpleaGanancias = $comoEmpleaGanancias;
        $this->conocePuntoEquilibrio = $conocePuntoEquilibrio;
        $this->separaGastos = $separaGastos;
        $this->elaboraPresupuesto = $elaboraPresupuesto;
    }

}
