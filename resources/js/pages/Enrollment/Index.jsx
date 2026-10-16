import { Head, Link, usePage } from '@inertiajs/react';
import { ClipboardList, Pencil, Plus } from 'lucide-react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    create as enrollmentCreate,
    edit as enrollmentEdit,
} from '@/routes/enrollments';

export default function Index({ enrollments = [] }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Enrollments" />

            <main className="space-y-6 p-4 md:p-6">
                <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                            <ClipboardList className="size-6" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
                                Academic records
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                Enrollments
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Review each student’s program, year level, and
                                academic term.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={enrollmentCreate()}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                    >
                        <Plus className="size-4" />
                        New enrollment
                    </Link>
                </section>

                {flash?.success && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
                    >
                        {flash.success}
                    </div>
                )}

                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                                Enrollment register
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {enrollments.length.toLocaleString()} enrollment
                                {enrollments.length === 1 ? '' : 's'} recorded
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-800/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Student
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Course
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Year Level &amp; Section
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        School Year &amp; Semester
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {enrollments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            No enrollments yet. Create an
                                            enrollment to populate this
                                            register.
                                        </td>
                                    </tr>
                                ) : (
                                    enrollments.map((enrollment) => (
                                        <tr
                                            key={enrollment.id}
                                            className="bg-white transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                                        >
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {[
                                                    enrollment.student?.fname,
                                                    enrollment.student?.lname,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ') || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {enrollment.course
                                                    ?.coursename ?? '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {[
                                                    enrollment.yearlevel,
                                                    enrollment.section,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' / ') || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {[
                                                    enrollment.school_year
                                                        ?.schoolyear,
                                                    enrollment.school_year
                                                        ?.semester?.semester,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' - ') || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={enrollmentEdit(
                                                        enrollment.id,
                                                    )}
                                                    aria-label="Edit enrollment"
                                                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                                >
                                                    <Pencil className="size-4" />
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
