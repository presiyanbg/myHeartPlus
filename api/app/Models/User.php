<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Throwable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'full_name',
        'email',
        'password',
        'last_activity',
        'role',
        'image'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get user medical profiles or create new if none exists
     */
    public function getMedicalProfiles()
    {
        try {
            $medicalProfiles = [];

            // Get patient profile data
            $patient = Patient::where('user_id', $this->id)->first();

            if ($patient) {
                $patient->health_details = PatientHealth::where('patient_id', $patient->id)->get();

                $medicalProfiles['patient'] = $patient;
            }

            // Get doctor profile data
            if ($this->role == 'doctor' || $this->role == 'admin') {
                $doctor = Doctor::where('user_id', $this->id)->first();

                !!$doctor && $medicalProfiles['doctor'] = $doctor;
            }

            // Create new record for user if non found
            if (empty($medicalProfiles)) {
                return $this->createMedicalProfiles($this->id);
            }

            return $medicalProfiles;
        } catch (Throwable $e) {
            return $e;
        }
    }

    /**
     * Create doctor or patient based on type ( doctor | patient | admin )
     */
    public function createMedicalProfiles()
    {
        try {
            $medicalProfiles = [];

            // Create patient profile - created for all users
            $profile = Patient::create([
                'user_id' => $this->id,
                'gender' => '',
                'weight' => 0,
                'height' => 0,
                'date_of_birth' => new DateTime('now'),
            ]);

            !!$profile && $medicalProfiles['patient'] = $profile;

            // Create doctor profile - only for doctor and admin
            if ($this->role == 'doctor' || $this->role == 'admin') {
                $profile = Doctor::create([
                    'user_id' => $this->id,
                    'rating' => 0,
                    'contact_email' => '',
                    'mobile_number' => '',
                    'office_number' => '',
                    'address_1' => '',
                    'address_2' => '',
                    'address_3' => '',
                    'address_4' => '',
                    'address_5' => '',
                    'description' => '',
                ]);

                !!$profile && $medicalProfiles['doctor'] = $profile;
            }

            return $medicalProfiles;
        } catch (Throwable $e) {
            return $e;
        }
    }
}
