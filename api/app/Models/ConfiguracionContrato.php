<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfiguracionContrato extends Model
{
    protected $table = 'configuracion_contrato';
    public $timestamps = false;

    protected $fillable = [
        'testigo_1',
        'testigo_2',
        'representante_legal',
        'domicilio_fundacion',
        'nombre_fundacion'
    ];
}
