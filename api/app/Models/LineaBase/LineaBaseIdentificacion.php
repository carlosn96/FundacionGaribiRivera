<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseIdentificacion extends Model
{
    protected $table = 'linea_base_seccion_identificacion';
    protected $fillable = [
        'id_linea_base',
        'genero',
        'edad',
        'id_estado_civil',
        'id_escolaridad',
        'discapacidad'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}