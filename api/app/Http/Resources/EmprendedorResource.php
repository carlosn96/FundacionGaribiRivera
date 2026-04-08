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
        // Extraer datos de línea base si están cargados
        $lineaBase = $this->whenLoaded('lineaBase');
        $etapa = null;
        $domicilioPersonal = null;
        $domicilioNegocio = null;

        if ($lineaBase instanceof \App\Models\LineaBase\LineaBase) {
            // Etapa de formación
            $etapaModel = optional($lineaBase->etapa);
            $etapa = $etapaModel ? [
                'idEtapa' => $etapaModel->id_etapa,
                'nombre'  => $etapaModel->nombre,
            ] : null;

            // Domicilio personal
            $domicilioPersonal = new DomicilioResource($lineaBase->domicilio);

            // Domicilio del negocio
            $neg = $lineaBase->negocio;
            $domicilioNegocio = null;
            if ($neg) {
                $domicilioNegocio = (new DomicilioResource($neg))->resolve();
                $domicilioNegocio['nombreNegocio'] = $neg->nombre;
                $domicilioNegocio['telefono']      = $neg->telefono;
            }
        }

        return [
            'id'              => $this->id_emprendedor,
            'referencia'      => $this->referencia,
            'fechaCredito'    => $this->fecha_credito,
            'graduado'        => (bool)$this->graduado,
            'fechaGraduacion' => $this->fecha_graduacion,
            'etapa'              => $etapa,
            'domicilioPersonal'  => $domicilioPersonal,
            'domicilioNegocio'   => $domicilioNegocio,
            'expediente' => new EmprendedorExpedienteResource($this->whenLoaded('expediente')),
            'usuario'    => new UsuarioResource($this->whenLoaded('usuario')),
        ];
    }
}
