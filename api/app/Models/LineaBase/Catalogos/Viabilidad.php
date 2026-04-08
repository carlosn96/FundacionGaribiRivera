<?php

namespace App\Models\LineaBase\Catalogos;

class Viabilidad extends CatalogBase
{
    public const INPUT_NAME_KEY = 'viabilidad';
    protected $table = 'cat_viabilidades';
    protected $primaryKey = 'id_viabilidad';
    protected $fillable = ['descripcion'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Catálogo de viabilidades obtenido';
    }

    public static function getCatalogType(): string
    {
        return 'viabilidades';
    }
}
