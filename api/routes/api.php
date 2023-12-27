<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HealthCategoryController;
use App\Http\Controllers\HealthTestAdviceController;
use App\Http\Controllers\HealthTestController;
use App\Http\Controllers\HealthTestResultController;
use App\Http\Controllers\MedicamentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
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
Route::post('users/login', [AuthController::class, 'login']);
Route::post('users/register', [AuthController::class, 'register']);
Route::get('users', [UserController::class, 'index']);
Route::get('users/view/{id}', [UserController::class, 'show']);

// Images
Route::get('image/{path}', [ImageController::class, 'getImage'])->where('path', '.*');
Route::post('image', [ImageController::class, 'uploadImage']);

// Articles
Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/top', [ArticleController::class, 'indexTop']);
Route::get('articles/view/{id}', [ArticleController::class, 'show']);
Route::post('articles/updateViews/{id}', [ArticleController::class, 'updateViews']);

// Doctors 
Route::get('doctors', [DoctorController::class, 'index']);
Route::get('doctors/view/{id}', [DoctorController::class, 'show']);
Route::get('doctors/{id}/health-tests', [DoctorController::class, 'showHealthTests']);
Route::get('doctors/{id}/prescriptions', [DoctorController::class, 'showPrescriptions']);

// Health tests
Route::get('health-tests', [HealthTestController::class, 'index']);
Route::get('health-tests/view/{id}', [HealthTestController::class, 'show']);
Route::post('health-tests/submit-result', [HealthTestController::class, 'storeResult']);

// Health categories
Route::get('health-category', [HealthCategoryController::class, 'index']);

// Prescription categories
Route::get('prescriptions', [PrescriptionController::class, 'index']);
Route::get('prescriptions/view/{id}', [PrescriptionController::class, 'show']);

// Medicaments categories
Route::get('medicaments', [MedicamentController::class, 'index']);
Route::get('medicaments/view/{id}', [MedicamentController::class, 'show']);

/*  
|
|   Authenticated Routes
|
*/
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Users
    Route::post('users/logout', [AuthController::class, 'logout']);
    Route::post('users/update/{id}', [UserController::class, 'update']);

    // Articles
    Route::post('articles/store', [ArticleController::class, 'store']);

    // Patients
    Route::post('patients', [PatientController::class, 'index']);

    // Doctors 
    Route::post('doctors/{doctor}/showPatients/', [DoctorController::class, 'showPatients']);

    // Health tests
    Route::post('health-tests/store', [HealthTestController::class, 'store']);

    // Health categories
    Route::post('health-category/store', [HealthCategoryController::class, 'store']);
    Route::post('health-category/view/{id}', [HealthCategoryController::class, 'show']);

    // Health Advices
    Route::post('health-advice/store', [HealthTestAdviceController::class, 'store']);

    // Health Result
    Route::post('health-results/view/{result}', [HealthTestResultController::class, 'show']);
    Route::post('health-results/{patient}', [HealthTestResultController::class, 'showResults']);

    // Medicaments 
    Route::post('medicaments/store', [MedicamentController::class, 'store']);

    // Prescriptions 
    Route::post('prescriptions/store', [PrescriptionController::class, 'store']);
});
