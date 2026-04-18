<?php

namespace App\Models\LineaBase\Catalogos;

class UtilizaCredito extends CatalogBase
{
    public const INPUT_NAME_KEY = 'utilizaCredito';
    protected $table = 'linea_base_utiliza_credito';
    public $timestamps = false;
    protected $primaryKey = 'id_utilidad';
    protected $fillable = ['descripcion'];

    public static function getMessage(): string
    {
        return 'Opciones de utiliza crédito obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'utiliza-credito';
    }
}