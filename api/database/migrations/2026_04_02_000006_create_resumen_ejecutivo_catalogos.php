<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateResumenEjecutivoCatalogos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Catálogo Viabilidad
        Schema::create('cat_viabilidades', function (Blueprint $table) {
            $table->id('id_viabilidad');
            $table->string('descripcion');
        });

        DB::table('cat_viabilidades')->insert([
            ['descripcion' => 'Alta'],
            ['descripcion' => 'Media'],
            ['descripcion' => 'Baja'],
            ['descripcion' => 'No Viable'],
        ]);

        // 2. Catálogo Diagnostico Social
        Schema::create('cat_diagnosticos_sociales', function (Blueprint $table) {
            $table->id('id_diagnostico_social');
            $table->string('descripcion');
            $table->string('valor_referencia')->nullable(); // Para mantener compatibilidad con POSITIVO, NEGATIVO, etc
        });

        DB::table('cat_diagnosticos_sociales')->insert([
            ['descripcion' => 'Positivo', 'valor_referencia' => 'POSITIVO'],
            ['descripcion' => 'Negativo', 'valor_referencia' => 'NEGATIVO'],
            ['descripcion' => 'Condicionado', 'valor_referencia' => 'CONDICIONADO'],
        ]);

        // 3. Catálogo Vulnerabilidad
        Schema::create('cat_vulnerabilidades', function (Blueprint $table) {
            $table->id('id_vulnerabilidad');
            $table->string('descripcion');
        });

        DB::table('cat_vulnerabilidades')->insert([
            ['descripcion' => 'Alta'],
            ['descripcion' => 'Media'],
            ['descripcion' => 'Baja'],
            ['descripcion' => 'Crítica'],
        ]);

        // 4. Actualizar tabla principal para usar IDs en lugar de strings
        // Para no perder datos, primero añadimos las columnas y luego las mapeamos
        Schema::table('expediente_resumen_ejecutivo', function (Blueprint $table) {
            $table->unsignedBigInteger('id_viabilidad')->nullable()->after('resumen_proyecto');
            $table->unsignedBigInteger('id_diagnostico_social')->nullable()->after('id_viabilidad');
            $table->unsignedBigInteger('id_vulnerabilidad')->nullable()->after('observaciones');
        });

        // Intentar migrar datos existentes (heurística simple)
        $resumenes = DB::table('expediente_resumen_ejecutivo')->get();
        foreach ($resumenes as $resumen) {
            $idViabilidad = DB::table('cat_viabilidades')->where('descripcion', 'like', "%{$resumen->viabilidad_proyecto}%")->value('id_viabilidad');
            $idDiagnostico = DB::table('cat_diagnosticos_sociales')->where('valor_referencia', $resumen->diagnostico_trabajo_social)->value('id_diagnostico_social');
            $idVulnerabilidad = DB::table('cat_vulnerabilidades')->where('descripcion', 'like', "%{$resumen->vulnerabilidad}%")->value('id_vulnerabilidad');

            DB::table('expediente_resumen_ejecutivo')
                ->where('id_expediente_resumen', $resumen->id_expediente_resumen)
                ->update([
                    'id_viabilidad' => $idViabilidad,
                    'id_diagnostico_social' => $idDiagnostico,
                    'id_vulnerabilidad' => $idVulnerabilidad,
                ]);
        }

        // Finalmente eliminamos las columnas string antiguas si se desea, o las dejamos como nullable
        // Para ser seguros en este paso, las haremos nullable por ahora
        Schema::table('expediente_resumen_ejecutivo', function (Blueprint $table) {
            $table->string('viabilidad_proyecto')->nullable()->change();
            $table->string('diagnostico_trabajo_social')->nullable()->change();
            $table->string('vulnerabilidad')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('expediente_resumen_ejecutivo', function (Blueprint $table) {
            $table->dropColumn(['id_viabilidad', 'id_diagnostico_social', 'id_vulnerabilidad']);
        });

        Schema::dropIfExists('cat_vulnerabilidades');
        Schema::dropIfExists('cat_diagnosticos_sociales');
        Schema::dropIfExists('cat_viabilidades');
    }
}
