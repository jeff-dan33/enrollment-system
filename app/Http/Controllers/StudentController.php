<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Students/Index', [
            'students' => Student::query()->withCount('enrolled')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Students/Create');
    }

    public function show(Student $student): Response
    {
        return Inertia::render('Students/Show', [
            'student' => $student,
        ]);
    }

    public function edit(Student $student): Response
    {
        return Inertia::render('Students/Create', [
            'student' => $student,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Student::create($request->validate([
            'lname' => ['required', 'string', 'max:45'],
            'fname' => ['required', 'string', 'max:45'],
            'mname' => ['nullable', 'string', 'max:45'],
            'sex' => ['required', 'string', 'max:15'],
            'bdate' => ['required', 'date'],
            'address' => ['required', 'string', 'max:45'],
        ]));

        return to_route('students.index');
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $student->update($request->validate([
            'lname' => ['required', 'string', 'max:45'],
            'fname' => ['required', 'string', 'max:45'],
            'mname' => ['nullable', 'string', 'max:45'],
            'sex' => ['required', 'string', 'max:15'],
            'bdate' => ['required', 'date'],
            'address' => ['required', 'string', 'max:45'],
        ]));

        return to_route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        if ($student->enrolled()->exists()) {
            return to_route('students.index')
                ->with('error', 'This student has enrollment records and cannot be deleted. Remove the enrollment records first to preserve academic history.');
        }

        $student->delete();

        return to_route('students.index')->with('success', 'Student deleted successfully.');
    }
}
