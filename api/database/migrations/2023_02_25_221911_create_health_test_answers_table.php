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
        Schema::create('health_test_answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('test_id');
            $table->unsignedBigInteger('question_id');
            $table->unsignedBigInteger('next_question_order_number');
            $table->unsignedBigInteger('prev_question_order_number');

            $table->longText('content');
            $table->float('points');
            $table->timestamps();

            $table->foreign('test_id')->references('id')->on('health_tests')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('health_test_questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('health_test_answers');
    }
};
