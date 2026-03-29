<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmprendedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id_emprendedor,
            'nombre' => optional($this->usuario)->nombre,
            'apellidos' => optional($this->usuario)->apellidos,
            'referencia' => $this->referencia,
            'fechaCredito' => $this->fecha_credito,
            'telefono' => optional($this->usuario)->numero_celular,
            'graduado' => (bool)$this->graduado,
            'fechaGraduacion' => $this->fecha_graduacion,
            // Carga opcional del expediente si está disponible
            'expediente' => new EmprendedorExpedienteResource($this->whenLoaded('expediente')),
            // Información básica de usuario si es necesario exponer más
            'usuario' => $this->whenLoaded('usuario')
        ];
    }
}
