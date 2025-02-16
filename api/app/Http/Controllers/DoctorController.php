<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Models\Doctor;
use App\Models\DoctorMedicalSpecialty;
use App\Models\HealthCategory;
use App\Models\HealthTest;
use App\Models\MedicalSpecialty;
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

            // Load medical specialties
            $doctor->medicalSpecialties = DoctorMedicalSpecialty::where('doctor_id', $id)->get();

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
     * @param  int $id doctor
     * @return \Illuminate\Http\Response
     */
    public function showPatients($id)
    {
        try {
            $doctor = Doctor::where('id', $id)->first();

            if (!$doctor) {
                return response([
                    'message' => 'Doctor was not found',
                ], 404);
            }

            // Do not display same doctor as patient for himself 
            $patients = Patient::where('doctor_id', $doctor->id)->whereNot('user_id', $doctor->user_id)->paginate(10);

            foreach ($patients as $patient) {
                $patientUser = User::where('id', $patient->user_id)->first();

                $patient->full_name = $patientUser->full_name;
                $patient->image = $patientUser->image;
            }

            return response($patients, 200);
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
            $doctor = Doctor::where('id', $id)->first();

            if (!$doctor) {
                return response([
                    'message' => 'Doctor was not found',
                ], 404);
            }

            $tests = HealthTest::where('doctor_id', $doctor->id)->orderByDesc('rating')->paginate(10);

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
     * @param  int $id doctor 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, Request $request)
    {
        try {
            $doctor = Doctor::where('id', $id)->first();

            if (!$doctor) {
                return response([
                    'message' => 'Doctor was not found',
                ], 404);
            }

            // Validate request 
            $fields = $request->validate([
                'organization_id' => 'nullable|exists:organizations,id',
                'mobile_number' => 'required|string',
                'office_number' => 'nullable|string',
                'address_1' => 'required|string',
                'address_2' => 'required|string',
                'address_3' => 'required|string',
                'address_4' => 'nullable|string',
                'address_5' => 'nullable|string',
                'description' => 'required|string',
                'contact_email' => 'nullable|email|unique:doctors,contact_email,' . $doctor->id,
                'medicalSpecialties' => 'nullable|string',
            ]);

            // Update doctor
            Doctor::where('id', $id)
                ->update([
                    'organization_id' => $fields['organization_id'] ?? null,
                    'mobile_number' => $fields['mobile_number'],
                    'office_number' => $fields['office_number'],
                    'address_1' => $fields['address_1'],
                    'address_2' => $fields['address_2'],
                    'address_3' => $fields['address_3'],
                    'address_4' => $fields['address_4'],
                    'address_5' => $fields['address_5'],
                    'description' => $fields['description'],
                    'contact_email' => $fields['contact_email'],
                ]);

            $medicalSpecialties = json_decode($fields['medicalSpecialties'], true);
            $prevMedicalSpecialties = DoctorMedicalSpecialty::where('doctor_id', $doctor->id)->get()->toArray();

            if (!is_array($medicalSpecialties)) {
                $medicalSpecialties = [];
            }

            // Delete removed specialties 
            foreach ($prevMedicalSpecialties as $prevSpecialty) {
                $specialtyIsSelected = array_search($prevSpecialty['medical_specialty_id'], $medicalSpecialties);

                if ($specialtyIsSelected != null) continue;

                DoctorMedicalSpecialty::where([
                    ['doctor_id', '=', $doctor->id],
                    ['medical_specialty_id', '=', $prevSpecialty['medical_specialty_id']],
                ])->delete();
            }

            // Add new specialties
            foreach ($medicalSpecialties as $medicalSpecialtyId) {
                $specialtyIsSelected = array_search($medicalSpecialtyId, array_column($prevMedicalSpecialties, 'medical_specialty_id'));

                if ($specialtyIsSelected != null) continue;

                // Check specialty exists
                $medicalSpecialty = MedicalSpecialty::where('id', $medicalSpecialtyId)->first();

                if ($medicalSpecialty == null) continue;

                DoctorMedicalSpecialty::create([
                    'doctor_id' => $doctor->id,
                    'medical_specialty_id' => $medicalSpecialtyId,
                ]);
            }

            $doctor = Doctor::where('id', $id)->first();

            // Load medical specialties
            $doctor->medicalSpecialties = DoctorMedicalSpecialty::where('doctor_id', $id)->get();

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
