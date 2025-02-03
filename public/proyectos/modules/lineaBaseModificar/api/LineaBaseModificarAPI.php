<?php

include_once '../../../../../loader.php';

class LineaBaseModificarAPI extends API {

    function recuperarInfoLineaBase() {
        $tipo = Sesion::getInfoTemporal("tipoLineaBase");
        $id = Sesion::getInfoTemporal("idUsuario");
        $lb = getAdminLineaBase()->getLineaBase($id);
        $existeLineaBase = $lb[$tipo]["existeLineaBase"];
        
        
        if(isset($lb[$tipo]["data"]['administracionIngresos'])) {
            $data = $this->getPreguntas($lb[$tipo]["data"]);
        } else {
            $data = [];
        }
        
        $data["fechaCreacion"] = $lb[$tipo]["data"]["fechaCreacion"];
        $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);
        $this->enviarRespuesta(compact('existeLineaBase', 'tipo', 'emprendedor', 'data'));
    }

    private function getPreguntas($data) {
        return [
            "rangos" => [
                [
                    "pregunta" => "Tu ingreso mensual actual es: ",
                    "id" => "id_rango_ingreso_mensual",
                    "listado" => getAdminLineaBase()->recuperarListaRangosIngreso(),
                    "val" => $data["socioeconomico"]["ingresoMensual"]["id"]
                ]
            ],
            "montos" => [
                [
                    "pregunta" => "¿Cuál es el monto de tus Ventas Mensuales?",
                    "id" => 'monto_mensual_ventas',
                    "val" => $data['administracionIngresos']["montoMensualVentas"]
                ],
                [
                    "pregunta" => "¿Cuál es el monto de tus Utilidades Mensuales?",
                    "id" => 'monto_mensual_utilidades',
                    "val" => $data['administracionIngresos']["montoMensualUtilidades"]
                ],
                [
                    "pregunta" => "¿Cuál es tu sueldo mensual?",
                    "id" => 'sueldo_mensual',
                    "val" => $data['administracionIngresos']["sueldoMensual"]
                ],
                [
                    "pregunta" => "¿Cuál es el monto aproximado de tus ahorros mensuales?",
                    "id" => 'monto_ahorro_mensual',
                    "val" => $data['administracionIngresos']["montoAhorroMensual"]
                ]
            ]
        ];
    }
    
    public function actualizarLineaBase() {
        $tipo = Sesion::getInfoTemporal("tipoLineaBase");
        $id = Sesion::getInfoTemporal("idUsuario");
        $this->enviarResultadoOperacion(getAdminLineaBase()->actualizarParametrosImpacto($this->data, $tipo, $id));
    }
    
}

Util::iniciarAPI(LineaBaseModificarAPI::class);
