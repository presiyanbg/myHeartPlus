<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use App\Models\Prescription;
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
     * @param  \App\Models\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function show(Prescription $prescription)
    {
        //
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
