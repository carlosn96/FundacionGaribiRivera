<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class EmpleoGanancia extends CatalogBase
{
    protected $table = 'linea_base_empleo_ganancias';
    protected $primaryKey = 'id_empleo';
    protected $fillable = ['descripcion', 'icon', 'medicion'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Empleos de ganancias obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'empleos-ganancias';
    }
    
    public const INPUT_NAME_KEY = 'comoEmpleaGanancias';
}