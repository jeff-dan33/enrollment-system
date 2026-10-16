<?php

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('renders enrollments with their related student, course, and school year', function () {
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
    Enrolled::create([
        'studid' => $student->studid,
        'courseid' => $course->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);

    $response = $this->get(route('enrollments.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Enrollment/Index', false)
        ->has('enrollments', 1)
        ->where('enrollments.0.student.fname', 'Alex')
        ->where('enrollments.0.course.coursename', 'Computer Science')
        ->where('enrollments.0.school_year.schoolyear', '2026-2027')
        ->where('enrollments.0.school_year.semester.semester', '1st Semester'));
});

it('renders enrollment choices including each school year semester', function () {
    $this->actingAs(User::factory()->create());
    Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    Course::create(['coursename' => 'Computer Science']);
    $firstSemester = Semester::create(['semester' => '1st Semester']);
    $secondSemester = Semester::create(['semester' => '2nd Semester']);
    SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $firstSemester->semid,
    ]);
    SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $secondSemester->semid,
    ]);

    $response = $this->get(route('enrollments.create'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Enrollment/Create', false)
        ->has('students', 1)
        ->has('courses', 1)
        ->has('schoolyears', 2)
        ->where('schoolyears.0.schoolyear', '2026-2027')
        ->where('schoolyears.0.semester.semester', '1st Semester')
        ->where('schoolyears.1.schoolyear', '2026-2027')
        ->where('schoolyears.1.semester.semester', '2nd Semester'));
});

it('creates an enrollment and redirects to the enrollment list with a success message', function () {
    $this->actingAs(User::factory()->create());
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    $course = Course::create(['coursename' => 'Computer Science']);
    $semester = Semester::create(['semester' => '2nd Semester']);
    $schoolYear = SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $semester->semid,
    ]);

    $response = $this->post(route('enrollments.store'), [
        'studid' => $student->studid,
        'courseid' => $course->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);

    $response->assertRedirect(route('enrollments.index'));
    $response->assertSessionHas('success', 'Enrollment created successfully.');
    $this->assertDatabaseHas('enrolled', [
        'studid' => $student->studid,
        'courseid' => $course->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);
});

it('provides the selected school year and semester when editing an enrollment', function () {
    $this->actingAs(User::factory()->create());
    $student = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    $course = Course::create(['coursename' => 'Computer Science']);
    $semester = Semester::create(['semester' => '2nd Semester']);
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

    $response = $this->get(route('enrollments.edit', $enrollment));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Enrollment/Create', false)
        ->where('enrollment.syid', $schoolYear->syid)
        ->where('schoolyears.0.schoolyear', '2026-2027')
        ->where('schoolyears.0.semester.semester', '2nd Semester'));
});

it('rejects enrollment references that do not exist', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('enrollments.store'), [
        'studid' => 999,
        'courseid' => 999,
        'syid' => 999,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);

    $response->assertSessionHasErrors(['studid', 'courseid', 'syid']);
    $this->assertDatabaseCount('enrolled', 0);
});
