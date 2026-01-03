<?php

namespace App\Models\LineaBase\Catalogos;

class Ocupacion extends CatalogBase
{
    public const INPUT_NAME_KEY = 'ocupacionActual';
    protected $table = 'linea_base_ocupacion';
    public $timestamps = false;
    protected $primaryKey = 'id_ocupacion';
    protected $fillable = ['descripcion'];
    
    public static function getMessage(): string
    {
        return 'Ocupaciones obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'ocupaciones';
    }
}