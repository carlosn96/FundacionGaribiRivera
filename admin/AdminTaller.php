<?php

class AdminTaller extends Admin {

    private const TIPOS_EVALACION = array("contenido", "satisfaccion");

    public function __construct() {
        parent::__construct(new TallerDAO());
    }

    public function listarDetallesTalleres($tipoTaller = "") {
        $lista = array();
        foreach ($this->dao->listarTalleres($tipoTaller) as $taller) {
            $lista[] = $this->construirTaller($taller)->toArray();
        }
        return $lista;
    }

    private function construirTaller($rs): Taller {
        $nombre = $rs["nombreTaller"];
        $tipoTaller = isset($rs["tipoTallerDescripcion"]) ? Util::map($rs["idTipoTaller"], $rs["tipoTallerDescripcion"]) : $rs["tipoTaller"];
        $evaluacionHabilitada = $rs["evaluacionHabilitada"] ?? 0;
        $observaciones = $rs["observaciones"];
        $instructor = isset($rs["nombreInstructor"]) ? $this->construirInstructor($rs) : $rs["instructor"];
        $id = $rs["id"] ?? 0;
        return new Taller($nombre, $tipoTaller, $evaluacionHabilitada, $observaciones, $instructor, $id);
        //$taller->establecerTotalInscritos($this->dao->obtenerTotalInscritosPorTaller($taller->obtenerID()));
        //return $taller;
    }

    public function listarInstructores() {
        $rs = $this->dao->listarInstructores();
        $lista = array();
        foreach ($rs as $instructor) {
            array_push($lista, $this->construirInstructor($instructor)->toArray());
        }
        return $lista;
    }

    private function construirInstructor($rs): InstructorTaller {
        $id = $rs["idInstructor"] ?? 0;
        $nombre = $rs["nombreInstructor"];
        $apellidoPaterno = $rs["apellidoPaterno"];
        $apellidoMaterno = $rs["apellidoMaterno"];
        $correoElectronico = $rs["correoInstructor"];
        $telefono = $rs["telefonoInstructor"];
        $foto = Util::binToBase64($rs["fotografiaInstructor"]);
        return new InstructorTaller($nombre, $apellidoPaterno, $apellidoMaterno, $correoElectronico, $telefono, $foto, $id);
    }

    public function listarNombreTalleres() {
        return $this->dao->listarNombreTalleres();
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

    public function obtenerTipoTalleres() {
        return getAdminEtapaFormacion()->listarTiposEtapasFormacion();
    }

    public function eliminarInstructor($id) {
        return $this->dao->eliminarInstructor($id);
    }

    public function recuperarInstructor($id) {
        return $this->construirInstructor($this->dao->obtenerInstructorPorId($id))->toArray();
    }

    public function actualizarInstructor($instructor) {
        return $this->dao->actualizarInstructor($instructor);
    }

    public function agregarTaller(Taller $taller) {
        return $this->dao->agregarTaller($taller);
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

    public function actualizarTaller(array $formData) {
        $id = $formData['idTaller'];
        $nombre = $formData['nombreTaller'];
        $tipoTaller = $formData['tipoTaller'];
        $observaciones = $formData['observaciones'];
        $instructorId = $formData['instructor'];
        $evaluacionHabilitada = $formData['evaluacionHabilitada'] ?? 0;
        $taller = new Taller($nombre, $tipoTaller, $evaluacionHabilitada, $observaciones, $instructorId, $id);
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
