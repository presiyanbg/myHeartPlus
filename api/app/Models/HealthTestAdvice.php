<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthTestAdvice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'test_id',
        'medicament_id',
        'prescription_id',
        'title',
        'content',
        'max_points',
        'min_points',
    ];

    /**
     * Find advice by health test result  
     * 
     * @param int $test_id ID of Health test  
     * @param int $result Result calculated from test answers
     */
    public static function findAdviceByTestResult(int $test_id, int $result)
    {
        $testAdvices = HealthTestAdvice::where('test_id', $test_id)->get();

        // Stop if no results are saved for test
        if (!$testAdvices || count($testAdvices) == 0) return;

        $advice = $testAdvices[0];

        // Find the best advices based on result points 
        foreach ($testAdvices as $testAdvice) {
            if ($result >= $testAdvice->min_points && $result <= $testAdvice->max_points) {
                $advice = $testAdvice;
            }
        }

        // Get medicament and/or prescription 
        $advice->medicament = Medicament::where('id', $advice->medicament_id)->first();
        $advice->prescription = Prescription::where('id', $advice->prescription_id)->first();

        return $advice;
    }
}
