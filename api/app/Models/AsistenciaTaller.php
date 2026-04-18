<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsistenciaTaller extends Model
{
    protected $table = 'asistencia_taller';
    protected $primaryKey = 'id_asistencia';
    public $timestamps = false;

    protected $fillable = [
        'id_taller',
        'id_emprendedor',
        'id_etapa',
        'asiste',
        'observacion',
        'fecha'
    ];

    public function taller()
    {
        return $this->belongsTo(Taller::class, 'id_taller');
    }

    public function etapa()
    {
        return $this->belongsTo(EtapaFormacion::class, 'id_etapa');
    }
}
