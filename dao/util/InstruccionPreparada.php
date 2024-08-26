<?php

class InstruccionPreparada {

    private const TIPOS_DATOS_PERMITIDOS = ["s", "i", "d", "b"];
    private const MODO_EJECUCION_SIN_RESULTSET = 0;
    private const MODO_EJECUCION_RESULTSET_UNA_FILA = 1;
    private const MODO_EJECUCION_RESULTSET_TODAS_FILAS = 2;

    private string $tipos;
    private array $valores;
    private array $blob;
    private mysqli_stmt $instruccionPreparada;

    function __construct(mysqli_stmt $instruccion) {
        $this->instruccionPreparada = $instruccion;
        $this->clear();
    }

    function clear() {
        $this->tipos = "";
        $this->valores = array();
        $this->blob = array();
    }

    function agregarString(string $valor) {
        $this->agregarParametro("s", $valor);
    }

    function agregarJSON(array $valor) {
        $this->agregarString(json_encode($valor));
    }

    function agregarEntidad(?object $valor) {
        try {
            if(is_null($valor)) {
                $this->agregarParametro("s", null);
            } else {
                $this->agregarJSON($valor->toArray());
            }
        } catch (Exception $e) {
            throw new Exception("El objeto pasado no es una Entidad");
        }
    }

    function agregarInt(int $valor) {
        $this->agregarParametro("i", $valor);
    }

    function agregarBoolean(bool $valor) {
        $this->agregarInt(intval($valor));
    }

    function agregarDouble(float $valor) {
        $this->agregarParametro("d", $valor);
    }

    function agregarBlob($valorBlob, $type = "") {
        $this->blob["numeroArgumento"] = strlen($this->tipos); //siguiente indice
        $this->blob["valor"] = $valorBlob;
        $this->agregarParametro("b", null);
        if (!empty($type)) {
            $this->agregarString($type);
        }
    }

    private function agregarParametro($tipo, $valor) {
        if (in_array($tipo, self::TIPOS_DATOS_PERMITIDOS)) {
            $this->tipos .= $tipo;
            $this->valores[] = $valor;
        } else {
            throw new Exception("Tipo de dato no permitido");
        }
    }

    private function compilar(int $modo) {
        $this->instruccionPreparada->bind_param($this->tipos, ...$this->valores);
        if (!empty($this->blob)) {
            $this->instruccionPreparada->send_long_data($this->blob["numeroArgumento"], $this->blob["valor"]);
        }
        $ejecucionCorrecta = $this->instruccionPreparada->execute();
        if ($ejecucionCorrecta && $modo !== self::MODO_EJECUCION_SIN_RESULTSET) {
            if (($resultado = $this->instruccionPreparada->get_result()) !== false) {
                return $modo === self::MODO_EJECUCION_RESULTSET_TODAS_FILAS ? $resultado->fetch_all(MYSQLI_ASSOC) ?? [] : $resultado->fetch_assoc() ?? [];
            }
        }
        return $ejecucionCorrecta;
    }

    function ejecutar(): bool {
        return $this->compilar(self::MODO_EJECUCION_SIN_RESULTSET);
    }

    /**
     * Obtener una fila de resultados como un array asociativo
     * <p>Devuelve un array asociativo que corresponde a la fila obtenida o <b><code>Array vacío</code></b> si no hay más filas.</p><p><b>Nota</b>: Los nombres de campo devueltos por esta función son <i>sensible a mayúsculas y minúsculas</i>.</p><p><b>Nota</b>: Esta función establece los campos NULL al valor <b><code>NULL</code></b> de PHP.</p>
     * @return array <p>Devuelve un array asociativo de strings que representa la fila obtenida en el conjunto de resultados, donde cada clave en el array representa el nombre de una de las columnas del conjunto de resultados o <b><code>NULL</code></b> si no hay más filas en el conjunto de resultados.</p><p>Si dos o más columnas del resultado tienen los mismos nombres de campo, la última columna tendrá precedencia. Para acceder a la(s) otra(s) columna(s) con el mismo nombre, debe acceder al resultado con índices numéricos mediante el uso de <code>mysqli_fetch_row()</code> o agregar alias a los nombres.</p>
     * @link http://php.net/manual/es/mysqli-result.fetch-assoc.php
     * @see mysqli_fetch_array(), mysqli_fetch_row(), mysqli_fetch_object(), mysqli_query(), mysqli_data_seek()
     */
    public function ejecutarConsulta(): array {
        return $this->compilar(self::MODO_EJECUCION_RESULTSET_UNA_FILA);
    }

    /**
     * Obtiene todas las filas de resultados como un array asociativo, un array numérico o ambos
     * <p><b>mysqli_fetch_all()</b> obtiene todas las filas de resultados y devuelve el conjunto de resultados como un array asociativo, un array numérico o ambos.</p>
     * @param int $resulttype <p>Este parámetro opcional es una constante que indica qué tipo de array debe producirse a partir de los datos de la fila actual. Los valores posibles para este parámetro son las constantes <b><code>MYSQLI_ASSOC</code></b>, <b><code>MYSQLI_NUM</code></b> o <b><code>MYSQLI_BOTH</code></b>.</p>
     * @return mixed <p>Devuelve un array de arrays asociativos que contienen las filas de resultados.</p>
     * @link http://php.net/manual/es/mysqli-result.fetch-all.php
     * @see mysqli_fetch_array(), mysqli_query()
     */
    public function ejecutarConsultaMultiple(): array {
        return $this->compilar(self::MODO_EJECUCION_RESULTSET_TODAS_FILAS);
    }
}
