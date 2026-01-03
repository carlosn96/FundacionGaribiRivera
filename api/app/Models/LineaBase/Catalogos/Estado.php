<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Estado extends CatalogBase
{
    const INPUT_NAME_KEY = 'estados';
    protected $table = 'linea_base_estado';
    protected $primaryKey = 'id_estado';
    protected $fillable = ['nombre', 'abreviatura'];
    public $timestamps = false;

    public function municipios()
    {
        return $this->hasMany(Municipio::class, 'id_estado');
    }

    public static function getRelationships(): array
    {
        return ['municipios'];
    }

    public static function getMessage(): string
    {
        return 'Estados obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'estados';
    }
}