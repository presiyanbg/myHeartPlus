<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicament extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'title',
        'image',
        'description',
        'rating',
    ];

    /**
     * Display medicaments from array.
     *
     * @param  string array of connected medicaments 
     * @return array App\Models\Medicament
     */
    public static function shotMedicaments($medicamentsIDs)
    {
        $medicamentsIDs = json_decode($medicamentsIDs);
        $medicaments = [];

        // Check if json is valid 
        if (json_last_error() != 0 && is_array($medicamentsIDs)) {
            return $medicaments;
        }

        foreach ($medicamentsIDs as $medId) {
            // Load medicament 
            $medicament = Medicament::where('id', $medId)->first();

            // Load category 
            $medicament->category = HealthCategory::where('id', $medicament->category_id)->first();

            if ($medicament) {
                array_push($medicaments, $medicament);
            }
        }

        return $medicaments;
    }
}
