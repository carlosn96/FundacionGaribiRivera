<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmprendedorFortalecimientoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 
     * Especialización del Emprendedor para el programa de Fortalecimiento.
     * Extiende los datos base del Emprendedor (que a su vez extiende de Usuario).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if (!$this->resource) return null;

        // Heredar la estructura base de Emprendedor
        $base = (new EmprendedorResource($this->resource))->resolve($request);

        // Añadir campos de especialización de Fortalecimiento
        return array_merge($base, [
            'idFortalecimiento'            => $this->id_fortalecimiento,
            'fechaRegistroFortalecimiento' => $this->fecha_registro,
        ]);
    }
}
