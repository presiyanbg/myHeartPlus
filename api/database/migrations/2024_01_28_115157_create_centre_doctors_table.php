<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('centre_doctors', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('centre_id');
            $table->unsignedBigInteger('doctor_id');

            $table->foreign('centre_id')->references('id')->on('centres')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('centre_doctors');
    }
};
