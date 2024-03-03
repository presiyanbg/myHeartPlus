<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleTranslationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\HealthCategoryController;
use App\Http\Controllers\HealthTestAdviceController;
use App\Http\Controllers\HealthTestController;
use App\Http\Controllers\HealthTestResultController;
use App\Http\Controllers\MedicamentController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImagesController;
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
Route::get('users/{id}', [UserController::class, 'show']);

// Images
Route::get('logo', [ImagesController::class, 'getLogo']);
Route::get('image/{path}', [ImagesController::class, 'getImage'])->where('path', '.*');
Route::get('banners', [ImagesController::class, 'getBanners']);
Route::post('image', [ImagesController::class, 'uploadImage']);

// Articles
Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
Route::post('articles/{id}/updateViews', [ArticleController::class, 'updateViews']);

// Doctors 
Route::get('doctors', [DoctorController::class, 'index']);
Route::get('doctors/{id}', [DoctorController::class, 'show']);
Route::get('doctors/{id}/health-tests', [DoctorController::class, 'showHealthTests']);
Route::get('doctors/{id}/prescriptions', [DoctorController::class, 'showPrescriptions']);
Route::get('doctors/{id}/patients', [DoctorController::class, 'showPatients']);

// Health tests
Route::get('health-tests', [HealthTestController::class, 'index']);
Route::get('health-tests/{id}', [HealthTestController::class, 'show']);
Route::post('health-tests/submit-result', [HealthTestController::class, 'storeResult']);

// Health categories
Route::get('health-category', [HealthCategoryController::class, 'index']);
Route::get('health-category/{id}', [HealthCategoryController::class, 'show']);

// Prescription categories
Route::get('prescriptions', [PrescriptionController::class, 'index']);
Route::get('prescriptions/{id}', [PrescriptionController::class, 'show']);

// Medicaments categories
Route::get('medicaments', [MedicamentController::class, 'index']);
Route::get('medicaments/{id}', [MedicamentController::class, 'show']);

// Organizations 
Route::get('organizations', [OrganizationController::class, 'index']);
Route::get('organizations/{id}/centres', [OrganizationController::class, 'showCentres']);
Route::get('organizations/{id}/doctors', [OrganizationController::class, 'showDoctors']);

/*  
|
|   Authenticated Routes
|
*/
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Users
    Route::post('users/logout', [AuthController::class, 'logout']);
    Route::post('users/{id}/update', [UserController::class, 'update']);

    // Articles
    Route::post('articles/store', [ArticleController::class, 'store']);
    Route::post('articles/{id}/update/', [ArticleController::class, 'update']);
    Route::post('articles/{id}/update/{locale}', [ArticleTranslationController::class, 'update']);

    // Patients
    Route::post('patients', [PatientController::class, 'index']);
    Route::post('patients/{id}/health-results', [PatientController::class, 'showHealthTestResults']);

    // Doctors 
    Route::post('doctors/{id}/update', [DoctorController::class, 'update']);

    // Doctors - Prescriptions 
    Route::post('doctors/{id}/prescriptions/store', [PrescriptionController::class, 'store']);

    // Health tests
    Route::post('health-tests/store', [HealthTestController::class, 'store']);

    // Health categories
    Route::post('health-category/store', [HealthCategoryController::class, 'store']);

    // Health Advices
    Route::post('health-advice/store', [HealthTestAdviceController::class, 'store']);

    // Health Result
    Route::post('health-results/{id}', [HealthTestResultController::class, 'show']);

    // Medicaments 
    Route::post('medicaments/store', [MedicamentController::class, 'store']);
});
