<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    protected $table = 'taller_instructor';
    protected $primaryKey = 'id_instructor';
    public $timestamps = false;

    protected $fillable = [
        'nombre_instructor',
        'apellido_paterno',
        'apellido_materno',
        'correo_electronico',
        'telefono',
        'fotografia'
    ];

    protected $hidden = ['fotografia'];

    protected $appends = ['nombre_completo'];

    // Accessors for frontend backwards compatibility if needed
    public function getNombreCompletoAttribute()
    {
        return trim("{$this->nombre_instructor} {$this->apellido_paterno} {$this->apellido_materno}");
    }
}
