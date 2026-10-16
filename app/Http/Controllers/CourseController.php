<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Courses/Index', [
            'courses' => Course::query()
                ->withCount('enrolled')
                ->orderBy('coursename')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Courses/Create');
    }

    public function edit(Course $course): Response
    {
        return Inertia::render('Courses/Create', [
            'course' => $course,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Course::create($request->validate([
            'coursename' => ['required', 'string', 'max:100'],
        ]));

        return to_route('courses.index')->with('success', 'Course added successfully.');
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $course->update($request->validate([
            'coursename' => ['required', 'string', 'max:100'],
        ]));

        return to_route('courses.index')->with('success', 'Course updated successfully.');
    }
}
