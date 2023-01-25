<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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

        // Create token if credentials are correct 
        $token = $user->createToken('appToken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
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
                'role' => 'required|string',
                'profile_picture' => 'nullable|file'
            ]);

            // Check and reset user role
            if ($fields['role'] !== 'doctor' && $fields['role'] !== 'patient') {
                $fields['role'] = 'patient';
            }

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

            // Upload image
            if ($request->hasFile('profile_picture')) {
                $imageName = $user->id . '-' . time() . '.' . $request->profile_picture->extension();
                $imagePath = 'images/users/' . $imageName;
                $request->profile_picture->move(public_path('images/users'), $imageName);

                $user->update(['image' => $imagePath]);
            }

            if (!$request->hasFile('profile_picture')) {
                $user->update(['image' => '<images>
                <users>default.png']);
            }

            $token = $user->createToken('appToken')->plainTextToken;

            return response([
                'user' => $user,
                'token' => $token,
                'message' => 'Welcome!',
                'test' => $request->hasFile('profile_picture')
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);

            return false;
        }
    }
}
