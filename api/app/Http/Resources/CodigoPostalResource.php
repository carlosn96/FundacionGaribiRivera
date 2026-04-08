<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CodigoPostalResource extends JsonResource
{
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'idCodigo'     => $this->id_codigo,
            'codigoPostal' => $this->codigo_postal,
            'idMunicipio'  => $this->id_municipio,
            'colonia'      => $this->colonia,
            'municipio'    => new MunicipioResource($this->whenLoaded('municipio')),
        ];
    }
}
