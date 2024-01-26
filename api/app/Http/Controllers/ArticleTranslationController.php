<?php

namespace App\Http\Controllers;

use App\Models\ArticleTranslation;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


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
     * @param  \App\Models\Languages  $language
     * @param  \App\Models\Article  $article
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Language $language, Article $article, Request $request)
    {
        try {
            $fields = $request->validate([
                'title' => 'required|string',
                'content' => 'required|string',
            ]);

            $articleTranslated = ArticleTranslation::updateOrCreate([
                'article_id' => $article->id,
                'locale' => $language->locale,
                'title' => $fields['title'],
                'content' => $fields['content'],
            ]);

            // Create article HTML
            $fileName = $article->id . '.html';

            if (!Storage::disk('articles')->exists($language->locale)) {
                Storage::disk('articles')->makeDirectory($language->locale, 0775, true, true);
            }

            Storage::disk('articles')->put($language->locale . '/' . $fileName, $article->title . ' ' . $article->content);

            return [$articleTranslated, $article, $language, $request];
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
