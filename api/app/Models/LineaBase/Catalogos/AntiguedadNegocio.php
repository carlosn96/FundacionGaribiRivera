<?php

namespace App\Models\LineaBase\Catalogos;

use Illuminate\Support\Facades\DB;

class AntiguedadNegocio extends CatalogBase
{
    public static function getMessage(): string
    {
        return 'Antigüedades de negocio obtenidas';
    }

    public static function getCatalogType(): string
    {
        return 'antiguedad-negocio';
    }
    
    public const INPUT_NAME_KEY = 'antiguedadNegocio';

    public static function query()
    {
        $result = DB::select("SHOW COLUMNS FROM linea_base_seccion_negocio WHERE Field = 'antiguedad'");
        
        if ($result && isset($result[0]->Type)) {
            $type = $result[0]->Type;
            
            // Parse enum values from type like enum('value1','value2',...)
            if (preg_match("/enum\((.*)\)/i", $type, $matches)) {
                $values = explode(',', $matches[1]);
                $data = [];
                foreach ($values as $i => $value) {
                    $cleanValue = trim($value, "'");
                    $data[] = ['id' => $i + 1, 'descripcion' => $cleanValue];
                }
                return new FakeBuilder($data);
            }
        }
        
        // Fallback to hardcoded values if enum not found
        $data = [
            ['id' => 1, 'descripcion' => '0-2 años'],
            ['id' => 2, 'descripcion' => '3-5 años'],
            ['id' => 3, 'descripcion' => '6 en adelante'],
        ];
        return new FakeBuilder($data);
    }
}

class FakeBuilder
{
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function get()
    {
        return collect($this->data);
    }

    public function with($relations)
    {
        return $this;
    }
}