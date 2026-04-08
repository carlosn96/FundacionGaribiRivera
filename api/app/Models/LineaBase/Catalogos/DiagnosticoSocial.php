<?php

namespace App\Models\LineaBase\Catalogos;

class DiagnosticoSocial extends CatalogBase
{
    public const INPUT_NAME_KEY = 'diagnostico_social';
    protected $table = 'cat_diagnosticos_sociales';
    protected $primaryKey = 'id_diagnostico_social';
    protected $fillable = ['descripcion', 'valor_referencia'];
    public $timestamps = false;

    public static function getMessage(): string
    {
        return 'Catálogo de diagnósticos sociales obtenido';
    }

    public static function getCatalogType(): string
    {
        return 'diagnostico-social';
    }
}
