<?php

namespace App\Models\LineaBase;

use App\Models\LineaBase\Catalogos\ObjetivoAhorro;
use Illuminate\Database\Eloquent\Model;

class LineaBaseListaObjetivosAhorro extends Model
{
    protected $table = 'linea_base_lista_objetivos_ahorro';
    protected $fillable = ['id_linea_base', 'id_objetivo'];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }

    public function objetivoAhorro()
    {
        return $this->belongsTo(ObjetivoAhorro::class, 'id_objetivo');
    }
}