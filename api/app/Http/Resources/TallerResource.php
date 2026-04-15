<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TallerResource extends JsonResource
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
            'id' => $this->id_taller,
            'nombre' => $this->nombre,
            'numeroTaller' => $this->numero_taller,
            'observaciones' => $this->observaciones,
            'evaluacionHabilitada' => (bool)$this->evaluacion_habilitada,
            'idInstructor' => $this->id_instructor,
            'idTipoTaller' => $this->id_tipo_taller,
            'instructor' => $this->whenLoaded('instructor', function() {
                return [
                    'idInstructor' => $this->instructor->id_instructor,
                    'nombre' => $this->instructor->nombre_instructor,
                    'apellidoPaterno' => $this->instructor->apellido_paterno,
                    'apellidoMaterno' => $this->instructor->apellido_materno,
                    'nombreCompleto' => $this->instructor->nombre_completo,
                    'correo' => $this->instructor->correo_electronico,
                    'telefono' => $this->instructor->telefono
                ];
            }),
            'tipoTaller' => $this->whenLoaded('tipo_taller_rel', function() {
                return [
                    'idTipo' => $this->tipo_taller_rel->id_tipo,
                    'descripcion' => $this->tipo_taller_rel->descripcion
                ];
            })
        ];
    }
}
