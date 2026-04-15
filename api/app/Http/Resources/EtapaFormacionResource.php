<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EtapaFormacionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'id' => $this->id_etapa,
            'nombre' => $this->nombre,
            'fechaInicio' => $this->fecha_inicio,
            'fechaFin' => $this->fecha_fin,
            'idTipo' => $this->id_tipo,
            'tipo' => $this->tipo ? $this->tipo->descripcion : '',
            'esActual' => (bool) $this->es_actual,
            'modalidad' => $this->id_modalidad ?? 1
        ];
    }
}
