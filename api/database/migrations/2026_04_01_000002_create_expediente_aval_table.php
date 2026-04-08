<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteAvalTable extends Migration
{
    public function up()
    {
        Schema::create('expediente_aval', function (Blueprint $table) {
            $table->increments('id_aval');
            $table->integer('id_expediente');
            $table->string('nombre_completo', 255);
            $table->tinyInteger('edad')->unsigned();
            $table->string('relacion_parentesco', 100);
            $table->string('celular', 15);
            $table->string('tel_fijo', 15)->nullable();
            $table->string('calle', 255);
            $table->string('calle_cruce_1', 255)->nullable();
            $table->string('calle_cruce_2', 255)->nullable();
            $table->string('numero_exterior', 20);
            $table->string('numero_interior', 20)->nullable();
            // FK hacia linea_base_cpostal (modelo CodigoPostal)
            $table->integer('id_codigo_postal');
            // Colonia propia: permite capturar si difiere del catálogo
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
        Schema::dropIfExists('expediente_aval');
    }
}
