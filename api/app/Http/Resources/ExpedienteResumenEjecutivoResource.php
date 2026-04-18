<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpedienteResumenEjecutivoResource extends JsonResource
{
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'idResumen'                    => $this->id_resumen,
            'nombreProyecto'               => $this->nombre_proyecto,
            'resumenProyecto'              => $this->resumen_proyecto,
            'idViabilidad'                 => $this->id_viabilidad,
            'viabilidadProyecto'           => $this->viabilidad ? $this->viabilidad->descripcion : $this->viabilidad_proyecto,
            'idDiagnosticoSocial'          => $this->id_diagnostico_social,
            'diagnosticoTrabajoSocial'     => $this->diagnosticoSocial ? $this->diagnosticoSocial->descripcion : $this->diagnostico_trabajo_social,
            'quienOtorgaDiagnostico'       => $this->quien_otorga_diagnostico,
            'observaciones'                => $this->observaciones,
            'idVulnerabilidad'             => $this->id_vulnerabilidad,
            'vulnerabilidad'               => $this->vulnerabilidadRel ? $this->vulnerabilidadRel->descripcion : $this->vulnerabilidad,
            'importeSolicitado'            => (float) $this->importe_solicitado,
            'inversionEmprendedor'         => (float) $this->inversion_emprendedor,
            'importeSugeridoCoordinador'   => $this->importe_sugerido_coordinador !== null ? (float) $this->importe_sugerido_coordinador : null,
            'aprobadoPorAuxiliarDireccion' => $this->aprobado_por_auxiliar_direccion,
        ];
    }
}
