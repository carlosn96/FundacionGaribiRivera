<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEmprendedorExpedienteAddNumeroExpediente extends Migration
{
    public function up()
    {
        Schema::table('emprendedor_expediente', function (Blueprint $table) {
            $table->string('numero_expediente', 50)->nullable()->unique()->after('id_emprendedor');
        });
    }

    public function down()
    {
        Schema::table('emprendedor_expediente', function (Blueprint $table) {
            $table->dropColumn('numero_expediente');
        });
    }
}
