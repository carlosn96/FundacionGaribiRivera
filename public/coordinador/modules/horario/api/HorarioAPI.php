<?php

include_once '../../../../../loader.php';

class HorarioAPI extends API {

    private const GRUPO = "Grupo";
    private const DOCENTE = "Docente";

    function obtener_lista_elementos() {
        $tipo = $this->data["tipoHorario"];
        $carrera = $this->data["carrera"];
        $plantel = $this->data["plantel"];
        $cicloEscolar = $this->data["cicloEscolar"];
        $this->enviar_respuesta([
            "tabla_horario" => $this->recuperar_listado_grupo_docente($tipo, $carrera, $plantel, $cicloEscolar),
            "docentes" => (new AdminDocente)->obtener_docentes_materias($carrera, $plantel, $cicloEscolar)
        ]);
    }

    private function recuperar_listado_grupo_docente($tipo, $carrera, $plantel, $ciclo) {
        switch ($tipo) {
            case "grupo":
                $lista = [
                    self::GRUPO => array_map(function ($grupo) {
                        return ["text" => $grupo['grupo'], "id" => $grupo['id_grupo']];
                    }, (new AdminMateria())->listar_grupos($carrera, $plantel, $ciclo))
                ];
                break;
            case "profesor":
                $lista = [
                    self::DOCENTE => array_map(function ($docente) {
                        return [
                    "text" => $docente["nombre"] . " " . $docente["apellidos"],
                    "id" => $docente['id_docente']
                        ];
                    }, array_values((new AdminDocente())->obtener_docentes_materias($carrera, $plantel, $ciclo)))
                ];
                break;
        }
        return $lista;
    }

    function recuperar_horario() {
        try {
            $carrera = $this->data["carrera"];
            $plantel = $this->data["plantel"];
            $ciclo = $this->data["ciclo"];
            //$id = $this->data["idGrupo"];
            $id = $this->data["id"];
            $tipo = $this->data["tipo"];
            $rs = (new AdminDocente())->obtener_horario($tipo, $id, $carrera, $plantel, $ciclo);
            $horario = [
                "tipo" => $tipo,
                "id" => $id,
                "horario" => $rs,
                $tipo => $rs[0][strtolower($tipo)]
            ];
            Sesion::setInfoTemporal("horario", $horario);
            $this->enviar_respuesta(OPERACION_COMPLETA);
        } catch (Exception $e) {
            $this->enviar_respuesta(Util::enum($e->getMessage(), true));
        }
    }

    function consultar_disponibilidad() {
        $dia = $this->data["diaSemana"];
        $hora = $this->data["hora"];
        $carrera = $this->data["carrera"];
        $plantel = $this->data["plantel"];
        $ciclo = $this->data["ciclo"];
        $this->enviar_respuesta(
                (new AdminDocente())->consultar_disponibilidad($dia, $hora, $carrera, $plantel, $ciclo)
        );
    }
}

Util::iniciar_api("HorarioAPI");
