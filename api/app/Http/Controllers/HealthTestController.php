<?php

namespace App\Http\Controllers;

use App\Models\HealthTest;
use App\Models\HealthTestQuestionsAndAnswers;
use Illuminate\Http\Request;

class HealthTestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'category_id' => 'required|exists:health_categories,id',
                'doctor_id' => 'required|exists:doctors,id',
                'questions_and_answers' => 'required',
            ]);

            // Save test to DB
            $test = HealthTest::create([
                'title' => $fields['title'],
                'description' => $fields['description'],
                'rating' => 0,
                'category_id' => $fields['category_id'],
                'doctor_id' => $fields['doctor_id'],
            ]);

            // Encode data to json to save in DB
            $questions_and_answers = json_encode($fields['questions_and_answers']);

            // Save test QA to DB
            $testQA = HealthTestQuestionsAndAnswers::create([
                'test_id' => $test->id,
                'questions_and_answers' => $questions_and_answers,
            ]);

            return response([
                'test' => $test,
                'questions_and_answers' => $testQA,
                'message' => 'Success'
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);

            return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthTest  $healthTest
     * @return \Illuminate\Http\Response
     */
    public function show(HealthTest $healthTest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthTest  $healthTest
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthTest $healthTest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthTestRequest  $request
     * @param  \App\Models\HealthTest  $healthTest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HealthTest $healthTest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthTest  $healthTest
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthTest $healthTest)
    {
        //
    }
}
