<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthTestResultRequest;
use App\Http\Requests\UpdateHealthTestResultRequest;
use App\Models\HealthCategory;
use App\Models\HealthTest;
use App\Models\HealthTestAdvice;
use App\Models\HealthTestResult;
use App\Models\Medicament;
use App\Models\Patient;
use App\Models\Prescription;

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
     * @param  int $id result
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        try {
            $result = HealthTestResult::where('id', $id)->first();

            if (!$result) {
                return response([
                    'message' => 'Health test result was not found'
                ], 404);
            }

            // Get test
            $result->test = HealthTest::where('id', $result->test_id)->first();

            // Get test category
            if (!!$result->test) {
                $result->test->category = HealthCategory::where('id', $result->test->category_id)->first();
            }

            // Get advice
            $result->advice = HealthTestAdvice::where('id', $result->advice_id)->first();

            // Get medicament  
            if (!!$result->advice && $result->advice->medicament_id) {
                $result->advice->medicament = Medicament::where('id', $result->advice->medicament_id)->first();
            }

            // Get prescription
            if (!!$result->advice && $result->advice->prescription_id) {
                $result->advice->prescription = Prescription::where('id', $result->advice->prescription_id)->first();
            }

            return response([
                'result' => $result
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
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
