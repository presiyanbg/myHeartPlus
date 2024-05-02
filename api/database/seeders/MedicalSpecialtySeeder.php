<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicalSpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('medical_specialties')->insert([
            'title' => 'Allergy and Immunology',
            'description' => 'Allergy and immunology is a subspecialty of internal medicine. An allergist-immunologist evaluates, diagnoses, and manages disorders involving the immune system. Such conditions include asthma, anaphylaxis, eczema, rhinitis, and reactions to drugs, foods, and insect stings. The field of allergy and immunology also includes the study of defects in host defense, immune deficiency diseases, and problems related to autoimmune disease, organ transplants, and faults in the immune system. Allergist-immunologists are tasked with figuring out which substance or allergen is causing a problem, how to eliminate that cause, and then treating the problem. Allergist-immunologists do a three-year residency in internal medicine or pediatrics before completing a two-year residency in allergy and immunology. The specialty may be combined with rheumatology in a three-year residency. Minimum postgraduate training: five years.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Anesthesiology',
            'description' => 'A doctor of anesthesiology—an anesthesiologist—practices anesthesia, the use of medication to produce a loss of sensation (particularly pain) in the body. Without anesthesia, most surgical operations would not be possible. Anesthesiologists are trained in the administration of anesthetics throughout surgery, childbirth, and other medical procedures. Anesthesiologists are important throughout perioperative care, which includes pre- and post-op responsibilities as well as care during procedures themselves. An anesthesiology residency lasts four years.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Cardiology',
            'description' => 'Cardiology is a subspecialty of internal medicine. A doctor of cardiology—a cardiologist—deals with diseases and maladies of the heart and blood vessels (the cardiovascular system). Cardiologists are experts in the processes and prevention of heart disease, as well as in ways to improve survival rates and the quality of life for people who have suffered from such cardiovascular problems as heart attacks or coronary artery disease. Cardiologists do a three-year residency in internal medicine before completing a three-year residency in cardiology. Minimum postgraduate training: six years.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Colon and Rectal Surgery',
            'description' => 'Colon and rectal surgeons diagnose and treat diseases of the anal canal, colon, intestinal tract, perianal area, and rectum by both medical (nonsurgical) and surgical means. When dealing with intestinal disease, these medicine specialists may also treat the female reproductive system, liver, or urinary tract. Colon and rectal surgeons operate to treat problems of the intestine and colon, and perform endoscopic procedures to deal with cancer, inflammatory conditions, and polyps. These specialists often treat such conditions as abscesses, constipation, incontinence, fissures, fistulae, and hemorrhoids through medical means. Minimum postgraduate training: six years.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Dermatology',
            'description' => 'A doctor of dermatology—a dermatologist—finds, prevents, and treats diseases of the skin, hair, nails, and adjacent mucous membranes. Dermatologists identify and treat more than 3,000 conditions, and they help improve the quality of life for people suffering from minor and irritating conditions to severe and life-threatening maladies. Dermatologists do a preliminary residency year in a broad-based clinical specialty (usually internal medicine) before completing a three-year residency in dermatology. Minimum postgraduate training: four years. ',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Emergency Medicine',
            'description' => 'A doctor of emergency medicine—an emergency physician—is a specialist in diagnosing and treating unforeseen injury or illness. In practice, an emergency medicine physician is a triage expert and specializes in taking quick action and making split-second decisions. Many emergency doctors work in the emergency department of a hospital or other facility and care for patients in the emergency room. An emergency medicine residency may combine with internal medicine or other disciplines and generally lasts three to four years. ',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Family Medicine',
            'description' => 'A doctor of family medicine—a family physician—provides primary medical care to people in every stage of life. Versatile family practice physicians treat men and women, young and old. They may provide care from before birth, throughout childhood and adulthood, and into old age. Family medicine often attracts doctors interested in a broad range of primary care and in the building of patient relationships that may last for many years. A family medicine residency is three years, but many physicians advance to combine family medicine with another specialty or with such subspecialties as geriatric or sports medicine.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'Forensic Pathology',
            'description' => 'Forensic pathology is a subspecialty of pathology that examines cases of sudden, suspicious, or violent death. Forensic pathologists try to determine the time of death, cause of death (specific injury or disease), manner of death (natural, accidental, suicidal, homicidal, or undetermined), and, if necessary, what kind of instrument caused the death. These specialists may report their findings to insurance companies, families, or courts of law. Forensic pathologists also serve as expert witnesses in court trials. A residency in forensic pathology lasts from three to five years.',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'General Surgery',
            'description' => 'General surgeons are specially trained to perform complicated procedures, and they operate to treat disease, deformities, and injuries. General surgery includes a broad spectrum of surgical conditions affecting almost any area of the body. A general surgeon makes the diagnosis and provides perioperative care to patients. General surgeons are often responsible for the comprehensive care of trauma victims and critically ill patients. Surgeons must be capable in nearly all forms of surgery, and they should be able to handle a variety of emergencies and unexpected events in the operating room. A general surgery residency is five years. ',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);

        DB::table('medical_specialties')->insert([
            'title' => 'None',
            'description' => '',
            'bg_color' => '#2e86de',
            'font_color' => '#fff'
        ]);
    }
}
