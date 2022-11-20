<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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

//  Unauthenticated Routes
Route::post('/users/login', [AuthController::class, 'login']);
Route::post('/users/register', [AuthController::class, 'register']);

//  Authenticated Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // User Routes
    Route::post('/users', [UserController::class, 'index']);
    Route::post('/users/logout', [AuthController::class, 'logout']);
    Route::post('/users/{id}', [UserController::class, 'show']);
});
