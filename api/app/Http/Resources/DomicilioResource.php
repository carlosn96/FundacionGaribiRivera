<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DomicilioResource extends JsonResource
{
    /**
     * Transforma el recurso de domicilio (o cualquier modelo con campos de dirección) en un array.
     * Soporta modelos como Domicilio, Negocio, ExpedienteAval, ExpedienteInmuebleGarantia.
     */
    public function toArray($request)
    {
        if (!$this->resource) return null;

        $cp = $this->codigoPostal;
        $municipio = optional($cp)->municipio;
        $estado = optional($municipio)->estado;

        return [
            'calle'          => $this->calle,
            'calleCruce1'    => $this->calle_cruce_1 ?? $this->calleCruce1,
            'calleCruce2'    => $this->calle_cruce_2 ?? $this->calleCruce2,
            'numeroExterior' => $this->numero_exterior ?? $this->numeroExterior,
            'numeroInterior' => $this->numero_interior ?? $this->numeroInterior,
            'colonia'        => $this->colonia,
            'codigoPostal'   => new CodigoPostalResource($cp),
            'municipio'      => new MunicipioResource($municipio),
            'estado'         => $estado ? ($estado->nombre ?? $estado) : null,
        ];
    }
}
