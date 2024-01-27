<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'article_id',
        'locale',
        'title',
        'content',
    ];

    public static function translate(Article $article, string $locale)
    {
        if (!$article || strlen($locale) <= 0) return;

        $articleTranslated = ArticleTranslation::where([
            ['article_id', '=', $article->id],
            ['locale', '=', $locale],
        ])->first() ?? $article;

        $article->title = $articleTranslated->title;
        $article->content = $articleTranslated->content;

        return $article;
    }
}
