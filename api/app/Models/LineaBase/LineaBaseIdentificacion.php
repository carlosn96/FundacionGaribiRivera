<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\EstadoCivil;
use App\Models\LineaBase\Catalogos\Escolaridad;
use App\Models\LineaBase\Catalogos\Genero;
use Log;

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

    public function estadoCivil()
    {
        return $this->belongsTo(EstadoCivil::class, 'id_estado_civil');
    }

    public function escolaridad()
    {
        return $this->belongsTo(Escolaridad::class, 'id_escolaridad');
    }
}