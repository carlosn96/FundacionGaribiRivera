<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpedienteResumenEjecutivo extends Model
{
    protected $table = 'expediente_resumen_ejecutivo';
    protected $primaryKey = 'id_resumen';

    protected $fillable = [
        'id_expediente',
        'nombre_proyecto',
        'resumen_proyecto',
        'id_viabilidad',
        'id_diagnostico_social',
        'quien_otorga_diagnostico',
        'observaciones',
        'id_vulnerabilidad',
        'importe_solicitado',
        'inversion_emprendedor',
        'importe_sugerido_coordinador',
        'aprobado_por_auxiliar_direccion',
    ];

    public function expediente()
    {
        return $this->belongsTo(EmprendedorExpediente::class, 'id_expediente', 'id_expediente');
    }

    public function viabilidad()
    {
        return $this->belongsTo(LineaBase\Catalogos\Viabilidad::class, 'id_viabilidad', 'id_viabilidad');
    }

    public function diagnosticoSocial()
    {
        return $this->belongsTo(LineaBase\Catalogos\DiagnosticoSocial::class, 'id_diagnostico_social', 'id_diagnostico_social');
    }

    public function vulnerabilidadRel()
    {
        return $this->belongsTo(LineaBase\Catalogos\Vulnerabilidad::class, 'id_vulnerabilidad', 'id_vulnerabilidad');
    }
}
