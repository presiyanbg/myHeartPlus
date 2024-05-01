<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthCategoryTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'health_category_id',
        'locale',
        'title',
        'description',
    ];

    /**
     * Translate 
     * 
     * @param App\Models\HealthCategory $health_category
     * @return App\Models\HealthCategory $health_category
     */
    public static function translate(HealthCategory $health_category, string $locale)
    {
        if (!($health_category instanceof HealthCategory) || strlen($locale) <= 0) return new HealthCategory();

        $health_category_translation = HealthCategoryTranslation::where([
            ['health_category_id', '=', $health_category->id],
            ['locale', '=', $locale],
        ])->first() ?? $health_category;

        $health_category->title = $health_category_translation->title;
        $health_category->description = $health_category_translation->description;

        return $health_category;
    }
}
