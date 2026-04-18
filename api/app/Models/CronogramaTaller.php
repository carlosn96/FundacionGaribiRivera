<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CronogramaTaller extends Model
{
    protected $table = 'cronograma_taller';
    public $timestamps = false;

    protected $fillable = [
        'id_etapa',
        'id_taller',
        'fecha'
    ];

    protected $casts = [
        'fecha' => 'datetime',
    ];

    public function taller()
    {
        return $this->belongsTo(Taller::class, 'id_taller', 'id_taller');
    }
}
