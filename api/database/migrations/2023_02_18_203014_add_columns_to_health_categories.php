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
        Schema::table('health_categories', function (Blueprint $table) {
            $table->string('bg_color')->default('#2e86de');
            $table->string('font_color')->default('#fff');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('health_categories', function (Blueprint $table) {
            $table->dropColumn('bg_color');
            $table->dropColumn('font_color');
        });
    }
};
