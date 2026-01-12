<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Support\Facades\DB;

class Genero extends CatalogBase
{
    public const INPUT_NAME_KEY = 'genero';

    public const ID_COLUMN = 'id_genero';
    public const DESCRIPTION_COLUMN = 'descripcion';

    public static function query()
    {
        $enumValues = self::getEnumValues();
        $collection = collect($enumValues)->map(function ($value, $index) {
            return (object) [self::ID_COLUMN => $index + 1, self::DESCRIPTION_COLUMN => $value];
        });

        return new class ($collection) {
            private $data;

            public function __construct($data)
            {
                $this->data = $data;
            }

            public function get()
            {
                return $this->data;
            }

            public function with($relations)
            {
                return $this;
            }
        };
    }

    private static function getEnumValues()
    {
        try {
            $result = DB::select("SELECT COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME = 'linea_base_seccion_identificacion' AND COLUMN_NAME = 'genero' AND TABLE_SCHEMA = DATABASE()");
            if ($result) {
                $type = $result[0]->COLUMN_TYPE;
                $values = str_replace(["enum(", ")"], "", $type);
                $values = explode(",", $values);
                $values = array_map(function ($v) {
                    return trim($v, "'");
                }, $values);
                return $values;
            }
        } catch (\Exception $e) {
            return ['Hombre', 'Mujer'];
        }

    }

    public static function getMessage(): string
    {
        return 'Géneros obtenidos';
    }

    public static function getCatalogType(): string
    {
        return 'genero';
    }
}