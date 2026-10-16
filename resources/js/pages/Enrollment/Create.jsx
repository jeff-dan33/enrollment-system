import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    store as enrollmentStore,
    update as enrollmentUpdate,
} from '@/routes/enrollments';

export default function Create({
    students = [],
    courses = [],
    schoolyears = [],
    enrollment = null,
}) {
    const enrolledSchoolYear = schoolyears.find(
        (schoolyear) => schoolyear.syid === enrollment?.syid,
    );
    const [selectedSchoolYear, setSelectedSchoolYear] = useState(
        enrolledSchoolYear?.schoolyear ?? '',
    );
    const [selectedSemester, setSelectedSemester] = useState(
        enrolledSchoolYear?.semester?.semester ?? '',
    );
    const form = useForm({
        studid: enrollment?.studid ?? '',
        courseid: enrollment?.courseid ?? '',
        syid: enrollment?.syid ?? '',
        yearlevel: enrollment?.yearlevel ?? '',
        section: enrollment?.section ?? '',
    });
    const schoolYearOptions = [
        ...new Set(schoolyears.map((schoolyear) => schoolyear.schoolyear)),
    ];
    const semesterOptions = schoolyears.filter(
        (schoolyear) => schoolyear.schoolyear === selectedSchoolYear,
    );

    const submit = (e) => {
        e.preventDefault();

        if (enrollment) {
            form.put(enrollmentUpdate(enrollment.id).url);
            return;
        }

        form.post(enrollmentStore().url);
    };

    return (
        <AuthenticatedLayout>
            <Head title={enrollment ? 'Edit Enrollment' : 'Enrollment'} />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {enrollment ? 'Edit Enrollment' : 'Add Enrollment'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Select a student, course, school year, and semester to
                        create an enrollment.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Student
                            </label>
                            <select
                                value={form.data.studid}
                                onChange={(e) =>
                                    form.setData('studid', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            >
                                <option value="">Select student</option>
                                {students.map((student) => (
                                    <option
                                        key={student.studid}
                                        value={student.studid}
                                    >
                                        {`${student.lname}, ${student.fname} ${student.mname || ''}`.trim()}
                                    </option>
                                ))}
                            </select>
                            {form.errors.studid && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.studid}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Course
                            </label>
                            <select
                                value={form.data.courseid}
                                onChange={(e) =>
                                    form.setData('courseid', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            >
                                <option value="">Select course</option>
                                {courses.map((course) => (
                                    <option
                                        key={course.courseid}
                                        value={course.courseid}
                                    >
                                        {course.coursename}
                                    </option>
                                ))}
                            </select>
                            {form.errors.courseid && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.courseid}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="schoolyear"
                                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                School Year
                            </label>
                            <select
                                id="schoolyear"
                                value={selectedSchoolYear}
                                onChange={(event) => {
                                    setSelectedSchoolYear(event.target.value);
                                    setSelectedSemester('');
                                    form.setData('syid', '');
                                }}
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            >
                                <option value="">Select school year</option>
                                {schoolYearOptions.map((schoolyear) => (
                                    <option key={schoolyear} value={schoolyear}>
                                        {schoolyear}
                                    </option>
                                ))}
                            </select>
                            {schoolyears.length === 0 && (
                                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                    No school years or semesters are set up. Ask
                                    your administrator to configure them.
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="semester"
                                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                Semester
                            </label>
                            <select
                                id="semester"
                                value={selectedSemester}
                                disabled={
                                    !selectedSchoolYear ||
                                    semesterOptions.length === 0
                                }
                                onChange={(event) => {
                                    const semesterName = event.target.value;
                                    const schoolYear = semesterOptions.find(
                                        (option) =>
                                            option.semester?.semester ===
                                            semesterName,
                                    );

                                    setSelectedSemester(semesterName);
                                    form.setData(
                                        'syid',
                                        schoolYear?.syid ?? '',
                                    );
                                }}
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
                            >
                                <option value="">
                                    {selectedSchoolYear
                                        ? 'Select semester'
                                        : 'Select a school year first'}
                                </option>
                                {semesterOptions.map((schoolyear) => (
                                    <option
                                        key={schoolyear.syid}
                                        value={schoolyear.semester?.semester}
                                    >
                                        {schoolyear.semester?.semester}
                                    </option>
                                ))}
                            </select>
                            {form.errors.syid && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.syid}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Year Level
                            </label>
                            <input
                                type="text"
                                value={form.data.yearlevel}
                                onChange={(e) =>
                                    form.setData('yearlevel', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.yearlevel && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.yearlevel}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Section
                            </label>
                            <input
                                type="text"
                                value={form.data.section}
                                onChange={(e) =>
                                    form.setData('section', e.target.value)
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 transition outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
                            />
                            {form.errors.section && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.errors.section}
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
                                : enrollment
                                  ? 'Update Enrollment'
                                  : 'Save Enrollment'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
