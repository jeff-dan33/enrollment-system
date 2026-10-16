<?php

use App\Models\Course;
use App\Models\Enrolled;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard summarizes enrollment records by course and year level', function () {
    $this->actingAs(User::factory()->create());
    $computerScience = Course::create(['coursename' => 'Computer Science']);
    $informationTechnology = Course::create(['coursename' => 'Information Technology']);
    $firstStudent = Student::create([
        'lname' => 'Rivera',
        'fname' => 'Alex',
        'sex' => 'Female',
        'bdate' => '2005-04-12',
        'address' => 'Main Street',
    ]);
    $secondStudent = Student::create([
        'lname' => 'Santos',
        'fname' => 'Jamie',
        'sex' => 'Male',
        'bdate' => '2004-06-10',
        'address' => 'Oak Street',
    ]);
    $semester = Semester::create(['semester' => '1st Semester']);
    $schoolYear = SchoolYear::create([
        'schoolyear' => '2026-2027',
        'semid' => $semester->semid,
    ]);

    Enrolled::create([
        'studid' => $firstStudent->studid,
        'courseid' => $computerScience->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);
    Enrolled::create([
        'studid' => $secondStudent->studid,
        'courseid' => $computerScience->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'First Year',
        'section' => 'A',
    ]);
    Enrolled::create([
        'studid' => $secondStudent->studid,
        'courseid' => $informationTechnology->courseid,
        'syid' => $schoolYear->syid,
        'yearlevel' => 'Second Year',
        'section' => 'B',
    ]);

    $response = $this->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard', false)
        ->where('stats.students', 2)
        ->where('stats.enrollments', 3)
        ->where('stats.courses', 2)
        ->where('stats.school_year_semester_combinations', 1)
        ->has('enrollmentsByCourse', 2)
        ->where('enrollmentsByCourse.0.coursename', 'Computer Science')
        ->where('enrollmentsByCourse.0.enrolled_count', 2)
        ->has('enrollmentsByYearLevel', 2)
        ->where('enrollmentsByYearLevel.0.yearlevel', 'First Year')
        ->where('enrollmentsByYearLevel.0.total', 2));
});
