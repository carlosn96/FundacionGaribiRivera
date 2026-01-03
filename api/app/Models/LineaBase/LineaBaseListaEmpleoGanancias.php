<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseListaEmpleoGanancias extends Model
{
    protected $table = 'linea_base_lista_empleo_ganancias';
    protected $fillable = ['id_linea_base', 'id_empleo_ganancia'];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}