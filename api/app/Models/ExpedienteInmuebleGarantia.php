<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\LineaBase\Catalogos\CodigoPostal;

class ExpedienteInmuebleGarantia extends Model
{
    protected $table = 'expediente_inmueble_garantia';
    protected $primaryKey = 'id_inmueble';

    protected $fillable = [
        'id_expediente',
        'calle',
        'numero_exterior',
        'numero_interior',
        'calle_cruce_1',
        'calle_cruce_2',
        'id_codigo_postal',
        'colonia',
    ];

    public function expediente()
    {
        return $this->belongsTo(EmprendedorExpediente::class, 'id_expediente', 'id_expediente');
    }

    /**
     * Municipio y Estado se resuelven via codigoPostal→municipio→estado.
     */
    public function codigoPostal()
    {
        return $this->belongsTo(CodigoPostal::class, 'id_codigo_postal', 'id_codigo');
    }
}
