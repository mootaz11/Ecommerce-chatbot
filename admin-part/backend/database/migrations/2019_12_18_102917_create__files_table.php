<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Files', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('filename');
            $table->float('filsize');
            $table->integer('idproduct');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('File');
    }
}
