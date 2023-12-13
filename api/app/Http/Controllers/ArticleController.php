<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
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
        $articles = Article::orderByDesc('created_at')->paginate(10);

        // Get name of article writer
        foreach ($articles as $article) {
            $writer = User::where('id', $article->writer_id)->first();

            if ($writer) {
                $article->writer = $writer->full_name;
            }

            if (!$writer) {
                $article->writer = 'Presiyan Tsonevski';
            }
        }

        return response([
            'articles' => $articles
        ], 200);
    }

    /**
     * Get top articles ordered by views.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexTop()
    {
        $articles = Article::orderByDesc('total_views')->paginate(10);

        // Get name of article writer
        foreach ($articles as $article) {
            $writer = User::where('id', $article->writer_id)->first();

            if ($writer) {
                $article->writer = $writer->full_name;
            }

            if (!$writer) {
                $article->writer = 'Presiyan Tsonevski';
            }
        }

        return response([
            'articles' => $articles
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

            $writer = User::where('id', $article->writer_id)->first();

            return response([
                'article' => $article,
                'writer' => $writer,
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
     * Update article moment and total views.
     *
     * @param  int  $id
     * @param  int  $prev_id
     * @return \Illuminate\Http\Response
     */
    public function updateViews($id)
    {
        try {
            $article = Article::where('id', $id)->first();

            // Update articles views
            Article::where('id', $article->id)
                ->update([
                    'total_views' => intval($article->total_views + 1),
                    'moment_views' => intval($article->moment_views + 1),
                ]);

            return response([
                'article' => $article,
            ], 200);
        } catch (Throwable $e) {
            return response([
                'message' => 'Article was not found',
            ], 404);
        }
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
