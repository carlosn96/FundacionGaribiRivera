<?php

class CicloEscolarDAO extends DAO {

    private const NOMBRE_TABLA = "ciclo_escolar";
    private const INSERTAR = "INSERT INTO " . self::NOMBRE_TABLA . " (ciclo_escolar) VALUES (?)";
    private const LISTAR = "SELECT * FROM " . self::NOMBRE_TABLA;

    public function agregar(CicloEscolar $plantel) {
        $pre = new PreparedStatmentArgs();
        $pre->add("s", $plantel->getNombre());
        return $this->ejecutar_instruccion_preparada(self::INSERTAR, $pre);
    }

    public function recuperar_listado($where = "") {
        return $this->ejecutar_instruccion(self::LISTAR . "  " . $where)->fetch_all(MYSQLI_ASSOC);
    }

    public function eliminar($id) {
        return $this->eliminar_por_id(self::NOMBRE_TABLA, "id_ciclo_escolar", $id);
    }
}
