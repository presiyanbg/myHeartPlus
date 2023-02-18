<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthTestResultRequest;
use App\Http\Requests\UpdateHealthTestResultRequest;
use App\Models\HealthTestResult;

class HealthTestResultController extends Controller
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
     * @param  \App\Http\Requests\StoreHealthTestResultRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreHealthTestResultRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTestResult  $healthTestResult
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTestResult $healthTestResult)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTestResult  $healthTestResult
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTestResult $healthTestResult)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestResultRequest  $request
     * @param  \App\Models\HealthTestResult  $healthTestResult
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthTestResultRequest $request, HealthTestResult $healthTestResult)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTestResult  $healthTestResult
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTestResult $healthTestResult)
    {
        //
    }
}
