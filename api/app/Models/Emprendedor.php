<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Emprendedor extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuario_emprendedor';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id_emprendedor';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id_usuario',
        'referencia',
        'fecha_credito',
        'graduado',
        'fecha_graduacion'
    ];

    /**
     * Relationship with the basic user data.
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id');
    }

    /**
     * Relationship with the credit expediente.
     */
    public function expediente()
    {
        return $this->hasOne(EmprendedorExpediente::class, 'id_emprendedor', 'id_emprendedor');
    }

    /**
     * Relationship with pagos mensuales/extras.
     */
    public function pagosMensuales()
    {
        return $this->hasMany(PagoMensual::class, 'id_emprendedor', 'id_emprendedor');
    }

    /**
     * Relationship with pagos parciales.
     */
    public function pagosParciales()
    {
        return $this->hasMany(PagoParcial::class, 'id_emprendedor', 'id_emprendedor');
    }
}
