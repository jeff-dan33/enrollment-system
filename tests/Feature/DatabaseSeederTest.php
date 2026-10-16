<?php

use App\Models\Course;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

it('seeds the admin account and enrollment reference data', function () {
    config(['admin.password' => 'password']);

    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\DatabaseSeeder']);

    $admin = User::query()->where('email', 'admin@example.com')->firstOrFail();

    expect($admin->name)->toBe('System Administrator')
        ->and(Hash::check('password', $admin->password))->toBeTrue()
        ->and($admin->is_admin)->toBeTrue()
        ->and($admin->email_verified_at)->not->toBeNull();

    expect(Semester::query()->pluck('semester')->all())
        ->toContain('1st Semester', '2nd Semester')
        ->and(SchoolYear::query()->where('schoolyear', '2026-2027')->count())->toBe(2)
        ->and(Course::query()->pluck('coursename')->all())
        ->toContain(
            'BS Computer Science',
            'BS Information Technology',
            'BS Business Administration',
            'Bachelor of Science in Information System',
            'Bachelor of Science in Information Technology',
            'Bachelor of Science in Computer Engineering',
            'Bachelor of Science in Criminology',
            'Bachelor in Public Administration',
            'Bachelor of Science in Agriculture',
        );
});

it('requires an explicit administrator password before creating the first admin', function () {
    config(['admin.password' => null]);

    expect(fn () => Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\DatabaseSeeder']))
        ->toThrow(RuntimeException::class, 'Set ADMIN_PASSWORD in .env before creating the administrator account.');

    $this->assertDatabaseMissing('users', ['email' => config('admin.email')]);
});

it('keeps the configured administrator password and demotes other admin accounts when reseeded', function () {
    config(['admin.password' => 'unused-new-password']);
    $admin = User::factory()->create([
        'email' => 'admin@example.com',
        'password' => Hash::make('existing-admin-password'),
    ]);
    $otherAdmin = User::factory()->create(['is_admin' => true]);

    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\DatabaseSeeder']);

    expect(Hash::check('existing-admin-password', $admin->fresh()->password))
        ->toBeTrue()
        ->and($admin->fresh()->is_admin)->toBeTrue()
        ->and($otherAdmin->fresh()->is_admin)->toBeFalse();
});

it('does not duplicate courses when the database seeder runs again', function () {
    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\CourseSeeder']);
    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\CourseSeeder']);

    expect(Course::query()->where('coursename', 'Bachelor of Science in Information System')->count())
        ->toBe(1)
        ->and(Course::query()->count())->toBe(9);
});

it('seeds two semesters for the school year without changing the existing admin password', function () {
    $admin = User::factory()->create([
        'email' => 'admin@example.com',
        'password' => Hash::make('existing-admin-password'),
    ]);

    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\SchoolYearSeeder']);
    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\SchoolYearSeeder']);

    expect(Semester::query()->pluck('semester')->all())
        ->toContain('1st Semester', '2nd Semester')
        ->and(SchoolYear::query()->where('schoolyear', '2026-2027')->count())->toBe(2)
        ->and(Hash::check('existing-admin-password', $admin->fresh()->password))->toBeTrue();
});
