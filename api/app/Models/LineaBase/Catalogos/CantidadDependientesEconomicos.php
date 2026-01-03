<?php

namespace App\Models\LineaBase\Catalogos;

class CantidadDependientesEconomicos extends CatalogBase
{
    protected $table = 'linea_base_cantidad_dependientes';
    protected $primaryKey = 'id_cantidad';
    protected $fillable = ['descripcion'];
    public $timestamps = false;
    

    public static function getMessage(): string
    {
        return 'Cantidades de dependientes obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'cantidad-dependientes-economicos';
    }
    
    public const INPUT_NAME_KEY = 'cantidadDependientesEconomicos';
}