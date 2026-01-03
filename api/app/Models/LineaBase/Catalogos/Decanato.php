<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Decanato extends CatalogBase
{
    const INPUT_NAME_KEY = 'decanatos';
    protected $table = 'linea_base_arquidiocesis_decanato';
    public $timestamps = false;
    protected $primaryKey = 'id_decanato';
    protected $fillable = ['nombre', 'id_vicaria'];

    public function vicaria()
    {
        return $this->belongsTo(Vicaria::class, 'id_vicaria');
    }

    public function comunidadesParroquiales()
    {
        return $this->hasMany(ComunidadParroquial::class, 'id_decanato');
    }

    public static function getRelationships(): array
    {
        return ['vicaria'];
    }

    public static function getMessage(): string
    {
        return 'Decanatos obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'decanatos';
    }
}