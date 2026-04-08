<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteResumenEjecutivoTable extends Migration
{
    public function up()
    {
        Schema::create('expediente_resumen_ejecutivo', function (Blueprint $table) {
            $table->increments('id_resumen');
            $table->integer('id_expediente')->unique();
            $table->string('nombre_proyecto', 255)->nullable();
            $table->text('resumen_proyecto')->nullable();
            $table->text('viabilidad_proyecto')->nullable();
            // POSITIVO, NEGATIVO, CONDICIONADO
            $table->enum('diagnostico_trabajo_social', ['POSITIVO', 'NEGATIVO', 'CONDICIONADO'])->nullable();
            $table->string('quien_otorga_diagnostico', 255)->nullable();
            $table->text('observaciones')->nullable();
            $table->text('vulnerabilidad')->nullable();
            // Presupuesto del proyecto
            $table->decimal('importe_solicitado', 12, 2)->nullable();
            $table->decimal('inversion_emprendedor', 12, 2)->nullable();
            $table->decimal('importe_sugerido_coordinador', 12, 2)->nullable();
            // importe_aprobado NO se almacena — se lee de monto_solicitado del expediente (readonly en UI)
            $table->string('aprobado_por_auxiliar_direccion', 255)->nullable();
            $table->timestamps();

            $table->foreign('id_expediente')
                  ->references('id_expediente')
                  ->on('emprendedor_expediente')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('expediente_resumen_ejecutivo');
    }
}
