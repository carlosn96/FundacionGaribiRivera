<?php

namespace App\Models\LineaBase;

use App\Models\LineaBase\Catalogos\CantidadDependientesEconomicos;
use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\Ocupacion;
use App\Models\LineaBase\Catalogos\RangoIngresoMensual;

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

    public function ocupacion()
    {
        return $this->belongsTo(Ocupacion::class, 'id_ocupacion');
    }

    public function cantidadDependientesEconomicos()
    {
        return $this->belongsTo(CantidadDependientesEconomicos::class, 'cant_dependientes_economicos');
    }

    public function rangoIngresoMensual()
    {
        return $this->belongsTo(RangoIngresoMensual::class, 'id_rango_ingreso_mensual');
    }
}