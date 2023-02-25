<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthTestQuestionRequest;
use App\Http\Requests\UpdateHealthTestQuestionRequest;
use App\Models\HealthTestQuestion;

class HealthTestQuestionController extends Controller
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
     * @param  \App\Http\Requests\StoreHealthTestQuestionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreHealthTestQuestionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTestQuestion  $healthTestQuestion
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTestQuestion $healthTestQuestion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTestQuestion  $healthTestQuestion
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTestQuestion $healthTestQuestion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestQuestionRequest  $request
     * @param  \App\Models\HealthTestQuestion  $healthTestQuestion
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthTestQuestionRequest $request, HealthTestQuestion $healthTestQuestion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTestQuestion  $healthTestQuestion
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTestQuestion $healthTestQuestion)
    {
        //
    }
}
