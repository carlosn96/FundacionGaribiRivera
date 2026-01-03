<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseAdministracionIngresosNegocio extends Model
{
    protected $table = 'linea_base_seccion_administracion_ingresos';
    protected $fillable = [
        'id_linea_base',
        'sueldo_mensual',
        'monto_mensual_ventas',
        'monto_mensual_egresos',
        'monto_mensual_utilidades',
        'es_negocio_principal_fuente_personal',
        'es_negocio_principal_fuente_familiar',
        'habito_ahorro',
        'cuenta_sistema_ahorro',
        'detalle_sistema_ahorro',
        'monto_ahorro_mensual'
    ];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}