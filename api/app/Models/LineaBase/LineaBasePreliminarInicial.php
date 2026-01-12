<?php

namespace App\Models\LineaBase;

use App\Contracts\Mappable;
use App\Models\LineaBase\Catalogos\MedioConocimiento;
use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\RazonRecurreFundacion;
use App\Models\LineaBase\Catalogos\SolicitaCredito;
use App\Models\LineaBase\Catalogos\UtilizaCredito;
use App\Models\LineaBase\Catalogos\TiempoDedicaFormacion;

class LineaBasePreliminarInicial extends Model
{
    protected $table = 'linea_base_seccion_preliminar';
    protected $fillable = [
        'id_linea_base',
        'otro_medio_conocimiento',
        'otro_razon_recurre_fundacion',
        'id_razon_recurre_fundacion',
        'id_solicita_credito',
        'id_utiliza_credito',
        'id_tiempo_dedica_formacion'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }

    public function mediosConocimiento()
    {
        return $this->hasMany(LineaBaseListaMedioConocimiento::class, 'id_linea_base', 'id_linea_base');
    }

    public function razonRecurreFundacion()
    {
        return $this->belongsTo(RazonRecurreFundacion::class, 'id_razon_recurre_fundacion', 'id_razon');
    }

    public function solicitaCredito()
    {
        return $this->belongsTo(SolicitaCredito::class, 'id_solicita_credito', 'id_solicitud');
    }

    public function utilizaCredito()
    {
        return $this->belongsTo(UtilizaCredito::class, 'id_utiliza_credito', 'id_utilidad');
    }

    public function tiempoDedicaFormacion()
    {
        return $this->belongsTo(TiempoDedicaFormacion::class, 'id_tiempo_dedica_formacion', 'id_tiempo');
    }
}