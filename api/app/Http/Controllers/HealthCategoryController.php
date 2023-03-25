<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateHealthCategoryRequest;
use App\Models\HealthCategory;
use Illuminate\Http\Request;

class HealthCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = HealthCategory::paginate(10);

            return response([
                'categories' => $categories
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'title' => 'required|string|unique:health_categories,title',
                'description' => 'required|string',
            ]);

            // Save category to DB
            $category = HealthCategory::create([
                'title' => $fields['title'],
                'description' => $fields['description'],
            ]);

            return response([
                'category' => $category,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            if ($id == 0) {
                $healthCategory = HealthCategory::take(1)->first();
            }

            if ($id > 0) {
                $healthCategory = HealthCategory::where('id', $id)->first();
            }

            return response([
                'category' => $healthCategory,
                'message' => 'Success'
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
     * @param  \App\Models\HealthCategory  $healthCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthCategory $healthCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthCategoryRequest  $request
     * @param  \App\Models\HealthCategory  $healthCategory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHealthCategoryRequest $request, HealthCategory $healthCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthCategory  $healthCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthCategory $healthCategory)
    {
        //
    }
}
