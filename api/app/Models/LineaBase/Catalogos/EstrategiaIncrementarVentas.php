<?php

namespace App\Models\LineaBase\Catalogos;

class EstrategiaIncrementarVentas extends CatalogBase
{
    public const INPUT_NAME_KEY = 'estrategiasIncrementarVentas';
    protected $table = 'linea_base_estrategias_incrementar_ventas';
    protected $primaryKey = 'id_estrategia';
    protected $fillable = ['descripcion', 'icon'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Estrategias para incrementar ventas obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'estrategias-incrementar-ventas';
    }
}