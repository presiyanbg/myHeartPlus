<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Upload image
     * 
     * @param  \Illuminate\Http\Request  $request
     * 
     */
    public function uploadImage(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $path = Storage::putFile('image', $request->image);
        return response()->json(['path' => $path]);
    }

    /**
     * Get image
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    public function getImage($path)
    {
        $image = Storage::get($path);
        return response($image, 200)->header('Content-Type', Storage::getMimeType($path));
    }
}
