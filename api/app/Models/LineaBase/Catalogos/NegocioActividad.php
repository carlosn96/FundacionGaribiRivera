<?php

namespace App\Models\LineaBase\Catalogos;

class NegocioActividad extends CatalogBase
{
    public const INPUT_NAME_KEY = 'actividadNegocio';
    // Table for business activity (actividad de tu negocio)
    protected $table = 'linea_base_giro_negocio';
    public $timestamps = false;
    protected $primaryKey = 'id_giro';
    protected $fillable = ['descripcion'];

    public static function getMessage(): string
    {
        return 'Actividades de negocio obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'actividades-negocio';
    }
}