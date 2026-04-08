<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddParentescoCatalog extends Migration
{
    public function up()
    {
        // 1. Create cat_parentescos table
        Schema::create('cat_parentescos', function (Blueprint $table) {
            $table->increments('id_parentesco');
            $table->string('nombre', 100);
            $table->timestamps();
        });

        // 2. Insert initial data
        DB::table('cat_parentescos')->insert([
            ['nombre' => 'Padre', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Madre', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Hijo/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Esposo/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Cónyuge', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Hermano/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Abuelo/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Tío/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Primo/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Sobrino/a', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['nombre' => 'Otro', 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ]);

        // 3. Alter expediente_aval table to add foreign key
        Schema::table('expediente_aval', function (Blueprint $table) {
            $table->integer('id_parentesco')->unsigned()->nullable()->after('id_expediente');
            
            $table->foreign('id_parentesco')
                  ->references('id_parentesco')
                  ->on('cat_parentescos')
                  ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('expediente_aval', function (Blueprint $table) {
            $table->dropForeign(['id_parentesco']);
            $table->dropColumn('id_parentesco');
        });

        Schema::dropIfExists('cat_parentescos');
    }
}
