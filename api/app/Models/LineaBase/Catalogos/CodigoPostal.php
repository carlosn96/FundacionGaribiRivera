<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\Municipio;

class CodigoPostal extends CatalogBase
{
    const INPUT_NAME_KEY = 'codigosPostales';
    protected $table = 'linea_base_cpostal';
    public $timestamps = false;

    protected $primaryKey = 'id_codigo';
    protected $fillable = ['id_municipio', 'codigo_postal', 'colonia'];

    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio');
    }

    public static function getRelationships(): array
    {
        return ['municipio.estado'];
    }

    public static function getMessage(): string
    {
        return 'Códigos postales obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'codigos-postales';
    }
}