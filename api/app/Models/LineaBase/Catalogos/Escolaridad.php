<?php

namespace App\Models\LineaBase\Catalogos;

class Escolaridad extends CatalogBase
{
    public const INPUT_NAME_KEY = 'escolaridad';
    protected $table = 'linea_base_escolaridad';
    protected $primaryKey = 'id_escolaridad';
    protected $fillable = ['descripcion'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Escolaridades obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'escolaridades';
    }
}