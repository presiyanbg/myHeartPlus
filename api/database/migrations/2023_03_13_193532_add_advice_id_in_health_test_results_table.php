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
            $table->unsignedBigInteger('advice_id')->nullable();

            $table->foreign('advice_id')->references('id')->on('health_test_advice')->onDelete('cascade');
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
            $table->dropForeign(['advice_id']);
            $table->dropColumn('advice_id');
        });
    }
};
