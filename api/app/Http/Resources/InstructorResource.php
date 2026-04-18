<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InstructorResource extends JsonResource
{
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'idInstructor' => $this->id_instructor,
            'nombre' => $this->nombre_instructor,
            'apellidoPaterno' => $this->apellido_paterno,
            'apellidoMaterno' => $this->apellido_materno,
            'nombreCompleto' => $this->nombre_completo,
            'correo' => $this->correo_electronico,
            'telefono' => $this->telefono
        ];
    }
}
