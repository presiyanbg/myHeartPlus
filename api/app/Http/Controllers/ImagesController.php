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
     * Get logo
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    public function getLogo()
    {
        $image = Storage::get('images/logo/logo.png');
        return response($image, 200)->header('Content-Type', Storage::getMimeType('images/logo/logo.png'));
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

    /**
     * Get banners
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    public function getBanners()
    {
        $imageDir = public_path('images/banners');
        $images = [];

        foreach (scandir($imageDir) as $path) {
            if (!is_dir($imageDir . '/' . $path)) {
                $images[] = '/images/banners/' . $path;
            }
        }

        return response($images, 200);
    }
}
