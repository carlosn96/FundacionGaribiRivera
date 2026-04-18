<?php

namespace App\Http\Resources;

use App\Utils\StringHelper;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EmprendedorResource;

class AsistenciaEmprendedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // El emprendedor debe haber cargado sus asistencias filtradas por taller/etapa
        $asistencia = $this->asistencias->first();

        return [
            'emprendedor' => new EmprendedorResource($this),
            'asiste'      => StringHelper::boolValue($asistencia ? $asistencia->asiste : 0),
            'observacion' => $asistencia ? $asistencia->observacion : null,
        ];
    }
}
