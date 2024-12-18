<?php

include_once '../../loader.php';
include './usuarios.php';

class GenericInsert extends DAO {

    function agregarUsuario($tupla) {
        $nombre = $tupla["nombre"];
        $apellidos = $tupla["apellidos"];
        $correo = $tupla["correo"];
        $celular = $tupla["celular"];

        return getAdminUsuario()->insertarUsuario($nombre, $apellidos, $correo,
                        $celular, "123",
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
/*
$genericInsert = new GenericInsert;

foreach ($usuarios as $tupla) {
    echo $tupla["nombre"] . " " . ($genericInsert->agregarUsuario($tupla) ? "insertado con exito" : " error ") . "<br>";
}*/


var_dump($usuarios);