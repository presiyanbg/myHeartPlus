<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use stdClass;

class AuthController extends Controller
{

    /**
     * Login user
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password 
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials',
            ], 401);
        }

        // Update last activity
        User::where('id', $user->id)
            ->update([
                'last_activity' => Carbon::now(),
            ]);

        // Create token if credentials are correct 
        $token = $user->createToken('appToken')->plainTextToken;

        // Get user medical profiles
        $medical_profiles = new stdClass();

        // Patient
        $medical_profiles->patient = Patient::where('user_id', $user->id)->first();

        // Doctor
        if ($user->role == 'doctor' || $user->role == 'admin') {
            $medical_profiles->doctor = Doctor::where('user_id', $user->id)->first();
        }

        return response([
            'user' => $user,
            'token' => $token,
            'medical_profiles' => $medical_profiles,
            'message' => 'Welcome!'
        ], 200);
    }

    /**
     * Logout user
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response([
            'message' => 'Logged out',
        ], 200);
    }

    /**
     * Register User
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        try {
            // Validate request 
            $fields = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|confirmed',
                'profile_picture' => 'nullable|file',
                'role' => [
                    'required',
                    Rule::in(['doctor', 'patient', 'admin']),
                ],
            ]);

            // Create user
            $user = User::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'full_name' => $fields['first_name'] . ' ' . $fields['last_name'],
                'email' => $fields['email'],
                'role' => $fields['role'],
                'password' => Hash::make($fields['password'], [
                    'rounds' => 12,
                ]),
                'last_activity' => Carbon::now()->toDateTimeString(),
            ]);

            // Get medical profiles 
            $medical_profiles = $user->createMedicalProfiles();

            // Upload image
            if ($request->hasFile('profile_picture')) {
                $imageName = $user->id . '-' . time() . '.' . $request->profile_picture->extension();
                $imagePath = 'images/users/' . $imageName;
                $request->profile_picture->move(public_path('images/users'), $imageName);

                $user->update(['image' => $imagePath]);
            }

            // Set default image
            if (!$request->hasFile('profile_picture')) {
                $user->update(['image' => 'images/users/default.png']);
            }

            // Generate AUTH token
            $token = $user->createToken('appToken')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token,
                'medical_profiles' => $medical_profiles,
                'message' => 'Welcome!',
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);

            return false;
        }
    }
}
