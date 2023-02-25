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
        Schema::create('health_test_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('test_id');

            $table->string('title');
            $table->longText('description');
            $table->boolean('is_final_question');
            $table->timestamps();

            $table->foreign('test_id')->references('id')->on('health_tests')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('health_test_questions');
    }
};
