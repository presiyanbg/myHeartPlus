<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateHealthTestAdviceRequest;
use App\Models\HealthTestAdvice;
use Illuminate\Http\Request;

class HealthTestAdviceController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'test_id' => 'required|exists:health_tests,id',
                'medicament_id' => 'sometimes|exists:medicaments,id',
                'prescription_id' => 'sometimes|exists:prescriptions,id',
                'title' => 'required|string',
                'content' => 'required|string',
                'max_points' => 'required|numeric',
                'min_points' => 'required|numeric',
            ]);

            // Set default values 
            $fields['medicament_id'] = $fields['medicament_id'] ?? null;
            $fields['prescription_id'] = $fields['prescription_id'] ?? null;

            // Save prescription to DB
            $testAdvice = HealthTestAdvice::create([
                'test_id' => $fields['test_id'],
                'medicament_id' => $fields['medicament_id'],
                'prescription_id' => $fields['prescription_id'],
                'title' => $fields['title'],
                'content' => $fields['content'],
                'max_points' => $fields['max_points'],
                'min_points' => $fields['min_points'],
            ]);

            // Check if advice was created 
            if (!$testAdvice) {
                return response([
                    'message' => 'Internal error'
                ], 500);
            }

            return response([
                'testAdvice' => $testAdvice,
                'message' => 'Success'
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);

            return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTestAdvice  $healthTestAdvice
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTestAdvice $healthTestAdvice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTestAdvice  $healthTestAdvice
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTestAdvice $healthTestAdvice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestAdviceRequest  $request
     * @param  \App\Models\HealthTestAdvice  $healthTestAdvice
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthTestAdviceRequest $request, HealthTestAdvice $healthTestAdvice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTestAdvice  $healthTestAdvice
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTestAdvice $healthTestAdvice)
    {
        //
    }
}
