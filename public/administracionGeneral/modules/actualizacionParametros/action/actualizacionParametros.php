<?php

require_once '../../../includes.php';

define("ESTADO_CIVIL", "info_usuario_estado_civil");
define("MEDIO_CONOCIO_FUNDACION", "interesado_ficha_inscripcion_medio_conocio_fundacion");
define("GRADO_ESTUDIOS", "info_usuario_grado_estudios");
define("TIPO_ASENTAMIENTO", "domicilio_tipo_asentamiento");
define("OCUPACION_ACTUAL", "interesado_ficha_inscripcion_ocupacion_actual");
define("UTILIDAD_CREDITO", "interesado_ficha_inscripcion_utilidad_credito");
define("ESTRATEGIA_VENTAS", "interesado_ficha_inscripcion_estrategias_ventas");
define("CONDICION_VIVIENDA", "estudio_socioeconomico_condicion_vivienda");
define("TIPO_VIVIENDA", "estudio_socioeconomico_tipo_vivienda");
define("UTILIZACION_VIVIENDA", "estudio_socioeconomico_uso_vivienda");
define("VIVIENDA_PARA", "estudio_socioeconomico_familia_habitante");
define("VENTAJAS_COMPETENCIA", "estudio_socioeconomico_ventajas_sobre_competencia");
define("VULNERABILIDAD", "estudio_socioeconomico_vulnerabilidad");
define("PARROQUIA", "directorio_arquidiocesis_comunidad_parroquial");
define("DECANATO", "directorio_arquidiocesis_decanato");
define("VICARIA", "directorio_arquidiocesis_vicaria");

class GenericDAO extends DAO {

    const MAP = [
        "EstadoCivil" => ["tabla" => ESTADO_CIVIL, "columnaData" => "estado_civil", "columnaID" => "id_estado_civil"],
        "MedioConocimiento" => ["tabla" => MEDIO_CONOCIO_FUNDACION, "columnaData" => "descripcion", "columnaID" => "id_medio"],
        "GradoEstudios" => ["tabla" => GRADO_ESTUDIOS, "columnaData" => "grado_estudios", "columnaID" => "id_grado_estudios"],
        "TipoAsentamiento" => ["tabla" => TIPO_ASENTAMIENTO, "columnaData" => "tipo", "columnaID" => "id_tipo_asentamiento"],
        "OcupacionActual" => ["tabla" => OCUPACION_ACTUAL, "columnaData" => "descripcion", "columnaID" => "id_ocupacion"],
        "UtilidadCredito" => ["tabla" => UTILIDAD_CREDITO, "columnaData" => "utilidad", "columnaID" => "id_utilidad"],
        "EstrategiaVentas" => ["tabla" => ESTRATEGIA_VENTAS, "columnaData" => "descripcion", "columnaID" => "id_estrategia"],
        "CondicionVivienda" => ["tabla" => CONDICION_VIVIENDA, "columnaData" => "descripcion", "columnaID" => "id_condicion_vivienda"],
        "UtilizacionVivienda" => ["tabla" => UTILIZACION_VIVIENDA, "columnaData" => "descripcion", "columnaID" => "id_uso_vivienda"],
        "TipoVivienda" => ["tabla" => TIPO_VIVIENDA, "columnaData" => "descripcion", "columnaID" => "id_tipo_vivienda"],
        "ViviendaPara" => ["tabla" => VIVIENDA_PARA, "columnaData" => "descripcion", "columnaID" => "id_familia_habitante"],
        "VentajasCompetencia" => ["tabla" => VENTAJAS_COMPETENCIA, "columnaData" => "descripcion", "columnaID" => "id_ventaja"],
        "Vulnerabilidad" => ["tabla" => VULNERABILIDAD, "columnaData" => "descripcion", "columnaID" => "id_vulnerabilidad"],
            /* ,
              "Vicaria" => ["tabla" => VICARIA, "columnaData" => "nombre", "columnaID" => "id_vicaria"],
              "Decanato" => ["tabla" => DECANATO, "columnaData" => "nombre", "columnaID" => "id_decanato"],
              "ComunidadParroquial" => ["tabla" => PARROQUIA, "columnaData" => "nombre", "columnaID" => "id_comunidad"] */
    ];
    const INFO_PARROQUIAL = [
        "parroquia" => ["tabla" => PARROQUIA, "columnaData" => "descripcion", "columnaID" => "id_ventaja"],
        "decanato" => ["tabla" => VICARIA, "columnaData" => "descripcion", "columnaID" => "id_ventaja"],
    ];

