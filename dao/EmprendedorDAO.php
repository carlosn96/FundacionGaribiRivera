<?php

class EmprendedorDAO extends DAO {

    private const NOMBRE_TABLA_EMPRENDEDOR = "usuario_emprendedor";
    private const VISTA_LISTADO_EMPRENDEDORES = "lista_emprendedores";
    private const INSERTAR_NUEVO = "INSERT INTO " . self::NOMBRE_TABLA_EMPRENDEDOR . " (id_usuario) VALUES(?)";
    private const INSERTAR_FOTOGRAFIAS_CASO = "INSERT INTO seguimiento_caso_lista_fotografias_caso VALUES (?,?)";
    private const GUARDAR_SEGUIMIENTO_CASO = "CALL guardar_seguimiento_caso(?, ?, ?, ?, ?)";
    private const RECUPERAR_SEGUIMIENTO_CASO = "SELECT * FROM recuperar_seguimiento_caso WHERE idLineaBase = ?";

    public function guardarSeguimientoCaso(SeguimientoCaso $seguimiento) {
        $prep = $this->prepararInstruccion(self::GUARDAR_SEGUIMIENTO_CASO);
        $prep->agregarInt($seguimiento->getIdLineaBase());
        $prep->agregarString($seguimiento->getNumeroCaso());
        $prep->agregarString($seguimiento->getObservacionesGenerales());
        $prep->agregarJSON($seguimiento->getEtapasFormacion());
        $prep->agregarJSON($seguimiento->getFotografiasCaso());
        return $prep->ejecutar();
    }

    public function recuperarSeguimientoCaso($idLineaBase) {
        $prep = $this->prepararInstruccion(self::RECUPERAR_SEGUIMIENTO_CASO);
        $prep->agregarInt($idLineaBase);
        return $prep->ejecutarConsulta();
    }

    public function eliminarSeguimientoCaso($id) {
        return $this->eliminarPorId("seguimiento_caso", "id_seguimiento", $id);
    }
    
    public function listar() {
        return getAdminUsuario()->listarEmprendedores();
    }

}
