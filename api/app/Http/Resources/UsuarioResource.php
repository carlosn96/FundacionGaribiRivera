<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    public function toArray($request)
    {
        if (!$this->resource) return null;

        return [
            'id'                => $this->id,
            'nombre'            => $this->nombre,
            'apellidos'         => $this->apellidos,
            'correoElectronico' => $this->correo_electronico,
            'numeroCelular'     => $this->numero_celular,
            'estadoActivo'      => (bool)$this->estado_activo,
            'tipoUsuario'       => $this->tipo_usuario,
            'rol'               => $this->rol,
            'permisos'          => $this->permisos,
            'fotografiaBase64'  => $this->fotografia_base64,
            'tieneFoto'         => (bool)$this->tiene_foto,
        ];
    }
}
