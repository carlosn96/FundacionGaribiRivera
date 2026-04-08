<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\CodigoPostal;
use App\Models\LineaBase\Catalogos\Parentesco;

class ExpedienteAval extends Model
{
    protected $table = 'expediente_aval';
    protected $primaryKey = 'id_aval';

    protected $fillable = [
        'id_expediente',
        'id_parentesco',
        'nombre_completo',
        'edad',
        'relacion_parentesco',
        'celular',
        'tel_fijo',
        'calle',
        'calle_cruce_1',
        'calle_cruce_2',
        'numero_exterior',
        'numero_interior',
        'id_codigo_postal',
        'colonia',
    ];

    public function expediente()
    {
        return $this->belongsTo(EmprendedorExpediente::class, 'id_expediente', 'id_expediente');
    }

    public function parentesco()
    {
        return $this->belongsTo(Parentesco::class, 'id_parentesco', 'id_parentesco');
    }

    /**
     * Relación con catálogo de CP (linea_base_cpostal).
     * Permite resolver municipio y estado mediante la cadena codigoPostal→municipio→estado.
     */
    public function codigoPostal()
    {
        return $this->belongsTo(CodigoPostal::class, 'id_codigo_postal', 'id_codigo');
    }
}
