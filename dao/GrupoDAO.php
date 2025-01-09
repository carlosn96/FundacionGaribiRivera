<?php

class GrupoDAO extends DAO {

    private const NOMBRE_TABLA = "grupo";
    private const INSERTAR = "INSERT INTO " . self::NOMBRE_TABLA . " (clave, seudonimo, id_carrera, id_plantel) VALUES (?, ?, ?, ?)";
    private const LISTAR = "SELECT * FROM " . self::NOMBRE_TABLA;

    public function agregar(Grupo $grupo) {
        $pre = new PreparedStatmentArgs();
        $pre->add("s", $grupo->getClave());
        $pre->add("s", $grupo->getSeudonimo());
        $pre->add("i", $grupo->getCarrera());
        $pre->add("i", $grupo->getPlantel());
        return $this->ejecutar_instruccion_preparada(self::INSERTAR, $pre);
    }

    public function listar_grupos($carrera, $plantel) {
        $where = " WHERE id_carrera = $carrera AND id_plantel = $plantel";
        return $this->ejecutar_instruccion(self::LISTAR . "  " . $where)->fetch_all(MYSQLI_ASSOC);
    }

    public function eliminar($id) {
        return $this->eliminar_por_id(self::NOMBRE_TABLA, "id_grupo", $id);
    }
}
