<?php

namespace App\Http\Controllers;

use App\Models\HealthCategory;
use App\Models\HealthTest;
use App\Models\HealthTestAnswer;
use App\Models\HealthTestQuestion;
use App\Models\HealthTestQuestionsAndAnswers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HealthTestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tests = HealthTest::paginate(10);

        // Get category for test
        foreach ($tests as $test) {
            $category = HealthCategory::where('id', $test->category_id)->first();

            if ($category) {
                $test->category = $category;
            }
        }

        return response([
            'tests' => $tests
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
                'questions_and_answers' => 'required|json',
            ]);

            $test =  HealthTest::where('id', 15)->first();

            // Save test to DB
            $test = HealthTest::create([
                'title' => $fields['title'],
                'description' => $fields['description'],
                'rating' => 0,
                'category_id' => $fields['category_id'],
                'doctor_id' => $fields['doctor_id'],
            ]);

            // Save question and answers 
            $questions_and_answers = $this->storeQuestionsAndAnswers($fields['questions_and_answers'], $test);

            return response([
                'test' => $test,
                'questions_and_answers' => $questions_and_answers,
                'message' => 'Success'
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => $e
            ], 500);
        }
    }

    /**
     * Store question and answers connected to a test
     * 
     * @param string $questions_and_answers
     * @param HealthTest $test
     * @return array 
     */
    public function storeQuestionsAndAnswers($questions_and_answers, HealthTest $test)
    {
        try {
            // Decode json
            $questions_and_answers = json_decode($questions_and_answers);

            if (!$questions_and_answers->questions) return [];

            $data = [];

            // Save each question and answer
            foreach ($questions_and_answers->questions as $question) {
                $questionFields = Validator::make(
                    [
                        'test_id' => $test->id,
                        'order_number' => $question->order_number,
                        'title' =>  $question->order_number,
                        'description' => $question->description,
                        'is_final_question' => $question->is_final_question,
                        'answers' => $question->answers,
                    ],
                    [
                        'test_id' => 'required|exists:health_test,id',
                        'order_number' => 'required|integer',
                        'title' => 'required|string',
                        'description' => 'required|string',
                        'is_final_question' => 'required|boolean',
                        'answers' => 'required|array',
                    ]
                );

                $questionAnswers = $question->answers;
                $questionAnswersData = [];

                $question = HealthTestQuestion::create([
                    'test_id' => $test->id,
                    'order_number' => $question->order_number,
                    'title' => $question->title,
                    'description' => $question->description,
                    'is_final_question' => $question->is_final_question,
                ]);

                foreach ($questionAnswers as $answer) {
                    $answerFields = Validator::make(
                        [
                            'test_id' => $test->id,
                            'question_id' => $question->id,
                            'next_question_order_number' => $answer->next_question_order_number,
                            'prev_question_order_number' => $answer->prev_question_order_number,
                            'content' => $answer->content,
                            'points' => $answer->points,
                        ],
                        [
                            'test_id' => 'required|exists:health_test,id',
                            'question_id' => 'required|integer',
                            'next_question_order_number' => 'required|integer',
                            'prev_question_order_number' => 'required|integer',
                            'content' => 'required|string',
                            'points' => 'required|float',
                        ]
                    );

                    $answer = HealthTestAnswer::create([
                        'test_id' => $test->id,
                        'question_id' => $question->id,
                        'next_question_order_number' => $answer->next_question_order_number,
                        'prev_question_order_number' => $answer->prev_question_order_number,
                        'content' => $answer->content,
                        'points' => $answer->points,
                    ]);

                    array_push($questionAnswersData, $answer);
                }

                $question->answers = $questionAnswersData;

                array_push($data, $question);
            }

            return $data;
        } catch (Throwable $e) {
            return [];
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $test =  HealthTest::where('id', $id)->first();

        if (!$test) {
            return response([
                'message' => 'Test was not found',
            ], 404);
        }

        // Load test questions and answers 
        $testQA = $this->showQuestionAndAnswers($test);

        return response([
            'test' => $test,
            'testQA' => $testQA,
        ], 200);
    }

    public function showQuestionAndAnswers(HealthTest $test)
    {
        $questions = HealthTestQuestion::where('test_id', $test->id)->get();

        foreach ($questions as $question) {
            $question->answers = HealthTestAnswer::where('question_id', $question->id)->get();
        }

        return $questions;
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
