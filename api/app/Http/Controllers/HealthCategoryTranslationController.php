<?php

namespace App\Http\Controllers;

use App\Models\HealthCategory;
use App\Models\HealthCategoryTranslation;
use App\Models\Language;
use Illuminate\Http\Request;

class HealthCategoryTranslationController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthCategoryTranslation  $healthCategoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function show(HealthCategoryTranslation $healthCategoryTranslation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthCategoryTranslation  $healthCategoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function edit(HealthCategoryTranslation $healthCategoryTranslation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int id health category 
     * @param string locale 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, string $locale, Request $request)
    {
        try {
            // Validate fields
            $fields = $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
            ]);

            $healthCategory = HealthCategory::where('id', $id)->first();
            $locale = Language::getValidLocale($locale);

            if ($healthCategory == null) {
                return response([
                    'message' => 'Health Category was not found',
                ], 404);
            }

            // Update or create a new record
            $healthCategoryTranslated = HealthCategoryTranslation::updateOrCreate([
                'health_category_id' => $healthCategory->id,
                'locale' => $locale,
            ]);

            $healthCategoryTranslated = HealthCategoryTranslation::where('id', $healthCategoryTranslated->id)->update([
                'title' => $fields['title'],
                'description' => $fields['description'],
            ]);

            $healthCategoryTranslated = HealthCategoryTranslation::where('health_category_id', $healthCategory->id)->first();

            return response([
                'healthCategoryTranslated' => $healthCategoryTranslated,
                'healthCategory' => $healthCategory,
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => 'Unhandled  exception',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthCategoryTranslation  $healthCategoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function destroy(HealthCategoryTranslation $healthCategoryTranslation)
    {
        //
    }
}
