<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Municipio extends CatalogBase
{
    public const INPUT_NAME_KEY = 'municipios';
    protected $table = 'linea_base_municipio';

    protected $primaryKey = 'id_municipio';
    protected $fillable = ['nombre', 'id_estado'];


    public $timestamps = false;

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'id_estado');
    }

    public function codigosPostales()
    {
        return $this->hasMany(CodigoPostal::class, 'id_municipio');
    }

    public static function getRelationships(): array
    {
        return ['estado'];
    }

    public static function getMessage(): string
    {
        return 'Municipios obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'municipios';
    }
}