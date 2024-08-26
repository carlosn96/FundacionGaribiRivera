<?php

class TallerDAO extends DAO {

    private const LISTAR_TALLERES = "SELECT * FROM listar_talleres";
    private const LISTAR_NOMBRE_TALLERES = "SELECT id_taller id, CONCAT(nombre_taller, ' (', tipo_taller_descripcion, ')') nombre FROM listar_talleres";

    function listarTalleres($tipoTaller) {
        $instruccion = self::LISTAR_TALLERES . (empty($tipoTaller) ?
                "" : "  WHERE taller.id_tipo_taller = " . $tipoTaller . " ORDER BY nombre");
        return $this->ejecutarInstruccion($instruccion)->fetch_all(MYSQLI_ASSOC);
    }
    
    function listarNombreTalleres() {
        return $this->ejecutarInstruccion(self::LISTAR_NOMBRE_TALLERES)->fetch_all(MYSQLI_ASSOC);
    }

}
