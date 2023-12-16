<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicamentRequest;
use App\Http\Requests\UpdateMedicamentRequest;
use App\Models\HealthCategory;
use App\Models\Medicament;
use Illuminate\Http\Request;

class MedicamentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicaments = Medicament::paginate(10);

        // Get category for medicament
        foreach ($medicaments as $medicament) {
            $medicament->category = HealthCategory::where('id', $medicament->category_id)->first();
        }

        return response([
            'medicaments' => $medicaments
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
                'category_id' => 'required|exists:health_categories,id',
                'title' => 'required|string',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Create slug for url use
            $medicamentSlug = str_replace(' ', '_', $fields['title']);

            // Store medicament image
            $imageName = $medicamentSlug . '-' . time() . '.' . $request->image->extension();
            $imagePath = 'images/medicaments/' . $imageName;
            $request->image->move(public_path('images/medicaments'), $imageName);

            // Save medicament to DB
            $medicament = Medicament::create([
                'category_id' => $fields['category_id'],
                'title' => $fields['title'],
                'description' => $fields['description'],
                'image' => $imagePath,
            ]);

            // Check if medicaments was created 
            if (!$medicament) {
                return response([
                    'message' => 'Internal error'
                ], 500);
            }

            return response([
                'medicament' => $medicament,
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
        $medicament = Medicament::where('id', $id)->first();

        if (!$medicament) {
            return response([
                'message' => 'Medicament was not found',
            ], 404);
        }

        // Load category 
        $medicament->category = HealthCategory::where('id', $medicament->category_id)->first();

        return response([
            'medicament' => $medicament,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Medicament  $medicament
     * @return \Illuminate\Http\Response
     */
    public function edit(Medicament $medicament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMedicamentRequest  $request
     * @param  \App\Models\Medicament  $medicament
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMedicamentRequest $request, Medicament $medicament)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Medicament  $medicament
     * @return \Illuminate\Http\Response
     */
    public function destroy(Medicament $medicament)
    {
        //
    }
}
