<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'specialty',
        'mobile_number',
        'office_number',
        'address_1',
        'address_2',
        'address_3',
        'address_4',
        'address_5',
        'description',
        'rating',

    ];

    /**
     * Get doctors user data
     * 
     * @param App\Models\Doctor $doctor 
     * @return App\Models\Doctor $doctor
     */
    public static function getUserData($doctor)
    {
        if (!$doctor) return;

        // Load doctor's user profile 
        $user = User::where('id', $doctor->user_id)->first();

        if (!$user) {
            return $doctor;
        }

        // Return only need user data with doctor profile information 
        $doctor->full_name = $user->full_name;
        $doctor->image = $user->image;

        return $doctor;
    }
}
