<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MunicipioResource extends JsonResource
{
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'idMunicipio' => $this->id_municipio,
            'nombre'      => $this->nombre,
            'idEstado'    => $this->id_estado,
        ];
    }
}
