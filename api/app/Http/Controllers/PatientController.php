<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\HealthTest;
use App\Models\HealthTestResult;
use App\Models\Patient;
use App\Models\PatientHealth;
use App\Models\User;
use Illuminate\Http\Request;
use Throwable;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'patients' => Patient::paginate(10),
        ], 200);
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
    public function store(StorePatientRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show health test results connected to patient
     * 
     * @param int $id patient
     * @return \Illuminate\Http\Response
     */
    public function showHealthTestResults(int $id)
    {
        try {
            $patient = Patient::where('id', $id)->first();

            if (!$patient) {
                return response([
                    'message' => 'Patient was not found'
                ], 404);
            }

            $results = HealthTestResult::where('patient_id', $patient->id)->orderByDesc('created_at',)->paginate(10);

            // Load test connected to the result
            foreach ($results as $result) {
                $result->test = HealthTest::where('id', $result->test_id)->first();
            }

            // Load health details
            $patient->health_details =  PatientHealth::where('patient_id', $patient->id)->first();

            return response([
                'results' => $results
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
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function edit(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id User id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, Request $request)
    {
        try {
            $user = User::where('id', $id)->first();
            $patient = Patient::where('user_id', $user->id)->first();

            // Check if article was created 
            if (!$patient) {
                return response([
                    'message' => 'Patient was not found'
                ], 404);
            }

            // Validate request 
            $fields = $request->validate([
                'weight' => 'required|string',
                'height' => 'required|string',
                'date_of_birth' => 'required|date',
                'gender' => 'required|string',
                'health_details' => 'required|string',
            ]);

            // Update patient
            Patient::where('id', $patient->id)
                ->update([
                    'weight' => $fields['weight'],
                    'height' => $fields['height'],
                    'date_of_birth' => $fields['date_of_birth'],
                    'gender' => $fields['gender'],
                ]);

            // Create record of patient health details
            PatientHealth::create([
                'patient_id' => $patient->id,
                'health_details' => $fields['health_details'] ?? '',
            ]);

            return response([
                'message' => 'Success',
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {
        //
    }
}
