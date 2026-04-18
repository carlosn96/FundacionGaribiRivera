<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Database\Eloquent\Model;

abstract class CatalogBase extends Model
{
    /**
     * Get the relationships to eager load for this catalog.
     *
     * @return array
     */
    public static function getRelationships(): array
    {
        return [];
    }

    /**
     * Get the success message for this catalog.
     *
     * @return string
     */
    public static function getMessage(): string
    {
        return 'Catálogo obtenido';
    }

    /**
     * Get the catalog type key for this model.
     *
     * @return string
     */
    abstract public static function getCatalogType(): string;
}