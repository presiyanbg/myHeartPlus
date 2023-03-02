<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;
use App\Models\HealthCategory;
use App\Models\HealthTest;
use App\Models\Medicament;
use App\Models\Prescription;
use App\Models\User;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctors = Doctor::paginate(10);

        // Get full name of doctor and image 
        foreach ($doctors as $doctor) {
            $user = User::where('id', $doctor->user_id)->first();

            if ($user) {
                $doctor->full_name = $user->full_name;
                $doctor->image = $user->image;
            }
        }

        return response([
            'doctors' => $doctors
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
     * @param  \App\Http\Requests\StoreDoctorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDoctorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id ID of doctor
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $doctor = Doctor::where('id', $id)->first();

        if (!$doctor) {
            return response([
                'message' => 'Doctor was not found',
            ], 404);
        }

        // Load user data
        $doctor = Doctor::getUserData($doctor);

        return response([
            'doctor' => $doctor,
        ], 200);
    }

    /**
     * Display health tests connected to passed doctor.
     *
     * @param  int  $id ID of doctor
     * @return \Illuminate\Http\Response
     */
    public function showHealthTests(int $id)
    {
        $tests =  HealthTest::where('doctor_id', $id)->orderByDesc('rating')->paginate(3);

        // Get test categories
        foreach ($tests as $test) {
            $category = HealthCategory::where('id', $test->category_id)->first();

            if ($category) {
                $test->category = $category;
            }
        }

        return response($tests, 200);
    }

    /**
     * Display prescriptions connected to passed doctor.
     *
     * @param  int  $id ID of doctor
     * @return \Illuminate\Http\Response
     */
    public function showPrescriptions(int $id)
    {
        $prescriptions =  Prescription::where('doctor_id', $id)->orderByDesc('rating')->paginate(3);

        foreach ($prescriptions as $prescription) {
            // Get prescription categories
            $category = HealthCategory::where('id', $prescription->category_id)->first();

            if ($category) {
                $prescription->category = $category;
            }
        }

        return response($prescriptions, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function edit(Doctor $doctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDoctorRequest  $request
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Doctor $doctor)
    {
        //
    }
}
