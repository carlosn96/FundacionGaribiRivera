<?php

namespace App\Models\LineaBase\Catalogos;

class MedioConocimiento extends CatalogBase
{
    public const INPUT_NAME_KEY = 'medioConocimiento';
    protected $table = 'linea_base_medio_conocimiento';
    public $timestamps = false;
    protected $primaryKey = 'id_medio';
    protected $fillable = ['descripcion', 'icon'];


    public static function getMessage(): string
    {
        return 'Medios de conocimiento obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'medios-conocimiento';
    }
}