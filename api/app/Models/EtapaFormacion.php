<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EtapaFormacion extends Model
{
    protected $table = 'etapa_formacion';
    protected $primaryKey = 'id_etapa';
    protected $fillable = ['nombre', 'fecha_inicio', 'fecha_fin', 'id_tipo', 'es_actual', 'id_modalidad'];
    public $timestamps = false;
    protected $appends = ['idEtapa', 'fechaInicio', 'fechaFin', 'esActual', 'idModalidad', 'descripcionTipo'];

    public function getIdEtapaAttribute() { return $this->attributes['id_etapa'] ?? null; }
    public function getFechaInicioAttribute() { return $this->attributes['fecha_inicio'] ?? null; }
    public function getFechaFinAttribute() { return $this->attributes['fecha_fin'] ?? null; }
    public function getEsActualAttribute() { return $this->attributes['es_actual'] ?? null; }
    public function getIdModalidadAttribute() { return $this->attributes['id_modalidad'] ?? null; }
    public function getDescripcionTipoAttribute() { return $this->tipo ? $this->tipo->descripcion : ''; }

    /**
     * Relación con el tipo de etapa.
     */
    public function tipo()
    {
        return $this->belongsTo(EtapaFormacionTipo::class, 'id_tipo');
    }

    /**
     * Método para obtener la etapa actual.
     * Prioriza Eloquent sobre consultas directas.
     */
    public static function actual()
    {
        return self::with('tipo')->where('es_actual', 1)->first();
    }

    /**
     * Utiliza el procedimiento almacenado existente para actualizar la etapa actual.
     */
    public static function setActual($id)
    {
        return DB::statement('CALL actualizar_etapa_actual(?)', [$id]);
    }

    /**
     * Obtener el cronograma utilizando la vista o consulta optimizada.
     */
    public static function getCronograma($idEtapa)
    {
        $sql = "SELECT t.numero_taller, t.nombre AS nombre_taller, DATE_FORMAT(c.fecha, '%d/%m/%Y') AS fecha_formateada, i.nombreInstructor AS instructor 
                FROM cronograma_taller c 
                INNER JOIN taller t ON c.id_taller = t.id_taller 
                LEFT JOIN listar_taller_instructor i ON t.id_instructor = i.idInstructor 
                WHERE c.id_etapa = ? 
                ORDER BY c.fecha ASC, t.numero_taller ASC";
        return DB::select($sql, [$idEtapa]);
    }

    /**
     * Utiliza el procedimiento almacenado existente para eliminar la etapa.
     */
    public static function deleteEtapa($id)
    {
        return DB::statement('CALL eliminar_etapa_formacion(?)', [$id]);
    }
}