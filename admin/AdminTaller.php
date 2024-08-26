<?php

class AdminTaller extends Admin {

    private const TIPOS_EVALACION = array("contenido", "satisfaccion");

    public function __construct() {
        parent::__construct(new TallerDAO());
    }
    
    public function listarNombreTalleres() {
        return $this->dao->listarNombreTalleres();
        
    }

    public function listarDetallesTalleres($tipoTaller = "") {
        return $this->crearArrayTalleres($this->dao->listarTalleres($tipoTaller));
    }

    private function crearArrayTalleres($listaResultado) {
        $lista = array();
        foreach ($listaResultado as $fila) {
            $taller = $this->construirTaller($fila)->toArray();
            array_push($lista, $taller += ["existeExamen" => boolval($this->recuperarCuestionarioExamen($fila["id_taller"]))]);
        }
        return $lista;
    }

    private function construirTaller($rs) {
        //$rs = count($res) ? $res[0] : null;
        $taller = new Taller($rs["nombre_taller"], $this->construirInstructor($rs),
                map($rs["descripcion"], $rs["id_tipo_taller"]), $rs["fechaHoraInicio"], $rs["fechaHoraFin"],
                $rs["observaciones"], map($rs["modo"], $rs["id_modo_imparticion"]),
                $rs["evaluacion_habilitada"], $rs["id_taller"]);
        $taller->establecerTotalInscritos($this->dao->obtenerTotalInscritosPorTaller($taller->obtenerID()));
        return $taller;
    }

    private function construirInstructor($rs) {
        $id = $rs["id_instructor"];
        $nombre = $rs["nombre_instructor"];
        $apellidoPaterno = $rs["apellido_paterno"];
        $apellidoMaterno = $rs["apellido_materno"];
        $correoElectronico = $rs["correo_electronico"];
        $telefono = $rs["telefono"];
        $foto = obtenerFotografiaBin($rs["fotografia"], true);
        return new InstructorTaller($id, $nombre, $apellidoPaterno, $apellidoMaterno, $correoElectronico, $telefono, $foto);
    }

    public function consultarPonderacionesEvaluacionContenido() {
        return $this->dao->getPonderacionesEvaluacionContenido();
    }

    public function consultarCriteriosEvaluacionContenido() {
        return $this->dao->getCriteriosEvaluacionContenido();
    }

    public function consultarPonderacionesEvaluacionSatisfaccion() {
        return $this->dao->getPonderacionesEvaluacionSatisfaccion();
    }

    public function consultarCriteriosEvaluacionSatisfaccion() {
        return $this->dao->getCriteriosEvaluacionSatisfaccion();
    }

    public function esEvaluacionHecha($idInteresado, $idTaller) {
        return $this->dao->existeEvaluacion($idInteresado, $idTaller);
    }

    public function guardarInstructor($nombre, $apellidoP, $apellidoM, $correo, $telefono, $fotografia) {
        return $this->dao->guardarInstructor($nombre, $apellidoP, $apellidoM, $correo, $telefono, $fotografia);
    }

    public function listarInstructores($filtrarTodo = true) {
        $rs = $this->dao->listarInstructores($filtrarTodo);
        $lista = array();
        foreach ($rs as $instructor) {
            array_push($lista, $this->construirInstructor($instructor)->toArray());
        }
        return $lista;
    }

    public function obtenerTipoTalleres() {
        $rs = $this->dao->listarTiposTaller();
        $lista = array();
        foreach ($rs as $tipo) {
            array_push($lista, map($tipo["descripcion"], $tipo["id_tipo"]));
        }
        return $lista;
    }

    public function eliminarInstructor($id) {
        return $this->dao->eliminarInstructor($id);
    }

    public function recuperarInstructor($id) {
        return $this->construirInstructor($this->dao->obtenerInstructor($id));
    }

    public function actualizarInstructor($instructor) {
        return $this->dao->actualizarInstructor($instructor);
    }

    public function agregarTaller($nombre, $instructor, $tipo, $fechaHoraInicio, $fechaHoraFin, $observaciones, $modoImparticion) {
        return $this->dao->agregarTaller(new Taller($nombre, $instructor, $tipo, $fechaHoraInicio, $fechaHoraFin, $observaciones, $modoImparticion));
    }

    public function eliminarTaller($id) {
        return $this->dao->eliminarTaller($id);
    }

    function recuperarTaller($id): Taller {
        return $this->construirTaller($this->dao->recuperarTaller($id));
    }

    public function listarInscripcionesPorEtapa($idInteresado) {
        return $this->dao->listarInscripcionesPorEtapa($idInteresado);
    }

    function listarTalleresPorEtapa($claveAcceso) {
        return $this->dao->listarTalleresPorEtapa($claveAcceso);
    }

    public function actualizarTaller($taller) {
        return $this->dao->actualizarTaller($taller);
    }

    public function recuperarListaInscritosPorTaller($idTaller, $idEtapa) {
        return $this->dao->recuperarListaInscritos($idTaller, $idEtapa);
    }

    public function recuperarListaInscritosPorEtapa($idEtapa) {
        return $this->dao->recuperarListaInscritosPorEtapa($idEtapa);
    }

