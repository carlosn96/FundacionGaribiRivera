<?php

include_once '../../../../loader.php';

class CodigosDAO {

    private $conexion;

    public function __construct() {
        $this->conexion = new Conexion();
    }

    const TABLA = "linea_base_cpostal";
    const ENCONTRAR_ID_MUNICIPIO = "SELECT lm.id_municipio
FROM linea_base_municipio lm
JOIN linea_base_estado le ON lm.id_estado = le.id_estado
WHERE lm.nombre = ? 
  AND le.nombre = ?";
    const INSERTAR_CODIGO_POSTAL = "INSERT INTO linea_base_cpostal (`id_municipio`, `codigo_postal`, `colonia`) VALUES (?,?,?)";

    public function encontrarMunicipio($nombreMunicipio, $nombreEstado) {
        $prep = $this->prepararInstruccion(self::ENCONTRAR_ID_MUNICIPIO);
        $prep->agregarString($nombreMunicipio);
        $prep->agregarString($nombreEstado);
        $result = $prep->ejecutarConsulta();
        return $result ? $result["id_municipio"] : -1;
    }

    public function insertarCodigoPostal($codigoPostal, $idMunicipio, $colonia) {
        $prep = $this->prepararInstruccion(self::INSERTAR_CODIGO_POSTAL);
        $prep->agregarInt($idMunicipio);
        $prep->agregarString($codigoPostal);
        $prep->agregarString($colonia);
        return $prep->ejecutar();
    }

    public function getError() {
        return $this->conexion->errorInfo();
    }

    protected function prepararInstruccion($instruccion): InstruccionPreparada {
        return new InstruccionPreparada($this->conexion->prepararInstruccion($instruccion));
    }

}

$dao = new CodigosDAO();

$directorio = "codigosPostales";

$files = ["aguascalientes", "colima", "jalisco", "nayarit", "nuevo_leon"];

$total = 0;

foreach ($files as $file) {
    include "$directorio/$file.php";
    $estado = $estados["$file"];
    $totalPorEstado = count($estado);
    $i = 0;
    $contador = 1;
    foreach ($estado as $registro) {
        $cp = $registro["val0"];
        $colonia = $registro["val3"];
        $mpio = $registro["val4"];
        $estado = $registro["val5"];
        if (($idMunicipio = $dao->encontrarMunicipio($mpio, $estado)) !== -1) {
            if ($dao->insertarCodigoPostal($cp, $idMunicipio, $colonia)) {
                echo "$contador. Se inserto " . $colonia . "<br>";
                $i++;
            } else {
                echo "$contador. EL CODIGO $cp DE LA COLONIA " . $colonia . "en $estado NO PUDO SER INSERTADO<br>";
                var_dump($dao->getError());
            }
        }
        $contador++;
    }

    echo "$file tiene " . $totalPorEstado . "<br>";
    echo "Se insertaron $i de " . $totalPorEstado . "<br>";
    $total += $totalPorEstado;
}


echo "<h1> En total=$total </h1>";
