<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use App\Models\Doctor;
use App\Models\HealthCategory;
use App\Models\Medicament;
use App\Models\Prescription;
use App\Models\User;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prescriptions = Prescription::paginate(10);

        // Get category for test
        foreach ($prescriptions as $prescription) {
            $category = HealthCategory::where('id', $prescription->category_id)->first();

            if ($category) {
                $prescription->category = $category;
            }
        }

        return response([
            'prescriptions' => $prescriptions,
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
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'doctor_id' => 'required|exists:doctors,id',
                'category_id' => 'required|exists:health_categories,id',
                'title' => 'required|string',
                'description' => 'required|string',
                'medicaments_array' => 'json',
            ]);

            // Save prescription to DB
            $prescription = Prescription::create([
                'doctor_id' => $fields['doctor_id'],
                'category_id' => $fields['category_id'],
                'title' => $fields['title'],
                'description' => $fields['description'],
                'medicaments_array' => $fields['medicaments_array'],
            ]);

            // Check if prescription was created 
            if (!$prescription) {
                return response([
                    'message' => 'Internal error'
                ], 500);
            }

            return response([
                'prescription' => $prescription,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $prescription = Prescription::where('id', $id)->first();

        if (!$prescription) {
            return response([
                'message' => 'Prescription was not found',
            ], 404);
        }

        // Load medicaments
        $prescription->medicaments_array = Medicament::showMedicaments($prescription->medicaments_array);

        // Load category 
        $prescription->category = HealthCategory::where('id', $prescription->category_id)->first();

        // Load doctor
        $prescription->doctor = Doctor::where('id', $prescription->doctor_id)->first();
        $prescription->doctor = Doctor::getUserData($prescription->doctor);

        return response([
            'prescription' => $prescription,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function edit(Prescription $prescription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePrescriptionRequest  $request
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrescriptionRequest $request, Prescription $prescription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prescription $prescription)
    {
        //
    }
}
