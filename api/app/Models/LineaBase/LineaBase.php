<?php

namespace App\Models\LineaBase;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
use App\Models\EtapaFormacion;
use App\Models\LineaBase\LineaBasePreliminarInicial;
use App\Models\LineaBase\LineaBaseIdentificacion;
use App\Models\LineaBase\LineaBaseDomicilio;
use App\Models\LineaBase\LineaBaseSocioeconomico;
use App\Models\LineaBase\LineaBaseNegocio;
use App\Models\LineaBase\LineaBaseAnalisisNegocio;
use App\Models\LineaBase\LineaBaseAdministracionIngresosNegocio;
use App\Http\Resources\LineaBaseResource;

class LineaBase extends Model
{
    protected $table = 'linea_base';
    protected $fillable = ['id_etapa', 'id_usuario', 'fecha_creacion'];
    protected $primaryKey = 'id_linea_base';

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

    public function etapa()
    {
        return $this->belongsTo(EtapaFormacion::class, 'id_etapa');
    }

    public function resource() {
         $data = $this->load([
            'etapa',
            'preliminar.mediosConocimiento.medio',
            'preliminar.razonRecurreFundacion',
            'preliminar.solicitaCredito',
            'preliminar.utilizaCredito',
            'preliminar.tiempoDedicaFormacion',
            'identificacion.estadoCivil',
            'identificacion.escolaridad',
            'domicilio.codigoPostal.municipio.estado',
            'domicilio.comunidadParroquial.decanato.vicaria',
            'socioeconomico.cantidadDependientesEconomicos',
            'socioeconomico.ocupacion',
            'socioeconomico.rangoIngresoMensual',
            'negocio.codigoPostal.municipio.estado',
            'negocio.negocioGiro',
            'negocio.negocioActividad',
            'analisisNegocio.estrategiasIncrementarVentas.estrategia',
            'analisisNegocio.empleoGanancias.empleoGanancia',
            'administracionIngresos.objetivosAhorro.objetivoAhorro'
        ]);
        return new LineaBaseResource($data);
    }
    
}