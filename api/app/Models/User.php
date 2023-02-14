<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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
            if ($this->role == 'patient' || $this->role == 'admin') {
                $profile = Patient::where('user_id', $this->id)->first();

                !!$profile && $medicalProfiles['patient'] = $profile;
            }

            // Get doctor profile data
            if ($this->role == 'doctor' || $this->role == 'admin') {
                $profile = Doctor::where('user_id', $this->id)->first();

                !!$profile && $medicalProfiles['doctor'] = $profile;
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

            // Get patient profile data
            if ($this->role == 'patient' || $this->role == 'admin') {
                $profile = Patient::create([
                    'user_id' => $this->id
                ]);

                !!$profile && $medicalProfiles['patient'] = $profile;
            }

            // Get doctor profile data
            if ($this->role == 'doctor' || $this->role == 'admin') {
                $profile = Doctor::create([
                    'user_id' => $this->id
                ]);

                !!$profile && $medicalProfiles['doctor'] = $profile;
            }

            return $medicalProfiles;
        } catch (Throwable $e) {
            return $e;
        }
    }
}
