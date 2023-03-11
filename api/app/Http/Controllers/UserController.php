<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'users' => User::all(),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return "Test Create";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();

        if (!$user) {
            return response([
                'message' => 'User was not found',
            ], 404);
        }

        $medical_profiles = $user->getMedicalProfiles();

        return response([
            'user' => $user,
            'medical_profiles' => $medical_profiles,
        ], 200);
    }

    /**
     * Get users medical profiles
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getMedicalProfile($user_id)
    {
        try {
            $user = User::where('id', $user_id)->first();
            $medical_profiles = $user->getMedicalProfiles();

            return response([
                'user' => $user,
                'medical_profiles' => $medical_profiles,
                'message' => 'Success',
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
