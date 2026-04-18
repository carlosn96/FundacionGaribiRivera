<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class ComunidadParroquial extends CatalogBase
{
    const INPUT_NAME_KEY = 'comunidadesParroquiales';
    protected $table = 'linea_base_arquidiocesis_comunidad_parroquial';
    public $timestamps = false;
    protected $primaryKey = 'id_comunidad';
    protected $fillable = ['nombre', 'id_decanato'];

    public function decanato()
    {
        return $this->belongsTo(Decanato::class, 'id_decanato');
    }

    public static function getRelationships(): array
    {
        return ['decanato.vicaria'];
    }

    public static function getMessage(): string
    {
        return 'Comunidades parroquiales obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'comunidades-parroquiales';
    }
}