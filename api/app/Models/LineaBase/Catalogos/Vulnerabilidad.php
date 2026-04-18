<?php

namespace App\Models\LineaBase\Catalogos;

class Vulnerabilidad extends CatalogBase
{
    public const INPUT_NAME_KEY = 'vulnerabilidad';
    protected $table = 'cat_vulnerabilidades';
    protected $primaryKey = 'id_vulnerabilidad';
    protected $fillable = ['descripcion'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Catálogo de niveles de vulnerabilidad obtenido';
    }

    public static function getCatalogType(): string
    {
        return 'vulnerabilidades';
    }
}
