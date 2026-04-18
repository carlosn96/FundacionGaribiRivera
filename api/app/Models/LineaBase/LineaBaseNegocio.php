<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\CodigoPostal;
use App\Models\LineaBase\Catalogos\NegocioGiro;
use App\Models\LineaBase\Catalogos\NegocioActividad;

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

    public function codigoPostal()
    {
        return $this->belongsTo(CodigoPostal::class, 'id_codigo_postal');
    }

    public function negocioGiro()
    {
        return $this->belongsTo(NegocioGiro::class, 'id_giro_negocio');
    }

    public function negocioActividad()
    {
        return $this->belongsTo(NegocioActividad::class, 'actividad');
    }
}