<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class LineaBase extends Model
{
    protected $table = 'linea_base';
    protected $fillable = ['id_etapa', 'id_usuario', 'fecha_creacion'];

    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function preliminar()
    {
        return $this->hasOne(LineaBasePreliminarInicial::class, 'id_linea_base');
    }

    public function identificacion()
    {
        return $this->hasOne(LineaBaseIdentificacion::class, 'id_linea_base');
    }

    public function domicilio()
    {
        return $this->hasOne(LineaBaseDomicilio::class, 'id_linea_base');
    }

    public function socioeconomico()
    {
        return $this->hasOne(LineaBaseSocioeconomico::class, 'id_linea_base');
    }

    public function negocio()
    {
        return $this->hasOne(LineaBaseNegocio::class, 'id_linea_base');
    }

    public function analisisNegocio()
    {
        return $this->hasOne(LineaBaseAnalisisNegocio::class, 'id_linea_base');
    }

    public function administracionIngresos()
    {
        return $this->hasOne(LineaBaseAdministracionIngresosNegocio::class, 'id_linea_base');
    }

    // Add more if needed
}