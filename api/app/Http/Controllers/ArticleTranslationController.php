<?php

namespace App\Http\Controllers;

use App\Models\ArticleTranslation;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;


class ArticleTranslationController extends Controller
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
     * @param  \App\Models\ArticleTranslation  $articleTranslation
     * @return \Illuminate\Http\Response
     */
    public function show(ArticleTranslation $articleTranslation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ArticleTranslation  $articleTranslation
     * @return \Illuminate\Http\Response
     */
    public function edit(ArticleTranslation $articleTranslation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int id article 
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
                'content' => 'required|string',
            ]);

            $article = Article::where('id', $id)->first();
            $locale = Language::getValidLocale($locale);

            if ($article == null) {
                return response([
                    'message' => 'Article was not found',
                ], 404);
            }

            // Update or create a new record
            $articleTranslated = ArticleTranslation::updateOrCreate([
                'article_id' => $article->id,
                'locale' => $locale,
            ]);

            $articleTranslated = ArticleTranslation::where('id', $articleTranslated->id)->update([
                'title' => $fields['title'],
                'content' => $fields['content'],
            ]);

            $articleTranslated = ArticleTranslation::where('article_id', $article->id)->first();

            // Create article HTML
            $fileName = $article->id . '.html';

            if (!Storage::disk('articles')->exists($locale)) {
                Storage::disk('articles')->makeDirectory($locale, 0775, true, true);
            }

            Storage::disk('articles')->put($locale . '/' . $fileName, $articleTranslated->title . ' ' . $articleTranslated->content);

            return response([
                'articleTranslated' => $articleTranslated,
                'article' => $article,
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
     * @param  \App\Models\ArticleTranslation  $articleTranslation
     * @return \Illuminate\Http\Response
     */
    public function destroy(ArticleTranslation $articleTranslation)
    {
        //
    }
}
