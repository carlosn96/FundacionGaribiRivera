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
            'id_emprendedor' => $this->id_emprendedor,
            'montoSolicitado' => (float)$this->monto_solicitado,
            'fechaEntrega' => $this->fecha_entrega,
            'fechaInicio' => $this->fecha_inicio,
            'fechaTermino' => $this->fecha_termino,
            'cantidadDocumentosElaborados' => (int)$this->cantidad_documentos_elaborados,
            'cantidadDocumentosExtraElaborados' => (int)$this->cantidad_documentos_extra_elaborados,
            'montoDocumento' => (float)$this->monto_documento,
            'montoPorDocumentoExtra' => (float)$this->monto_por_documento_extra,
            'cantAportacionesSolidariasPactado' => (int)$this->cant_aportaciones_solidarias_pactado,
            'montoAportacionSolidariaPactado' => (float)$this->monto_aportacion_solidaria_pactado
        ];
    }
}
