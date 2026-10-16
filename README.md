# MIST Enrollment System

A Laravel and React enrollment app for managing students, courses, school years, semesters, and enrollments.

## Important: each clone is separate

When classmates clone this repository and run it on their own computers, every clone has its own local database, administrator account, and enrollment records. Student or enrollment data entered on one computer is **not** shared with other classmates. This setup does not deploy a shared website.

Public account registration is disabled. Each person who runs a fresh local copy creates its initial administrator during setup.

## Requirements

- PHP 8.3 or newer, with PDO SQLite enabled
- Composer 2
- Node.js 22 or newer and npm
- Git

## Windows setup

Open PowerShell and run:

```powershell
git clone <GitHub-repository-url>
cd enrollment-system
composer run setup
```

The setup command installs dependencies, creates `.env` from `.env.example`, generates an application key, creates the local SQLite file if needed, runs migrations, and builds the frontend.

Before creating your administrator, open `.env` and set an email and a strong, unique local password:

```dotenv
ADMIN_NAME="System Administrator"
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-this-with-your-own-strong-password
```

Keep `.env` private. It is ignored by Git and must never be uploaded to GitHub. Do not reuse or share another person's administrator password.

Create the administrator and seed the initial courses and academic terms:

```powershell
php artisan db:seed
```

Start the app:

```powershell
php artisan serve --host=127.0.0.1 --port=8000
```

Open [http://localhost:8000/login](http://localhost:8000/login) and sign in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you configured. The password is stored as a hash in the local database; the seeder does not replace it when run again for an existing administrator.

## Tests and frontend checks

```powershell
php artisan test
npm run check
npm run types:check
```

## GitHub and data safety

- Do not commit `.env`, database files, backups, real student records, passwords, or application keys.
- The SQLite database is local application data and is excluded from Git.
- A public GitHub clone lets someone run their **own** installation; it does not give them access to your computer or a separately hosted system.
- If the class needs one shared online system, it must be deployed separately with a secured server and database. Do not put a shared production database password in this repository.
