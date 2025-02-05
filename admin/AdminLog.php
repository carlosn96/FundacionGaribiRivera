<?php

class AdminLog extends Admin {

    public function __construct() {
        parent::__construct(new LogDAO());
    }
    
    public function getLogEmprendedores() {
       //return log que sean relacionados con emprendedores
    }
    
    public function crearlog(int $usuario, $msg) {
        
    }

}
