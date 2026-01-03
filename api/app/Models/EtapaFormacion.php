<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EtapaFormacion extends Model
{
    protected $table = 'etapa_formacion'; // Tabla principal para operaciones
    protected $primaryKey = 'id_etapa';
    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin', 'id_tipo', 'es_actual'];
    public $timestamps = false;

    // Sobrescribir all() para usar la vista listar_etapas_formacion
    public static function all($columns = ['*'])
    {
        return DB::table('listar_etapas_formacion')->get($columns);
    }

    // Método para encontrar por id usando la vista
    public static function findById($id)
    {
        return DB::table('listar_etapas_formacion')->where('idEtapa', $id)->first();
    }

    // Método para obtener la etapa actual
    public static function actual()
    {
        return DB::table('listar_etapas_formacion')->where('esActual', 1)->first();
    }

    // Relaciones si aplica, ej. con tipo
    // public function tipo()
    // {
    //     return $this->belongsTo(TipoEtapa::class, 'id_tipo');
    // }
}