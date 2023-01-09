<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            'articles' => Article::paginate(7),
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
                'title' => 'required|string',
                'content' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Create slug for url use
            $articleSlug = str_replace(' ', '_', $fields['title']);

            // Store article image
            $imageName = $articleSlug . '-' . time() . '.' . $request->image->extension();
            $imagePath = 'images/articles/' . $imageName;
            $request->image->move(public_path('images/articles'), $imageName);

            // Save article to DB
            $article = Article::create([
                'title' => $fields['title'],
                'slug' => $articleSlug,
                'content' => $fields['content'],
                'image' => $imagePath,
            ]);

            // Check if article was created 
            if (!$article) {
                return response([
                    'message' => 'Internal error'
                ], 500);
            }

            // Create article HTML
            $fileName = $article->id . '.html';

            Storage::disk('articles')->put($fileName, $article->title);

            return response([
                'article' => $article,
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
        $article = Article::where('id', $id)->first();

        if ($article) {
            $fileName = $article->id . '.html';
            $page = null;

            if (Storage::disk('articles')->exists($fileName)) {
                $page = Storage::disk('articles')->get($fileName);
            }

            return response([
                'article' => $article,
                'page' => $page,
            ], 200);
        }

        if (!$article) {
            return response([
                'message' => 'Article was not found',
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        //
    }
}
