<?php

namespace App\Models;

class TipoUsuario
{

    public const ENCARGADO_CREDITO_COBRANZA = 6;
    public const COORDINADOR_EMPRENDIMIENTO = 5;
    public const ADMINISTRADOR_GENERAL = 4;
    public const TRABAJADOR_SOCIAL = 3;
    public const AUXILIAR_DIFUSION = 2;
    public const EMPRENDEDOR = 1;

    private static $tiposUsuario = [
        self::EMPRENDEDOR => ["rol" => "Emprendedor"],
        self::AUXILIAR_DIFUSION => ["rol" => "Aux. Difusión"],
        self::TRABAJADOR_SOCIAL => ["rol" => "Trabajador Social"],
        self::ADMINISTRADOR_GENERAL => ["rol" => "Adm. General"],
        self::COORDINADOR_EMPRENDIMIENTO => ["rol" => "Coord. Emprendimiento"],
        self::ENCARGADO_CREDITO_COBRANZA => ["rol" => "Encargado Crédito y Cobranza"]
    ];

    public static function get($tipo)
    {
        return self::$tiposUsuario[$tipo] ?? 'Desconocido';
    }
}
