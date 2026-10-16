<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()
            ->where('is_admin', true)
            ->where('email', '!=', config('admin.email'))
            ->update(['is_admin' => false]);

        $admin = User::firstOrNew(['email' => config('admin.email')]);

        if (! $admin->exists) {
            $password = config('admin.password');

            if (! is_string($password) || $password === '') {
                throw new \RuntimeException('Set ADMIN_PASSWORD in .env before creating the administrator account.');
            }

            $admin->fill([
                'name' => config('admin.name'),
                'password' => Hash::make($password),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]);
        }

        $admin->forceFill([
            'email_verified_at' => $admin->email_verified_at ?? now(),
            'is_admin' => true,
        ])->save();

        $this->call(SchoolYearSeeder::class);
        $this->call(CourseSeeder::class);
    }
}
