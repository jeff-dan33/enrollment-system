<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'students' => Student::query()->count(),
                'enrollments' => Enrolled::query()->count(),
                'courses' => Course::query()->count(),
                'school_year_semester_combinations' => SchoolYear::query()->count(),
            ],
            'enrollmentsByCourse' => Course::query()
                ->withCount('enrolled')
                ->orderByDesc('enrolled_count')
                ->orderBy('coursename')
                ->get(['courseid', 'coursename']),
            'enrollmentsByYearLevel' => Enrolled::query()
                ->select('yearlevel')
                ->selectRaw('COUNT(*) as total')
                ->groupBy('yearlevel')
                ->orderBy('yearlevel')
                ->get(),
        ]);
    }
}
