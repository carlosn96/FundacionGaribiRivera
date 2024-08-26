<?php

abstract class API {

    private $case;
    protected $data;

    function __construct($case, $data) {
        $this->setCase($case);
        $this->setData(Util::separarCamposFomulario($data));
        $this->resolverPeticion();
    }

    protected function resolverPeticion() {
        $case = $this->case;
        if (method_exists($this, $case)) {
            $this->$case();
        } else {
            $this->enviarRespuestaStr("sin respuesta");
        }
    }

    private function codificarRespuesta($respuesta) {
        echo json_encode($respuesta);
    }

    protected function enviarRespuesta(array $respuesta) {
        $this->codificarRespuesta($respuesta);
    }

    protected function enviarResultadoOperacion(bool $esResultadoCorrecto) {
        $this->enviarRespuesta($esResultadoCorrecto ? OPERACION_COMPLETA : OPERACION_INCOMPLETA);
    }

    protected function enviarRespuestaStr(string $respuesta) {
        $this->enviarRespuesta(["response" => $respuesta]);
    }

    function getCase() {
        return $this->case;
    }

    function setCase($case): void {
        $this->case = $case;
    }

    function setData($data): void {
        $this->data = $data;
    }

}
