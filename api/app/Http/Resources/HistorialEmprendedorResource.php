<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HistorialEmprendedorResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'idEmprendedor'     => $this->id_emprendedor,
            'nombre'            => $this->nombre,
            'apellidos'         => $this->apellidos,
            'correoElectronico' => $this->correo_electronico,
            'numeroCelular'     => $this->numero_celular,
            'referencia'        => $this->referencia,
            'fechaCredito'      => $this->fecha_credito,
            'fotografia'        => $this->fotografia ? base64_encode($this->fotografia) : null,
            'id'                => $this->id
        ];
    }
}
