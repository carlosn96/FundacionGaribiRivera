<?php

namespace App\Models\LineaBase\Catalogos;

class RangoIngresoMensual extends CatalogBase
{
    public const INPUT_NAME_KEY = 'ingresoMensual';
    protected $table = 'linea_base_rango_ingreso_mensual';
    public $timestamps = false;
    protected $primaryKey = 'id_rango';
    protected $fillable = ['descripcion', 'medicion'];


    public static function getMessage(): string
    {
        return 'Rangos de ingreso mensual obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'rangos-ingreso-mensual';
    }
}