<?php

namespace App\Models\LineaBase\Catalogos;

class TiempoDedicaFormacion extends CatalogBase
{
    public const INPUT_NAME_KEY = 'tiempoCapacitacion';
    protected $table = 'linea_base_tiempo_capacitacion';
    public $timestamps = false;
    protected $primaryKey = 'id_tiempo';
    protected $fillable = ['descripcion'];
    public static function getMessage(): string
    {
        return 'Tiempos de dedicación a formación obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'tiempo-dedica-formacion';
    }
}