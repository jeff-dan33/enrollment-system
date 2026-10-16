import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    index as coursesIndex,
    store as courseStore,
    update as courseUpdate,
} from '@/routes/courses';

export default function Create({ course = null }) {
    const form = useForm({
        coursename: course?.coursename ?? '',
    });

    const submit = (event) => {
        event.preventDefault();

        if (course) {
            form.put(courseUpdate(course.courseid).url);
            return;
        }

        form.post(courseStore().url);
    };

    return (
        <AuthenticatedLayout>
            <Head title={course ? 'Edit Course' : 'Add Course'} />

            <div className="mx-auto max-w-2xl space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {course ? 'Edit course' : 'Add course'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {course
                            ? 'Update the program name used for enrollment.'
                            : 'Add a program to the choices available when enrolling students.'}
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                    <div>
                        <label
                            htmlFor="coursename"
                            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                            Course or program name
                        </label>
                        <input
                            id="coursename"
                            type="text"
                            maxLength={100}
                            required
                            autoFocus
                            value={form.data.coursename}
                            onChange={(event) =>
                                form.setData('coursename', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.coursename)}
                            aria-describedby={
                                form.errors.coursename
                                    ? 'coursename-error'
                                    : undefined
                            }
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                        />
                        {form.errors.coursename && (
                            <p
                                id="coursename-error"
                                className="mt-1 text-sm text-red-600 dark:text-red-400"
                            >
                                {form.errors.coursename}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={coursesIndex()}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                            {form.processing
                                ? 'Saving...'
                                : course
                                  ? 'Save changes'
                                  : 'Add course'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
