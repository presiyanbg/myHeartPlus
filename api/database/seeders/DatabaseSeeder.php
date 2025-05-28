<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HealthCategory;
use App\Models\HealthTestAdvice;
use App\Models\HealthTestQuestionsAndAnswers;
use App\Models\HealthTestResult;
use App\Models\MedicalSpecialty;
use App\Models\Medicament;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            LanguageSeeder::class,
            OrganizationSeeder::class,
            DoctorSeeder::class,
            PatientSeeder::class,
            PrescriptionSeeder::class,
            HealthCategorySeeder::class,
            HealthTestAdviceSeeder::class,
            HealthTestQuestionsAndAnswersSeeder::class,
            HealthTestQuestionSeeder::class,
            HealthTestResultSeeder::class,
            HealthTestSeeder::class,
            MedicalSpecialtySeeder::class,
            MedicamentSeeder::class,
            UserRoleSeeder::class,
        ]);
    }
}
