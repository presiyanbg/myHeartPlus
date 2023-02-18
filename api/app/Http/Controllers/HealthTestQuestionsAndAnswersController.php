<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthTestQuestionsAndAnswersRequest;
use App\Http\Requests\UpdateHealthTestQuestionsAndAnswersRequest;
use App\Models\HealthTestQuestionsAndAnswers;

class HealthTestQuestionsAndAnswersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreHealthTestQuestionsAndAnswersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreHealthTestQuestionsAndAnswersRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTestQuestionsAndAnswers  $healthTestQuestionsAndAnswers
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTestQuestionsAndAnswers $healthTestQuestionsAndAnswers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTestQuestionsAndAnswers  $healthTestQuestionsAndAnswers
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTestQuestionsAndAnswers $healthTestQuestionsAndAnswers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestQuestionsAndAnswersRequest  $request
     * @param  \App\Models\HealthTestQuestionsAndAnswers  $healthTestQuestionsAndAnswers
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthTestQuestionsAndAnswersRequest $request, HealthTestQuestionsAndAnswers $healthTestQuestionsAndAnswers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTestQuestionsAndAnswers  $healthTestQuestionsAndAnswers
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTestQuestionsAndAnswers $healthTestQuestionsAndAnswers)
    {
        //
    }
}
