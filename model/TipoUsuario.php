<?php

class TipoUsuario
{

    public const ENCARGADO_CREDITO_COBRANZA = 6;
    public const COORDINADOR_EMPRENDIMIENTO = 5;
    public const ADMINISTRADOR_GENERAL = 4;
    public const TRABABAJOR_SOCIAL = 3;
    public const AUXILIAR_DIFUSION = 2;
    public const EMPRENDEDOR = 1;

    private static $tiposUsuario = [
        self::EMPRENDEDOR => ["rol" => "Emprendedor", "url" => "emprendedor"],
        self::AUXILIAR_DIFUSION => ["rol" => "Aux. Difusión", "url" => "difusion"],
        self::TRABABAJOR_SOCIAL => ["rol" => "Trabajador Social", "url" => "trabajoSocial"],
        self::ADMINISTRADOR_GENERAL => ["rol" => "Adm. General", "url" => "administracionGeneral"],
        self::COORDINADOR_EMPRENDIMIENTO => ["rol" => "Coord. Emprendimiento", "url" => "emprendimiento"],
        self::ENCARGADO_CREDITO_COBRANZA => ["rol" => "Encargado Crédito y Cobranza", "url" => "cobranza"]
    ];

    public static function get($tipo)
    {
        return self::$tiposUsuario[$tipo] ?? 'Desconocido';
    }
    public static function getAllUserRoles()
    {
        return array_map(function($tipoUsuario) {
            return $tipoUsuario['rol'];
        }, self::$tiposUsuario);
    }

}
