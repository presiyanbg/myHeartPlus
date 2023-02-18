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
        Schema::table('health_test_results', function (Blueprint $table) {
            $table->foreign('test_id')->references('id')->on('health_tests')->onDelete('cascade');

            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');

            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('health_test_results', function (Blueprint $table) {
            //
        });
    }
};
