<?php

class TipoUsuario {

    public const ADMINISTRADOR_GENERAL = 3;
    public const ADMINISTRADOR_PROYECTOS = 2;
    public const EMPRENDEDOR = 1;

    private static $tiposUsuario = [
        self::EMPRENDEDOR => ["rol" => "Emprendedor", "url" => "emprendedor"],
        self::ADMINISTRADOR_PROYECTOS => ["rol" => "Adm. Proyectos", "url" => "administradorProyectos"],
        self::ADMINISTRADOR_GENERAL => ["rol" => "Adm. General", "url" => "administradorGeneral"],
    ];

    public static function get($tipo) {
        return self::$tiposUsuario[$tipo] ?? 'Desconocido';
    }

}
