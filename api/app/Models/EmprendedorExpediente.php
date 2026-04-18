<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmprendedorExpediente extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'emprendedor_expediente';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id_expediente';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id_emprendedor',
        'numero_expediente',
        'monto_solicitado',
        'fecha_inicio',
        'fecha_termino',
        'cantidad_documentos_elaborados',
        'cantidad_documentos_extra_elaborados',
        'monto_documento',
        'monto_por_documento_extra',
        'cant_aportaciones_solidarias_pactado',
        'monto_aportacion_solidaria_pactado',
    ];

    /**
     * Relationship with the entrepreneur profile.
     */
    public function emprendedor()
    {
        return $this->belongsTo(Emprendedor::class, 'id_emprendedor', 'id_emprendedor');
    }

    /** Datos del aval del crédito */
    public function aval()
    {
        return $this->hasOne(ExpedienteAval::class, 'id_expediente', 'id_expediente');
    }

    /** Domicilio del inmueble en garantía */
    public function inmuebleGarantia()
    {
        return $this->hasOne(ExpedienteInmuebleGarantia::class, 'id_expediente', 'id_expediente');
    }

    /** Resumen ejecutivo del préstamo */
    public function resumenEjecutivo()
    {
        return $this->hasOne(ExpedienteResumenEjecutivo::class, 'id_expediente', 'id_expediente');
    }
}

