<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseNegocio extends Model
{
    protected $table = 'linea_base_seccion_negocio';
    protected $fillable = [
        'id_linea_base',
        'nombre',
        'telefono',
        'calle',
        'calle_cruce_1',
        'calle_cruce_2',
        'numero_exterior',
        'numero_interior',
        'id_codigo_postal',
        'colonia',
        'antiguedad',
        'cant_empleados',
        'id_giro_negocio',
        'otra_actividad',
        'actividad'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}