<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class RazonRecurreFundacion extends CatalogBase
{
    public const INPUT_NAME_KEY = 'razonRecurre';
    protected $table = 'linea_base_razon_recurre';
    public $timestamps = false;
    protected $primaryKey = 'id_razon';
    protected $fillable = ['descripcion'];
    public static function getMessage(): string
    {
        return 'Razones para recurrir a la fundación obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'razon-recurre-fundacion';
    }
}