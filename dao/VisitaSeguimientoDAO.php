<?php

class VisitaSeguimientoDAO extends DAO {

    private const LISTAR_VISITAS_SEGUIMIENTO_SIMPLE = "SELECT id_resultado_visita, fecha_realizacion FROM listar_visitas_seguimiento WHERE id_emprendedor=?";

    function listadoSimpleVisitaSeguimiento($idEmprendedor) {
        return $this->selectAllPorId(self::LISTAR_VISITAS_SEGUIMIENTO_SIMPLE, $idEmprendedor);
    }

}
