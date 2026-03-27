<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PagoParcial extends Model
{
    /**
     * El nombre de la tabla asociada modelo.
     *
     * @var string
     */
    protected $table = 'pago_parcial';

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
        'monto',
        'fecha'
    ];

    /**
     * Obtiene el emprendedor asociado al abono.
     */
    public function emprendedor()
    {
        return $this->belongsTo(Emprendedor::class, 'id_emprendedor', 'id_emprendedor');
    }
}
