<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseSocioeconomico extends Model
{
    protected $table = 'linea_base_seccion_socioeconomico';
    protected $fillable = [
        'id_linea_base',
        'cant_dependientes_economicos',
        'id_ocupacion',
        'id_rango_ingreso_mensual'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}