<?php

namespace App\Models\LineaBase\Catalogos;

class SolicitaCredito extends CatalogBase
{
    public const INPUT_NAME_KEY = 'solicitaCredito';
    protected $table = 'linea_base_solicita_credito';
    public $timestamps = false;
    protected $primaryKey = 'id_solicitud';
    protected $fillable = ['descripcion'];

    public static function getMessage(): string
    {
        return 'Opciones de solicita crédito obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'solicita-credito';
    }
}