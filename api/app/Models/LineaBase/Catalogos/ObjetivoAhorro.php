<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class ObjetivoAhorro extends CatalogBase
{
    public const INPUT_NAME_KEY = 'objetivosAhorro';
    protected $table = 'linea_base_objetivo_ahorros';
    public $timestamps = false;
    protected $primaryKey = 'id_objetivo';
    protected $fillable = ['descripcion', 'medicion'];
    public static function getMessage(): string
    {
        return 'Objetivos de ahorro obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'objetivos-ahorro';
    }
}