    public function recuperarAsistenciaPorInscrito($idInteresado, $idEtapa, $idTaller) {
        return $this->dao->recuperarAsistenciaPorInscrito($idInteresado, $idEtapa, $idTaller)["asiste"];
    }

    public function actualizarAsistencia($idTaller, $idAsistente, $idEtapa, $asiste, $observacion) {
        return $this->dao->actualizarAsistencia($idTaller, $idAsistente, $idEtapa, $asiste, $observacion);
    }

    public function agregarInscripcionEtapa($idEtapa, $claveAccesoEtapa, $idInteresado) {
        $talleres = $this->dao->listarTalleresPorEtapa($claveAccesoEtapa);
        $cuentaTalleres = count($talleres);
        if ($cuentaTalleres && (new EtapaDAO)->verificarClaveAcceso($idEtapa, $claveAccesoEtapa)) {
            $ejecucionesCompletas = 0;
            foreach ($talleres as $taller) {
                $etapa = $taller["id_etapa"];
                $taller = $taller["id_taller"];
                $ejecucionesCompletas += $this->dao->agregarInscripcionEtapa($idInteresado, $etapa, $taller);
            }
            $resultadoOperacion = $cuentaTalleres == $ejecucionesCompletas &&
                    (new AdminInteresado())->actualizarEtapaInscripcion($idInteresado, $idEtapa) ? REGISTRO_COMPLETO : ERROR_INSERTAR;
        } else {
            $resultadoOperacion = ERROR_CLAVE;
        }
        return $resultadoOperacion;
    }

    public function eliminarInscripcion($idTaller, $idInscrito) {
        return $this->dao->eliminarInscripcion($idTaller, $idInscrito);
    }

    public function recuperarListaEvaluacionesPorTaller($idTaller, $idEtapa) {
        return $this->dao->recuperarListaEvaluacionesPorTaller($idTaller, $idEtapa);
    }

    public function recuperarEvaluacionIndividual($idEvaluacion) {
        $evaluaciones = array();
        foreach (self::TIPOS_EVALACION as $tipoEvaluacion) {
            $evaluaciones[$tipoEvaluacion]["lista"] = $this->dao->obtenerEvaluacion($tipoEvaluacion, $idEvaluacion);
            $evaluaciones[$tipoEvaluacion]["promedio"] = $this->dao->obtenerPromedioEvaluacion($tipoEvaluacion, $idEvaluacion);
        }
        return $evaluaciones;
    }

    public function recuperarEvaluacionGlobal($idTaller, $idEtapa) {
        $promedios = array();
        foreach (self::TIPOS_EVALACION as $tipoEvaluacion) {
            $promedios[$tipoEvaluacion]["promedio"] = $this->dao->obtenerPromedioGlobal($tipoEvaluacion, $idTaller, $idEtapa);
            $promedios[$tipoEvaluacion]["max"] = $this->dao->obtenerPuntuacionMaximaPromedio($tipoEvaluacion);
            $promedios[$tipoEvaluacion]["porcentaje"] = $promedios[$tipoEvaluacion]["promedio"] * 100 / $promedios[$tipoEvaluacion]["max"];
        }
        return $promedios;
    }

    public function crearEvaluacion($idInteresado, $idTaller, $evaluacion) {
        return $this->dao->crearEvaluacion($idInteresado, $idTaller, $evaluacion);
    }

    public function eliminarEvaluacion($idEvaluacion) {
        return $this->dao->eliminarEvaluacion($idEvaluacion);
    }

    public function obtenerTotalInscripciones() {
        return $this->dao->obtenerTotalInscripciones();
    }

    public function habilitarEvaluacion($idTaller, $evaluacionHabilitada) {
        return $this->dao->habilitarEvaluacion($idTaller, $evaluacionHabilitada);
    }

    public function recuperarCuestionarioExamen($idTaller) {
        $preguntas = $this->dao->obtenerPreguntasExamen($idTaller);
        foreach ($preguntas as &$pregunta) {
            $pregunta["respuestas"] = $this->dao->obtenerRespuestas($pregunta["id_pregunta"]);
        }
        return $preguntas;
    }

    public function guardarRespuestasExamen($idEmprendedor, $respuestas) {
        $resultado = 0;
        foreach ($respuestas as $respuesta) {
            $resultado += $this->dao->guardarRespuestaExamen($idEmprendedor, $respuesta);
        }
        return $resultado === count($respuestas);
    }

    public function obtenerRespuestasExamen($idTaller, $idInteresado) {
        return $this->dao->obtenerRespuestasExamen($idTaller, $idInteresado);
    }

    public function recuperarResultadosExamen($idTaller, $idEtapa) {
        return $this->dao->recuperarResultadosExamen($idTaller, $idEtapa);
    }

    public function crearExamenTaller($cuestionario, $idTaller) {
        return $this->dao->crearExamenTaller($cuestionario, $idTaller);
    }

    public function eliminarResultadosExamen($idEmprendedor, $idTaller) {
        return $this->dao->eliminarResultadosExamen($idEmprendedor, $idTaller);
    }

    public function eliminarCuestionarioExamen($idTaller) {
        return $this->dao->eliminarCuestionarioExamen($idTaller);
    }

}
