<?php

class Emprendedor extends Usuario {

    private $id_emprendedor;

    public function __construct($nombre_completo, $telefono, $contrasenia, $id_emprendedor = 0) {
        parent::__construct($nombre_completo, $telefono, $contrasenia, TipoUsuario::EMPRENDEDOR);
        $this->id_emprendedor = $id_emprendedor;
    }

    public function to_array() {
        $parent = parent::to_array();
        return array_merge($parent, get_object_vars($this));
    }

}