    function insertarCampo($campo, $tipoCampo) {
        $tipo = $this::MAP[$tipoCampo];
        $tabla = $tipo["tabla"];
        $column = $tipo["columnaData"];
        $args = [["s", $campo]];
        $instruccion = "INSERT INTO $tabla ($column) VALUES (?)";
        return $this->ejecutarInstruccionPrep($instruccion, $args);
    }

    function eliminarCampo($id, $tipoCampo) {
        $tipo = $this::MAP[$tipoCampo];
        $table = $tipo["tabla"];
        $column = $tipo["columnaID"];
        return $this->ejecutarEliminarID($table, $column, $id);
    }

    function actualizarCampo($id, $tipoCampo, $data) {
        $tipo = $this::MAP[$tipoCampo];
        $table = $tipo["tabla"];
        $columnData = $tipo["columnaData"];
        $columnID = $tipo["columnaID"];
        $args = [
            ["s", $data], ["i", $id]
        ];
        return $this->ejecutarUpdateID($table, $columnData, $columnID, $args);
    }

}

$dao = new GenericDAO();
$adminInteresado = getAdminInteresado();
$adminTrabajoSocial = getAdminTrabajoSocial();

switch ($_POST["case"]) {
    case "recuperarCamposFicha":
        mostrarResultados(recuperarCamposFicha());
        break;
    case "actualizar":
        actualizarCampo();
        break;
    case "inserta":
        insertarCampo();
        break;
    case "eliminar":
        eliminarCampo();
        break;
    default :
        mostrarResultados(OPERACION_INCOMPLETA);
}

function mostrarResultados($rs) {
    echo json_encode($rs);
}

function recuperarCamposFicha() {

    $campos = array();
    foreach (GenericDAO::MAP as $key => $data) {
        $campos += [$key => crearSelector($key, recuperarListado($data["tabla"]))];
    }
    return $campos;

    /*
      return [
      "MedioConocimiento" => crearSelector("MedioConocimiento", recuperarListado(MEDIO_CONOCIO_FUNDACION)),
      "EstadoCivil" => recuperarListado(ESTADO_CIVIL),
      "GradoEstudios" => recuperarListado(GRADO_ESTUDIOS),
      "TipoAsentamiento" => recuperarListado(TIPO_ASENTAMIENTO), //,
      "OcupacionActual" => recuperarListado(OCUPACION_ACTUAL),
      "UtilidadCredito" => recuperarListado(UTILIDAD_CREDITO),
      "EstrategiaVentas" => recuperarListado(ESTRATEGIA_VENTAS)
      "GiroNegocio" => recuperarListado(
      "interesado_ficha_inscripcion_giro_negocio giro",
      "giro.id_giro, CONCAT(giro.descripcion, ' (', clasificacion.descripcion, ')')",
      "JOIN interesado_ficha_inscripcion_giro_negocio_clasificacion clasificacion ON giro.id_clasificacion_giro = clasificacion.id_clasificacion ORDER BY giro.descripcion")
      ]; */
}

function insertarCampo() {
    mostrarResultados(dao()->insertarCampo($_POST["campo"], $_POST["tipoCampo"]) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA);
}

function eliminarCampo() {
    mostrarResultados(dao()->eliminarCampo($_POST["idElemento"], $_POST["tipoCampo"]) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA);
}

function actualizarCampo() {
    mostrarResultados(dao()->actualizarCampo($_POST["idElemento"], $_POST["tipoCampo"], $_POST["data"]) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA);
}

function actualizarEstadoCivil() {
    mostrarResultados(dao()->actualizarEstadoCivil($_POST["data"], $_POST["idElemento"]));
}

function actualizarMedioConocimiento() {
    mostrarResultados(dao()->actualizarMedioConocimiento($_POST["data"], $_POST["idElemento"]));
}

function recuperarListado($tabla, $seleccion = "*", $where = "") {
    return dao()->seleccionarListadoCamposEspecificos($seleccion, $tabla, $where);
}

function adminInteresado(): AdminInteresado {
    return $GLOBALS["adminInteresado"];
}

function adminAsistente(): AdminTrabajoSocial {
    return $GLOBALS["adminTrabajoSocial"];
}

function dao(): GenericDAO {
    return $GLOBALS["dao"];
}
