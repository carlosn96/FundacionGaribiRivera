<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpedienteAvalResource extends JsonResource
{
    public function toArray($request)
    {
        $domicilio = (new DomicilioResource($this->resource))->resolve();

        return array_merge([
            'idAval'             => $this->id_aval,
            'nombreCompleto'     => $this->nombre_completo,
            'edad'               => (int) $this->edad,
            'relacionParentesco' => $this->relacion_parentesco,
            'idParentesco'       => $this->id_parentesco,
            'parentesco'         => optional($this->whenLoaded('parentesco'))->nombre,
            'celular'            => $this->celular,
            'telFijo'            => $this->tel_fijo,
        ], $domicilio ?: []);
    }
}
