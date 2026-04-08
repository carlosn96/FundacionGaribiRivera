<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpedienteInmuebleGarantiaResource extends JsonResource
{
    public function toArray($request)
    {
        $domicilio = (new DomicilioResource($this->resource))->resolve();

        return array_merge([
            'idInmueble' => $this->id_inmueble,
        ], $domicilio ?: []);
    }
}
