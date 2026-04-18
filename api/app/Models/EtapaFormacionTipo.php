<?php

namespace App\Models;

use App\Models\LineaBase\Catalogos\CatalogBase;

class EtapaFormacionTipo extends CatalogBase
{
    protected $table = 'etapa_formacion_tipo';
    protected $primaryKey = 'id_tipo';
    public $timestamps = false;
    protected $fillable = ['descripcion'];

    public static function getMessage(): string
    {
        return 'Tipos de etapa de formación obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'tipos-etapa-formacion';
    }
}
