<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PagoMensualResource extends JsonResource
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
            'numeroRecibo' => $this->numero_recibo,
            'tipoPago' => $this->tipo_pago,
            'monto' => (float)$this->monto,
            'aportacionSolidaria' => (float)$this->aportacion_solidaria,
            'donativo' => (float)$this->donativo,
            'fechaAplicacion' => $this->fecha_aplicacion,
            'fechaRecepcion' => $this->fecha_recepcion,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }
}
