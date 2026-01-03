<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;

class LineaBaseListaMedioConocimiento extends Model
{
    protected $table = 'linea_base_lista_medio_conocimiento';
    protected $fillable = ['id_linea_base', 'id_medio'];

    public $timestamps = false;

    public function lineaBase()
    {
        return $this->belongsTo(LineaBase::class, 'id_linea_base');
    }
}