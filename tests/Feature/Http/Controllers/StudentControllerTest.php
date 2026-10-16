<?php

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects guests from student routes to login', function () {
    $response = $this->get(route('students.index'));

    $response->assertRedirect(route('login'));
});

it('requires authentication to delete a student', function () {
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);

    $response = $this->delete(route('students.destroy', $student));

    $response->assertRedirect(route('login'));
    $this->assertModelExists($student);
});

it('renders the student index with all students', function () {
    $this->actingAs(User::factory()->create());
    Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);

    $response = $this->get(route('students.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Students/Index', false)
        ->has('students', 1)
        ->where('students.0.lname', 'Rivera'));
});

it('renders the student creation form', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get(route('students.create'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Students/Create', false));
});

it('creates a student and redirects to the student index', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('students.store'), [
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'mname' => null,
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);

    $response->assertRedirect(route('students.index'));
    $this->assertDatabaseHas('students', [
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'mname' => null,
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
});

it('rejects a student without required details', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('students.store'), []);

    $response->assertSessionHasErrors([
        'lname',
        'fname',
        'sex',
        'bdate',
        'address',
    ]);
    $this->assertDatabaseCount('students', 0);
});

it('deletes a student without enrollment records', function () {
    $this->actingAs(User::factory()->create());
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);

    $response = $this->delete(route('students.destroy', $student));

    $response->assertRedirect(route('students.index'));
    $response->assertSessionHas('success', 'Student deleted successfully.');
    $this->assertDatabaseMissing('students', ['studid' => $student->studid]);
});

it('preserves a student and their enrollment history when deletion is requested', function () {
    $this->actingAs(User::factory()->create());
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    $course = Course::create(['coursename' => 'Computer Science']);
    $semester = Semester::create(['semester' => '1st Semester']);
    $schoolYear = SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $semester->semid,
    ]);
    $enrollment = Enrolled::create([
        'studid' => $student->studid,
        'courseid' => $course->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);

    $response = $this->delete(route('students.destroy', $student));

    $response->assertRedirect(route('students.index'));
    $response->assertSessionHas('error', 'This student has enrollment records and cannot be deleted. Remove the enrollment records first to preserve academic history.');
    $this->assertModelExists($student);
    $this->assertModelExists($enrollment);
});
