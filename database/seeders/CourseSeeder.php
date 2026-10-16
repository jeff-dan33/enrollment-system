<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            'BS Computer Science',
            'BS Information Technology',
            'BS Business Administration',
            'Bachelor of Science in Information System',
            'Bachelor of Science in Information Technology',
            'Bachelor of Science in Computer Engineering',
            'Bachelor of Science in Criminology',
            'Bachelor in Public Administration',
            'Bachelor of Science in Agriculture',
        ] as $courseName) {
            Course::firstOrCreate(['coursename' => $courseName]);
        }
    }
}
