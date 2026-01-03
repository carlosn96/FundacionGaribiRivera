<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Vicaria extends CatalogBase
{
    const INPUT_NAME_KEY = 'vicarias';
    protected $table = 'linea_base_arquidiocesis_vicaria';
    public $timestamps = false;
    protected $primaryKey = 'id_vicaria';
    protected $fillable = ['nombre'];

    public function decanatos()
    {
        return $this->hasMany(Decanato::class, 'id_vicaria');
    }

    // Alias for compatibility
    public function decanato()
    {
        return $this->decanatos();
    }

    public static function getRelationships(): array
    {
        return ['decanato'];
    }

    public static function getMessage(): string
    {
        return 'Vicarias obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'vicarias';
    }
}