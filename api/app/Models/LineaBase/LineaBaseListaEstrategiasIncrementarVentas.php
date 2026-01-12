<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\EstrategiaIncrementarVentas;

class LineaBaseListaEstrategiasIncrementarVentas extends Model
{
    protected $table = 'linea_base_lista_estrategias_incrementar_ventas';
    protected $fillable = ['id_estrategia', 'id_linea_base'];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }

    public function estrategia()
    {
        return $this->belongsTo(EstrategiaIncrementarVentas::class, 'id_estrategia');
    }
}