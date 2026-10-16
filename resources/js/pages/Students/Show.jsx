import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { edit as studentEdit, index as studentIndex } from '@/routes/students';

export default function Show({ student }) {
    const fields = [
        ['Student ID', student.studid],
        ['Last Name', student.lname],
        ['First Name', student.fname],
        ['Middle Name', student.mname || '—'],
        ['Sex', student.sex],
        ['Birth Date', student.bdate],
        ['Address', student.address],
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Student Details" />

            <main className="mx-auto max-w-3xl space-y-6 p-6">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Student Details
                    </h1>
                    <div className="flex gap-3">
                        <Link
                            href={studentIndex().url}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Back to Students
                        </Link>
                        <Link
                            href={studentEdit(student.studid).url}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                            Edit Student
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
