<?php

namespace App\Models\LineaBase\Catalogos;

class NegocioGiro extends CatalogBase
{
    public const INPUT_NAME_KEY = 'giroNegocio';
    // Table for business sector/type (giro del negocio)
    protected $table = 'linea_base_giro_negocio_tipo';
    public $timestamps = false;

    protected $primaryKey = 'id_tipo_giro';
    protected $fillable = ['descripcion'];

    public static function getMessage(): string
    {
        return 'Giros de negocio obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'giros-negocio';
    }
}