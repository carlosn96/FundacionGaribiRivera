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
        if (!$this->resource) return null;

        // Simular herencia combinando UsuarioResource con datos locales
        $userBase = [];
        if ($this->usuario) {
            $userBase = (new UsuarioResource($this->usuario))->resolve($request);
        } else {
            // Fallback para resultados planos de vistas SQL
            $userBase = [
                'id'                => $this->id_usuario ?? $this->id,
                'nombre'            => $this->nombre,
                'apellidos'         => $this->apellidos,
                'correoElectronico' => $this->correo_electronico ?? $this->correoElectronico,
                'numeroCelular'     => $this->numero_celular ?? $this->numeroCelular,
                'fotografiaBase64'  => $this->fotografia_base64,
                'tieneFoto'         => (bool)$this->tiene_foto,
            ];
        }

        return array_merge($userBase, [
            'id'                => $this->id_asistente ?? $this->id_emprendedor ?? $this->id,
            'idUsuario'         => $this->id_usuario ?? ($this->usuario ? $this->usuario->id : $this->id),
            'referencia'        => $this->referencia,
            'fechaCredito'      => $this->fecha_credito,
            'graduado'          => (bool)$this->graduado,
            'fechaGraduacion'   => $this->fecha_graduacion,
        ]);
    }
}
