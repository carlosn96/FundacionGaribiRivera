<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Taller extends Model
{
    protected $table = 'taller';
    protected $primaryKey = 'id_taller';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'id_instructor',
        'id_tipo_taller',
        'observaciones',
        'evaluacion_habilitada',
        'numero_taller'
    ];

    protected $casts = [
        'evaluacion_habilitada' => 'boolean',
        'numero_taller' => 'integer'
    ];

    public function instructor()
    {
        return $this->belongsTo(Instructor::class, 'id_instructor', 'id_instructor');
    }

    public function tipo_taller_rel()
    {
        return $this->belongsTo(EtapaFormacionTipo::class, 'id_tipo_taller', 'id_tipo');
    }

    public function cronograma()
    {
        return $this->hasMany(CronogramaTaller::class, 'id_taller', 'id_taller');
    }
}
