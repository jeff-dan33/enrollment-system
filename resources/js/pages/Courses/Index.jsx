import { Head, Link, usePage } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { create as courseCreate, edit as courseEdit } from '@/routes/courses';

export default function Index({ courses = [] }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            Courses
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Manage programs available for student enrollment.
                        </p>
                    </div>

                    <Link
                        href={courseCreate()}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                    >
                        <Plus className="size-4" />
                        Add course
                    </Link>
                </div>

                {flash?.success && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
                    >
                        {flash.success}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Program
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Enrolled students
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {courses.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            No courses yet. Add a program to
                                            make it available for enrollment.
                                        </td>
                                    </tr>
                                ) : (
                                    courses.map((course) => (
                                        <tr
                                            key={course.courseid}
                                            className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-100">
                                                {course.coursename}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {course.enrolled_count}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={courseEdit(
                                                        course.courseid,
                                                    )}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
