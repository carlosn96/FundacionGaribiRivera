<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PagoParcialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if (!$this->resource) {
            return [];
        }

        return [
            'idPago' => $this->id_pago,
            'idEmprendedor' => $this->id_emprendedor,
            'monto' => (float)$this->monto,
            'fecha' => $this->fecha,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
