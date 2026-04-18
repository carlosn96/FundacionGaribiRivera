<?php

namespace App\Models\LineaBase\Catalogos;

class EstadoCivil extends CatalogBase
{
    public const INPUT_NAME_KEY = 'estadoCivil';
    protected $table = 'linea_base_estado_civil';
    protected $primaryKey = 'id_estado_civil';
    protected $fillable = ['descripcion'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Estados civiles obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'estados-civiles';
    }
}