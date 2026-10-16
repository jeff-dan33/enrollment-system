<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use App\Models\Semester;
use Illuminate\Database\Seeder;

class SchoolYearSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['1st Semester', '2nd Semester'] as $semesterName) {
            $semester = Semester::firstOrCreate(['semester' => $semesterName]);

            SchoolYear::firstOrCreate([
                'schoolyear' => '2026-2027',
                'semid' => $semester->semid,
            ]);
        }
    }
}
