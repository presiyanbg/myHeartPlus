<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;
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

        // Get name of article writer
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
     * @param  \App\Models\Doctor  $doctor
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

        // Load doctor's user profile 
        $user = User::where('id', $doctor->user_id)->first();

        if (!$user) {
            return response([
                'message' => 'Doctors user profile was not found',
            ], 404);
        }

        // Return only need user data with doctor profile information 
        $doctor->full_name = $user->full_name;
        $doctor->image = $doctor->image;

        return response([
            'doctor' => $doctor,
        ], 200);
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
