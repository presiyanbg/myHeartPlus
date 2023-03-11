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
        Schema::table('health_test_advice', function (Blueprint $table) {
            $table->unsignedBigInteger('medicament_id')->unsigned()->nullable()->change();
            $table->unsignedBigInteger('prescription_id')->unsigned()->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('health_test_advice', function (Blueprint $table) {
            $table->unsignedBigInteger('medicament_id')->unsigned()->nullable(false)->change();
            $table->unsignedBigInteger('prescription_id')->unsigned()->nullable(false)->change();
        });
    }
};
