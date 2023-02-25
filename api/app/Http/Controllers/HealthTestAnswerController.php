<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthTestAnswerRequest;
use App\Http\Requests\UpdateHealthTestAnswerRequest;
use App\Models\HealthTestAnswer;

class HealthTestAnswerController extends Controller
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
     * @param  \App\Http\Requests\StoreHealthTestAnswerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreHealthTestAnswerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTestAnswer  $healthTestAnswer
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTestAnswer $healthTestAnswer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTestAnswer  $healthTestAnswer
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTestAnswer $healthTestAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestAnswerRequest  $request
     * @param  \App\Models\HealthTestAnswer  $healthTestAnswer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthTestAnswerRequest $request, HealthTestAnswer $healthTestAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTestAnswer  $healthTestAnswer
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTestAnswer $healthTestAnswer)
    {
        //
    }
}
