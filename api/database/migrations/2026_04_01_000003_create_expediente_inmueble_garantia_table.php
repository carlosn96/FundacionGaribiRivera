<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteInmuebleGarantiaTable extends Migration
{
    public function up()
    {
        Schema::create('expediente_inmueble_garantia', function (Blueprint $table) {
            $table->increments('id_inmueble');
            $table->integer('id_expediente');
            $table->string('calle', 255);
            $table->string('calle_cruce_1', 255)->nullable();
            $table->string('calle_cruce_2', 255)->nullable();
            // FK hacia linea_base_cpostal; municipio/estado resueltos por relación
            $table->integer('id_codigo_postal');
            // Colonia propia: permite discrepancias con el catálogo
            $table->string('colonia', 255);
            $table->timestamps();

            $table->foreign('id_expediente')
                  ->references('id_expediente')
                  ->on('emprendedor_expediente')
                  ->onDelete('cascade');

            $table->foreign('id_codigo_postal')
                  ->references('id_codigo')
                  ->on('linea_base_cpostal')
                  ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::dropIfExists('expediente_inmueble_garantia');
    }
}
