<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseAnalisisNegocio extends Model
{
    protected $table = 'linea_base_seccion_analisis_negocio';
    protected $fillable = [
        'id_linea_base',
        'problemas_negocio',
        'registra_entrada_salida',
        'asigna_sueldo',
        'conoce_utilidades',
        'identifica_competencia',
        'quien_competencia',
        'clientes_negocio',
        'ventajas_negocio',
        'conoce_productos_mayor_utilidad',
        'porcentaje_ganancia',
        'ahorro',
        'cuanto_ahorro',
        'razones_no_ahorro',
        'conoce_punto_equilibro', //Error de dislexia en la BD
        'separa_gastos',
        'elabora_presupuesto'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }

    public function estrategiasIncrementarVentas()
    {
        return $this->hasMany(LineaBaseListaEstrategiasIncrementarVentas::class, 'id_linea_base', 'id_linea_base');
    }

    public function empleoGanancias()
    {
        return $this->hasMany(LineaBaseListaEmpleoGanancias::class, 'id_linea_base', 'id_linea_base');
    }
}