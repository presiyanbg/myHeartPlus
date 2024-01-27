<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Language extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'locale',
        'name',
        'name_in_native_language',
        'date_format',
        'currency',
    ];

    /**
     * Check if locale is valid or return defaut locale.
     *
     * @param  string locale 
     * @return string locale
     */
    public static function getValidLocale(string $locale)
    {
        $language = Language::where('locale', $locale)->first();

        if (!$language) {
            return App::getLocale();
        }

        return $language->locale;
    }
}
