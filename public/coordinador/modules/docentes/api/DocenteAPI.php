<?php

include_once '../../../../../loader.php';

class DocenteAPI extends API {

    public function recuperar_docentes() {
        $this->enviar_respuesta((new AdminDocente())->obtener_docentes_materias(
                        $this->data["carrera"],
                        $this->data["plantel"],
                        $this->data["ciclo"]));
    }

    public function ver_detalles() {
        Sesion::setInfoTemporal("id_docente", $this->get_data("id"));
        $this->enviar_respuesta(OPERACION_COMPLETA);
    }

    public function recuperar_detalles_docente() {
        $id = Sesion::getInfoTemporal("id_docente");
        $this->enviar_respuesta((new AdminDocente())->recuperar_docente($id));
    }

    public function listar_docentes() {
        $this->enviar_respuesta((new AdminDocente())->listar_todos_docentes());
    }

    public function recuperar_grupos() {
        $carrera = $this->data["carrera"];
        $plantel = $this->data["plantel"];
        $this->enviar_respuesta((new AdminGrupo)->listar_grupos($carrera, $plantel));
    }

    public function guardar_docente() {
        $admin = new AdminDocente();
        $correo = $this->data["correo"] . "@" . $this->data["dominio"];
        $this->data["correo_electronico"] = str_replace(" ", "", $correo);
        if ($admin->existe_docente($this->data["nombre"], $this->data["apellidos"], $correo)) {
            $this->enviar_respuesta(Util::enum("El registro de $correo ya existe", true));
        } else {
            $this->enviar_resultado_operacion($admin->guardar_docente($this->data));
        }
    }

    public function guardar_docente_materias() {
        $this->data["correo_electronico"] = $this->data["correo"] . "@" . $this->data["dominio"];
        $this->data["id_coordinador"] = Sesion::info()["usuario"]->get_id_coordinador();
        $this->enviar_resultado_operacion((new AdminDocente)->guardar_docente_materias($this->data));
    }

    function eliminar() {
        $this->enviar_resultado_operacion((new AdminDocente())->eliminar($this->data["id"]));
    }

    function eliminar_horario() {
        $this->enviar_resultado_operacion((new AdminMateria())->eliminar_horario($this->data["id"]));
    }
    
    function eliminar_materia() {
        $this->enviar_resultado_operacion((new AdminMateria())->eliminar_materia($this->data["id"]));
    }

    function actualizar_docente() {
        $this->enviar_resultado_operacion((new AdminDocente())->actualizar($this->data));
    }

    function recuperar_materias() {
        $docente = $this->data["docente"];
        $carrera = $this->data["carrera"];
        $plantel = $this->data["plantel"];
        $ciclo =  $this->data["ciclo"];
        $this->enviar_respuesta((new AdminDocente())->recuperar_materias($docente, $carrera, $plantel, $ciclo));
    }

    function actualizar_nombre_materia() {
        $this->enviar_resultado_operacion((new AdminMateria())->actualizar_nombre_materia($this->data["id"], $this->data["val"]));
    }

    function actualizar_grupo_materia() {
        $this->enviar_resultado_operacion((new AdminMateria())->actualizar_grupo_materia($this->data["id"], $this->data["val"]));
    }

    function actualizar_horario() {
        $this->enviar_resultado_operacion((new AdminMateria())->actualizar_horario($this->data));
    }

    function agregar_horario() {
        $this->enviar_resultado_operacion((new AdminMateria())->agregar_horario($this->data));
    }

    function agregar_materia() {
        $nombre = $this->data["nombre"];
        $carrera = $this->data["carrera"];
        $ciclo = $this->data["ciclo"];
        $plantel = $this->data["plantel"];
        $docente = $this->data["docente"];
        $grupo = $this->data["grupo"];
        $horarios = $this->separa_horario($this->data["horarios"]);
        $materia = new Materia($nombre, $carrera, $grupo, $horarios);
        $materia->set_plantel($plantel);
        $materia->set_ciclo($ciclo);
        $this->enviar_resultado_operacion((new AdminDocente())->agregar_materia($docente, $materia));
    }

    private function separa_horario($horariostr) {
        $horariosFinal = [];
        foreach (explode(', ', $horariostr) as $horario) {
            list($dia, $horas) = explode(': ', $horario);
            list($horaInicio, $horaFin) = explode(' - ', $horas);
            $horariosFinal[] = [
                'dia' => $dia,
                'hora_inicio' => $horaInicio,
                'hora_fin' => $horaFin
            ];
        }
        return $horariosFinal;
    }
}

Util::iniciar_api("DocenteAPI");
