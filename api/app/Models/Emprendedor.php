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
     * Relationship with attendance records.
     */
    public function asistencias()
    {
        return $this->hasMany(AsistenciaTaller::class, 'id_emprendedor', 'id_emprendedor');
    }

    /**
     * Relationship with the basic user data.
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id');
    }

    /**
     * Accessor for the user's name.
     */
    public function getNombreAttribute()
    {
        return $this->usuario->nombre;
    }

    /**
     * Accessor for the user's last names.
     */
    public function getApellidosAttribute()
    {
        return $this->usuario->apellidos;
    }

    /**
     * Accessor for the user's email.
     */
    public function getCorreoElectronicoAttribute()
    {
        return $this->usuario->correo_electronico;
    }

    /**
     * Accessor for the user's phone number.
     */
    public function getNumeroCelularAttribute()
    {
        return $this->usuario->numero_celular;
    }

    /**
     * Accessor for the user's profile picture.
     */
    /**
     * Accessor for the user's profile picture as base64.
     */
    public function getFotografiaBase64Attribute()
    {
        return $this->usuario->fotografia ? base64_encode($this->usuario->fotografia) : null;
    }

    /**
     * Accessor for whether the user has a profile picture.
     */
    public function getTieneFotoAttribute()
    {
        return !empty($this->usuario->fotografia);
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

    /**
     * Scope to filter entrepreneurs whose latest LineaBase is in a specific stage.
     */
    public function scopeEnEtapa($query, $idEtapa)
    {
        return $query->whereHas('usuario.lineaBase', function ($q) use ($idEtapa) {
            $q->where('id_etapa', $idEtapa)
              ->whereRaw('id_linea_base = (select max(lb2.id_linea_base) from linea_base lb2 where lb2.id_usuario = linea_base.id_usuario)');
        });
    }
}
