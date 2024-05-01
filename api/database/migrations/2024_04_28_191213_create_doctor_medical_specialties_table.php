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
        Schema::create('doctor_medical_specialties', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->unsignedBigInteger('medical_specialty_id')->nullable();

            $table->foreign('doctor_id')->references('id')->on('doctors');
            $table->foreign('medical_specialty_id')->references('id')->on('medical_specialties');

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
        Schema::dropIfExists('doctor_medical_specialties');
    }
};
