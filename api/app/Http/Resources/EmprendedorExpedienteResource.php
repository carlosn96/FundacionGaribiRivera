<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmprendedorExpedienteResource extends JsonResource
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
            'idExpediente'                      => $this->id_expediente,
            'idEmprendedor'                     => $this->id_emprendedor,
            'numeroExpediente'                  => $this->numero_expediente,
            'montoSolicitado'                   => (float)$this->monto_solicitado,
            'fechaInicio'                       => $this->fecha_inicio,
            'fechaTermino'                      => $this->fecha_termino,
            'cantidadDocumentosElaborados'      => (int)$this->cantidad_documentos_elaborados,
            'cantidadDocumentosExtraElaborados' => (int)$this->cantidad_documentos_extra_elaborados,
            'montoDocumento'                    => (float)$this->monto_documento,
            'montoPorDocumentoExtra'            => (float)$this->monto_por_documento_extra,
            'cantAportacionesSolidariasPactado' => (int)$this->cant_aportaciones_solidarias_pactado,
            'montoAportacionSolidariaPactado'   => (float)$this->monto_aportacion_solidaria_pactado,
            
            // Relación con el emprendedor (herencia de Usuario incluida)
            'emprendedor' => new EmprendedorResource($this->whenLoaded('emprendedor')),
            
            // Secciones del expediente (requeridas con eager loading)
            'aval'             => new ExpedienteAvalResource($this->whenLoaded('aval')),
            'inmuebleGarantia' => new ExpedienteInmuebleGarantiaResource($this->whenLoaded('inmuebleGarantia')),
            'resumenEjecutivo' => new ExpedienteResumenEjecutivoResource($this->whenLoaded('resumenEjecutivo')),
        ];
    }
}
