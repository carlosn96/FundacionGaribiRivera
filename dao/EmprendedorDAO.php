<?php

class EmprendedorDAO extends DAO
{

    private const NOMBRE_TABLA_EMPRENDEDOR = "usuario_emprendedor";
    private const VISTA_LISTADO_EMPRENDEDORES = "lista_emprendedores";
    private const INSERTAR_NUEVO = "INSERT INTO " . self::NOMBRE_TABLA_EMPRENDEDOR . " (id_usuario) VALUES(?)";
    private const INSERTAR_FOTOGRAFIAS_CASO = "INSERT INTO seguimiento_caso_lista_fotografias_caso VALUES (?,?)";
    private const GUARDAR_SEGUIMIENTO_CASO = "CALL guardar_seguimiento_caso(?, ?, ?)";
    private const RECUPERAR_SEGUIMIENTO_CASO = "SELECT * FROM recuperar_seguimiento_caso WHERE idLineaBase = ?";
    private const LISTAR_EMPRENDEDORES = "listar_emprendedores";
    private const LISTAR_EMPRENDEDORES_ETAPA = "listar_emprendedores_por_etapa";

    public function guardarSeguimientoCaso(SeguimientoCaso $seguimiento)
    {
        $prep = $this->prepararInstruccion(self::GUARDAR_SEGUIMIENTO_CASO);
        $prep->agregarInt($seguimiento->getIdLineaBase());
        //$prep->agregarString($seguimiento->getNumeroCaso()); //Campo sin utilidad
        $prep->agregarString($seguimiento->getObservacionesGenerales());
        //$prep->agregarJSON($seguimiento->getEtapasFormacion()); //Campo sin utilidad
        $prep->agregarJSON($seguimiento->getFotografiasCaso());
        return $prep->ejecutar();
    }

    public function recuperarSeguimientoCaso($idLineaBase)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_SEGUIMIENTO_CASO);
        $prep->agregarInt($idLineaBase);
        return $prep->ejecutarConsulta();
    }

    public function eliminarSeguimientoCaso($id)
    {
        return $this->eliminarPorId("seguimiento_caso", "id_seguimiento", $id);
    }

    public function eliminarImagenSeguimientoCaso($idImagen)
    {
        return $this->eliminarPorId("seguimiento_caso_lista_fotografias_caso", "id_fotografia", $idImagen);
    }

    public function insertarEmprendedor($nombre, $apellidos, $correo, $numeroCelular, $contrasena)
    {
        $daoUsuario = new UsuarioDAO();
        $id = $daoUsuario->insertarUsuario(
            $nombre,
            $apellidos,
            $correo,
            $numeroCelular,
            Util::encriptarContrasenia($contrasena),
            TipoUsuario::EMPRENDEDOR,
            file_get_contents(Util::obtenerFotografiaRand())
        );
        $stmt = $this->prepararInstruccion(self::INSERTAR_NUEVO);
        $stmt->agregarInt(intval($id));
        return $id && $stmt->ejecutar();
    }

    public function eliminarEmprendedor($id)
    {
        return $this->eliminarPorId("usuario", "id", $id);
    }

    public function listar()
    {
        return $this->listarEmprendedores(self::LISTAR_EMPRENDEDORES);
    }

    public function listarPorEtapa($idEtapa)
    {
        $where = "";
        if (is_array($idEtapa)) {
            if (count($idEtapa) > 0) {
                $ids = implode(",", array_map('intval', $idEtapa));
                $where = " WHERE id_etapa IN ($ids)";
            } else {
                // Si el array está vacío, no devolver ningún resultado.
                $where = " WHERE 1 = 0";
            }
        } else {
            $condicion = $idEtapa === '-' ? "IS NULL" : "= " . intval($idEtapa);
            $where = " WHERE id_etapa $condicion";
        }
        return $this->listarEmprendedores(self::LISTAR_EMPRENDEDORES_ETAPA . $where);
    }

    private function listarEmprendedores($tabla, $where = "")
    {
        return $this->selectPorCamposEspecificos("*", $tabla, $where, true);
    }

    public function eliminarMultipleEmprendedores(array $ids)
    {
        $ids = implode(",", $ids);
        $sql = "DELETE FROM usuario WHERE id IN ($ids)";
        return $this->ejecutarInstruccion($sql);
    }

    public function actualizarFechaGraduacion($graduado, $fechaGraduacion, $idEmprendedor)
    {
        $prep = $this->prepararInstruccion("UPDATE " . self::NOMBRE_TABLA_EMPRENDEDOR . " SET fecha_graduacion = ?, graduado = ? WHERE id_emprendedor = ?");
        $prep->agregarString($fechaGraduacion);
        $prep->agregarInt($graduado);
        $prep->agregarInt($idEmprendedor);
        return $prep->ejecutar();
    }
}