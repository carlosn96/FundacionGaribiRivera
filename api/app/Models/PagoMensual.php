<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PagoMensual extends Model
{
    /**
     * El nombre de la tabla asociada modelo.
     *
     * @var string
     */
    protected $table = 'pago_mensual';

    /**
     * La clave primaria de la tabla.
     *
     * @var string
     */
    protected $primaryKey = 'id_pago';

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array
     */
    protected $fillable = [
        'id_emprendedor',
        'numero_recibo',
        'tipo_pago',
        'monto',
        'aportacion_solidaria',
        'donativo',
        'fecha_aplicacion',
        'fecha_recepcion'
    ];

    /**
     * Obtiene el emprendedor asociado al pago.
     */
    public function emprendedor()
    {
        return $this->belongsTo(Emprendedor::class, 'id_emprendedor', 'id_emprendedor');
    }
}
