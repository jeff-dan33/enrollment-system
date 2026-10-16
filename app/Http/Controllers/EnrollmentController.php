<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Enrollment/Index', [
            'enrollments' => Enrolled::with(['student', 'course', 'schoolYear.semester'])->get(),
        ]);
    }

    public function show(Enrolled $enrollment): Response
    {
        return Inertia::render('Enrollment/Show', [
            'enrollment' => $enrollment->load(['student', 'course', 'schoolYear.semester']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Enrollment/Create', [
            'students' => Student::query()->get(['studid', 'fname', 'lname']),
            'courses' => Course::query()->get(['courseid', 'coursename']),
            'schoolyears' => SchoolYear::with('semester')
                ->orderBy('schoolyear')
                ->orderBy('semid')
                ->get(),
        ]);
    }

    public function edit(Enrolled $enrollment): Response
    {
        return Inertia::render('Enrollment/Create', [
            'enrollment' => $enrollment,
            'students' => Student::query()->get(['studid', 'fname', 'lname']),
            'courses' => Course::query()->get(['courseid', 'coursename']),
            'schoolyears' => SchoolYear::with('semester')
                ->orderBy('schoolyear')
                ->orderBy('semid')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Enrolled::create($request->validate([
            'studid' => ['required', 'integer', 'exists:students,studid'],
            'courseid' => ['required', 'integer', 'exists:courses,courseid'],
            'syid' => ['required', 'integer', 'exists:schoolyears,syid'],
            'yearlevel' => ['required', 'string', 'max:20'],
            'section' => ['required', 'string', 'max:10'],
        ]));

        return to_route('enrollments.index')->with('success', 'Enrollment created successfully.');
    }

    public function update(Request $request, Enrolled $enrollment): RedirectResponse
    {
        $enrollment->update($request->validate([
            'studid' => ['required', 'integer', 'exists:students,studid'],
            'courseid' => ['required', 'integer', 'exists:courses,courseid'],
            'syid' => ['required', 'integer', 'exists:schoolyears,syid'],
            'yearlevel' => ['required', 'string', 'max:20'],
            'section' => ['required', 'string', 'max:10'],
        ]));

        return to_route('enrollments.index')->with('success', 'Enrollment updated successfully.');
    }

    public function destroy(Enrolled $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return to_route('enrollments.index')->with('success', 'Enrollment deleted successfully.');
    }
}
