<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseDomicilio extends Model
{
    protected $table = 'linea_base_seccion_domicilio';
    protected $fillable = [
        'id_linea_base',
        'calle',
        'calle_cruce_1',
        'calle_cruce_2',
        'numero_exterior',
        'numero_interior',
        'id_codigo_postal',
        'colonia',
        'id_comunidad_parroquial'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}