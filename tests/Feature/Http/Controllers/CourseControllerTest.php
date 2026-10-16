<?php

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects guests from course routes to login', function () {
    $response = $this->get(route('courses.index'));

    $response->assertRedirect(route('login'));
});

it('renders courses with their enrollment counts', function () {
    $this->actingAs(User::factory()->create());
    $course = Course::create(['coursename' => 'Bachelor of Science in Agriculture']);
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    $semester = Semester::create(['semester' => 'Fall']);
    $schoolYear = SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $semester->semid,
    ]);
    Enrolled::create([
        'studid' => $student->studid,
        'courseid' => $course->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);

    $response = $this->get(route('courses.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Courses/Index', false)
        ->has('courses', 1)
        ->where('courses.0.coursename', 'Bachelor of Science in Agriculture')
        ->where('courses.0.enrolled_count', 1));
});

it('creates a course and makes it available as an enrollment choice', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('courses.store'), [
        'coursename' => 'Bachelor of Science in Computer Engineering',
    ]);

    $response->assertRedirect(route('courses.index'));
    $response->assertSessionHas('success', 'Course added successfully.');
    $this->assertDatabaseHas('courses', [
        'coursename' => 'Bachelor of Science in Computer Engineering',
    ]);
    $this->get(route('enrollments.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('courses.0.coursename', 'Bachelor of Science in Computer Engineering'));
});

it('updates a course name', function () {
    $this->actingAs(User::factory()->create());
    $course = Course::create(['coursename' => 'Old Program Name']);

    $response = $this->put(route('courses.update', $course), [
        'coursename' => 'Bachelor in Public Administration',
    ]);

    $response->assertRedirect(route('courses.index'));
    $response->assertSessionHas('success', 'Course updated successfully.');
    $this->assertDatabaseHas('courses', [
        'courseid' => $course->courseid,
        'coursename' => 'Bachelor in Public Administration',
    ]);
});

it('requires a course name', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('courses.store'), []);

    $response->assertSessionHasErrors('coursename');
    $this->assertDatabaseCount('courses', 0);
});

it('rejects a course name longer than the database column', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('courses.store'), [
        'coursename' => str_repeat('a', 101),
    ]);

    $response->assertSessionHasErrors('coursename');
    $this->assertDatabaseCount('courses', 0);
});
