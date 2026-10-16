import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    ClipboardPlus,
    Pencil,
    Trash2,
    UserPlus,
    UsersRound,
} from 'lucide-react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { create as enrollmentCreate } from '@/routes/enrollments';
import {
    create as studentCreate,
    destroy as studentDestroy,
    edit as studentEdit,
} from '@/routes/students';
import { Button } from '@/components/ui/button';

const formatDate = (value) => {
    if (!value) {
        return '—';
    }

    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

function DeleteStudentDialog({ student }) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const hasEnrollments = student.enrolled_count > 0;

    const deleteStudent = () => {
        setProcessing(true);
        router.delete(studentDestroy(student.studid).url, {
            onFinish: () => {
                setProcessing(false);
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
                aria-label={`Delete ${student.fname} ${student.lname}`}
            >
                <Trash2 className="size-4" />
                Delete
            </Button>
            <DialogContent>
                <DialogTitle>
                    {hasEnrollments
                        ? 'Student has enrollment records'
                        : 'Delete this student?'}
                </DialogTitle>
                <DialogDescription>
                    {hasEnrollments
                        ? `${student.fname} ${student.lname} has ${student.enrolled_count} enrollment record${student.enrolled_count === 1 ? '' : 's'}. Remove the enrollment records first to preserve academic history.`
                        : `This will permanently delete ${student.fname} ${student.lname}'s student record. This action cannot be undone.`}
                </DialogDescription>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        {hasEnrollments ? 'Close' : 'Cancel'}
                    </Button>
                    {!hasEnrollments && (
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={processing}
                            onClick={deleteStudent}
                        >
                            {processing ? 'Deleting...' : 'Delete student'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function Index({ students = [] }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Students" />

            <main className="space-y-6 p-4 md:p-6">
                <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6 dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex items-start gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <UsersRound className="size-6" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Student records
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                Students
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Maintain student details and continue to
                                enrollment.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={studentCreate()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                            <UserPlus className="size-4" />
                            Add student
                        </Link>
                        <Link
                            href={enrollmentCreate()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            <ClipboardPlus className="size-4" />
                            Enroll student
                        </Link>
                    </div>
                </section>

                {flash?.error && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
                    >
                        {flash.error}
                    </div>
                )}
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
                                Student directory
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {students.length.toLocaleString()} student
                                {students.length === 1 ? '' : 's'} on record
                            </p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-800/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Student ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Full Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Sex
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Birth Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Address
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {students.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            No student records yet. Add a
                                            student to begin enrollment.
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr
                                            key={student.studid}
                                            className="bg-white transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                                        >
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {student.studid}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {`${student.lname || ''}, ${student.fname || ''} ${student.mname || ''}`.trim()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {student.sex}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {formatDate(student.bdate)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                                                {student.address}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={studentEdit(
                                                        student.studid,
                                                    )}
                                                    aria-label={`Edit ${student.fname} ${student.lname}`}
                                                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                                >
                                                    <Pencil className="size-4" />
                                                    Edit
                                                </Link>
                                                <DeleteStudentDialog
                                                    student={student}
                                                />
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
