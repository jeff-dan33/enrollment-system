import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    edit as enrollmentEdit,
    index as enrollmentIndex,
} from '@/routes/enrollments';

export default function Show({ enrollment }) {
    const schoolYear = enrollment.school_year;
    const fields = [
        [
            'Student',
            [enrollment.student?.fname, enrollment.student?.lname]
                .filter(Boolean)
                .join(' ') || '—',
        ],
        ['Course', enrollment.course?.coursename ?? '—'],
        ['Year Level', enrollment.yearlevel],
        ['Section', enrollment.section],
        [
            'School Year / Semester',
            [schoolYear?.schoolyear, schoolYear?.semester?.semester]
                .filter(Boolean)
                .join(' - ') || '—',
        ],
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Enrollment Details" />

            <main className="mx-auto max-w-3xl space-y-6 p-6">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Enrollment Details
                    </h1>
                    <div className="flex gap-3">
                        <Link
                            href={enrollmentIndex().url}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Back to Enrollments
                        </Link>
                        <Link
                            href={enrollmentEdit(enrollment.id).url}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                            Edit Enrollment
                        </Link>
                    </div>
                </header>

                <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2 dark:border-slate-700 dark:bg-slate-900">
                    {fields.map(([label, value]) => (
                        <div key={label}>
                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {label}
                            </dt>
                            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </main>
        </AuthenticatedLayout>
    );
}
