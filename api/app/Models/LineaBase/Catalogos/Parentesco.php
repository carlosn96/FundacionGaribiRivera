<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Parentesco extends CatalogBase
{
    const INPUT_NAME_KEY = 'parentesco';
    protected $table = 'cat_parentescos';
    protected $primaryKey = 'id_parentesco';
    protected $fillable = ['nombre'];
    public $timestamps = true;

    /**
     * Get the success message for this catalog.
     *
     * @return string
     */
    public static function getMessage(): string
    {
        return 'Catálogo de parentescos obtenido';
    }

    /**
     * Get the catalog type key for this model.
     *
     * @return string
     */
    public static function getCatalogType(): string
    {
        return 'parentesco';
    }
}
