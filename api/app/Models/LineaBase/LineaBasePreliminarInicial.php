<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

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
}