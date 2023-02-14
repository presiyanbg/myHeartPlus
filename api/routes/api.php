<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*  
|
|   Unauthenticated Routes
|
*/
// Users
Route::post('/users/login', [AuthController::class, 'login']);
Route::post('/users/register', [AuthController::class, 'register']);

// Images
Route::get('image/{path}', [ImageController::class, 'getImage'])->where('path', '.*');
Route::post('image', [ImageController::class, 'uploadImage']);

// Articles
Route::post('articles', [ArticleController::class, 'index']);
Route::post('articles/view/{id}', [ArticleController::class, 'show']);

// Doctors 
Route::post('doctors', [DoctorController::class, 'index']);

/*  
|
|   Authenticated Routes
|
*/
Route::group(['middleware' => ['auth:sanctum']], function () {
    // User Routes
    Route::post('/users', [UserController::class, 'index']);
    Route::post('/users/logout', [AuthController::class, 'logout']);
    Route::post('/users/{id}', [UserController::class, 'show']);
    Route::post('articles/store', [ArticleController::class, 'store']);

    //Patients
    Route::post('patients', [PatientController::class, 'index']);
});
