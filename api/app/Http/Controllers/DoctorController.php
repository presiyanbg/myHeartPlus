<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;
use App\Models\HealthCategory;
use App\Models\HealthTest;
use App\Models\Patient;
use App\Models\Prescription;
use App\Models\User;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
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
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
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
        try {
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
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Display patients connected to doctor
     * 
     * @param App\Models\Doctor $doctor
     */
    public function showPatients(Doctor $doctor)
    {
        try {
            if (!$doctor) {
                return response([
                    'message' => 'Doctor was not found',
                ], 404);
            }

            // Do not display same doctor as patient for himself 
            $patients = Patient::where('doctor_id', $doctor->id)->whereNot('user_id', $doctor->user_id)->paginate(10);

            if (!$patients) {
                return response([
                    'message' => 'No patients found',
                ], 404);
            }

            foreach ($patients as $patient) {
                $patientUser = User::where('id', $patient->user_id)->first();

                $patient->full_name = $patientUser->full_name;
                $patient->image = $patientUser->image;
            }

            return response([
                'doctor' => $doctor,
                'patients' => $patients,
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Display health tests connected to passed doctor.
     *
     * @param  int  $id ID of doctor
     * @return \Illuminate\Http\Response
     */
    public function showHealthTests(int $id)
    {
        try {
            $tests =  HealthTest::where('doctor_id', $id)->orderByDesc('rating')->paginate(3);

            // Get test categories
            foreach ($tests as $test) {
                $category = HealthCategory::where('id', $test->category_id)->first();

                if ($category) {
                    $test->category = $category;
                }
            }

            return response($tests, 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
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
     * @param  User $user
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(User $user, Request $request)
    {
        try {
            $doctor = Doctor::where('user_id', $user->id)->first();

            if (!$doctor) {
                return response([
                    'message' => 'Doctor was not found',
                ], 404);
            }

            // Validate request 
            $fields = $request->validate([
                'specialty' => 'required|string',
                'mobile_number' => 'required|string',
                'office_number' => 'nullable|string',
                'address_1' => 'required|string',
                'address_2' => 'required|string',
                'address_3' => 'required|string',
                'address_4' => 'nullable|string',
                'address_5' => 'nullable|string',
                'description' => 'required|string',
            ]);

            // Update doctor
            Doctor::where('user_id', $user->id)
                ->update([
                    'specialty' => $fields['specialty'],
                    'mobile_number' => $fields['mobile_number'],
                    'office_number' => $fields['office_number'],
                    'address_1' => $fields['address_1'],
                    'address_2' => $fields['address_2'],
                    'address_3' => $fields['address_3'],
                    'address_4' => $fields['address_4'],
                    'address_5' => $fields['address_5'],
                    'description' => $fields['description'],
                ]);

            $doctor = Doctor::where('user_id', $user->id)->first();

            return response([
                'doctor' => $doctor,
                'message' => 'Success',
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);

            return false;
        }
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
