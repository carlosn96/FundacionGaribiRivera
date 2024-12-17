<?php

include_once '../../loader.php';

class GenericInsert extends DAO {

    function agregarUsuario($nombre, $apellidos, $correo, $celular) {
        return getAdminUsuario()->insertarUsuario($nombre, $apellidos, $correo,
                        $numero_celular, "123",
                        TipoUsuario::EMPRENDEDOR) ? $this->obtenerIdAutogenerado() : 0;
    }
    
    
    function insertarLineaBaseInicial($data) {
        $data["idEtapa"] = 23;
        $nombre = $data["nombre"];
        $apellidos = $data["apellido"];
        $correo = $data["correo"];
        $celular = $data["celular"];
        $data["idUsuario"] = $this->agregarUsuario($nombre, $apellidos, $correo, $celular);

        getAdminLineaBase()->guardarLineaBase($data);
    }
}
