import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    store as studentStore,
    update as studentUpdate,
} from '@/routes/students';

export default function Create({ student = null }) {
    const form = useForm({
        lname: student?.lname ?? '',
        fname: student?.fname ?? '',
        mname: student?.mname ?? '',
        sex: student?.sex ?? 'Male',
        bdate: student?.bdate ?? '',
        address: student?.address ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (student) {
            form.put(studentUpdate(student.studid).url);
            return;
        }

        form.post(studentStore().url);
    };

    return (
        <AuthenticatedLayout>
            <Head title={student ? 'Edit Student' : 'Add Student'} />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {student ? 'Edit Student' : 'Add Student'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Fill in the student details below.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={form.data.lname}
                                onChange={(e) =>
                                    form.setData('lname', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.lname && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.lname}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={form.data.fname}
                                onChange={(e) =>
                                    form.setData('fname', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.fname && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.fname}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                value={form.data.mname}
                                onChange={(e) =>
                                    form.setData('mname', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.mname && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.mname}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Sex
                            </label>
                            <select
                                value={form.data.sex}
                                onChange={(e) =>
                                    form.setData('sex', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {form.errors.sex && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.sex}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                value={form.data.bdate}
                                onChange={(e) =>
                                    form.setData('bdate', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.bdate && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.bdate}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Address
                            </label>
                            <input
                                type="text"
                                value={form.data.address}
                                onChange={(e) =>
                                    form.setData('address', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.address && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.address}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-3">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {form.processing
                                ? 'Saving...'
                                : student
                                  ? 'Update Student'
                                  : 'Save Student'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
