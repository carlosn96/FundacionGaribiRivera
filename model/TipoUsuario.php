<?php

class TipoUsuario
{

    public const ENCARGADO_CREDITO_COBRANZA = 6;
    public const COORDINADOR_EMPRENDIMIENTO = 5;
    public const ADMINISTRADOR_GENERAL = 4;
    public const TRABABAJOR_SOCIAL = 3;
    public const AUXILIAR_DIFUSION = 2;
    public const EMPRENDEDOR = 1;

    private const ASISTENTE_ADMINISTRATIVO = ["rol" => "Asistente Administrativo", "url" => "dashboard"];

    private static $tiposUsuario = [
        self::EMPRENDEDOR => ["rol" => "Emprendedor", "url" => "emprendedor"],
        self::AUXILIAR_DIFUSION => self::ASISTENTE_ADMINISTRATIVO,
        self::TRABABAJOR_SOCIAL => self::ASISTENTE_ADMINISTRATIVO,
        self::ADMINISTRADOR_GENERAL => self::ASISTENTE_ADMINISTRATIVO,
        self::COORDINADOR_EMPRENDIMIENTO => self::ASISTENTE_ADMINISTRATIVO,
        self::ENCARGADO_CREDITO_COBRANZA => self::ASISTENTE_ADMINISTRATIVO
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
