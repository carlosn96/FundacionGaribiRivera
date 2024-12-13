<?php

class AdminFactory {

    private static $instances = [];

    public static function getAdminEvaluacionFormacion(): AdminEvaluacionFormacion {
        return self::getOrCreateInstance(AdminEvaluacionFormacion::class);
    }

    public static function getAdminLineaBase(): AdminLineaBase {
        return self::getOrCreateInstance(AdminLineaBase::class);
    }

    public static function getAdminMailer(): AdminMailer {
        return self::getOrCreateInstance(AdminMailer::class);
    }

    public static function getAdminEmprendedor(): AdminEmprendedor {
        return self::getOrCreateInstance(AdminEmprendedor::class);
    }

    public static function getAdminEtapaFormacion(): AdminEtapaFormacion {
        return self::getOrCreateInstance(AdminEtapaFormacion::class);
    }

    public static function getAdminUsuario(): AdminUsuario {
        return self::getOrCreateInstance(AdminUsuario::class);
    }

    public static function getAdminTaller(): AdminTaller {
        return self::getOrCreateInstance(AdminTaller::class);
    }

    public static function getAdminVisitaSeguimiento(): AdminVisitaSeguimiento {
        return self::getOrCreateInstance(AdminVisitaSeguimiento::class);
    }
    
    public static function getAdminImpacto(): AdminImpacto {
        return self::getOrCreateInstance(AdminImpacto::class);
    }

    private static function getOrCreateInstance(string $class): Admin {
        if (!isset(self::$instances[$class])) {
            self::$instances[$class] = new $class();
        }
        return self::$instances[$class];
    }

}
