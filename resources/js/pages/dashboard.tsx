import { Head, Link } from '@inertiajs/react';
import {
    BookOpenCheck,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    UserPlus,
    UsersRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import {
    create as courseCreate,
    index as coursesIndex,
} from '@/routes/courses';
import { create as enrollmentCreate } from '@/routes/enrollments';
import {
    create as studentCreate,
    index as studentsIndex,
} from '@/routes/students';

type DashboardStats = {
    students: number;
    enrollments: number;
    courses: number;
    school_year_semester_combinations: number;
};

type CourseEnrollment = {
    courseid: number;
    coursename: string;
    enrolled_count: number;
};

type YearLevelEnrollment = {
    yearlevel: string;
    total: number;
};

type DashboardProps = {
    stats: DashboardStats;
    enrollmentsByCourse: CourseEnrollment[];
    enrollmentsByYearLevel: YearLevelEnrollment[];
};

const statCards = [
    {
        key: 'students',
        label: 'Total students',
        icon: UsersRound,
        href: studentsIndex(),
        color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    },
    {
        key: 'enrollments',
        label: 'Enrollment records',
        icon: ClipboardList,
        href: enrollmentCreate(),
        color: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    },
    {
        key: 'courses',
        label: 'Programs',
        icon: BookOpenCheck,
        href: coursesIndex(),
        color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
        key: 'school_year_semester_combinations',
        label: 'School year / semester options',
        icon: CalendarDays,
        href: enrollmentCreate(),
        color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
] as const;

export default function Dashboard({
    stats,
    enrollmentsByCourse,
    enrollmentsByYearLevel,
}: DashboardProps) {
    const maxCourseEnrollments = Math.max(
        1,
        ...enrollmentsByCourse.map((course) => course.enrolled_count),
    );
    const maxYearLevelEnrollments = Math.max(
        1,
        ...enrollmentsByYearLevel.map((yearLevel) => yearLevel.total),
    );

    return (
        <>
            <Head title="Dashboard" />

            <main className="space-y-6 p-4 md:p-6">
                <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 px-6 py-7 text-white shadow-sm md:flex-row md:items-center md:justify-between md:px-8 dark:bg-slate-800">
                    <div className="flex items-start gap-4">
                        <div className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:flex">
                            <GraduationCap className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-300">
                                Student information system
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                                Enrollment overview
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-300">
                                Review student and enrollment records, and
                                manage the programs offered.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            asChild
                            className="bg-white text-slate-900 hover:bg-slate-100"
                        >
                            <Link href={studentCreate()}>
                                <UserPlus className="size-4" />
                                Add student
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="bg-blue-500 text-white hover:bg-blue-400"
                        >
                            <Link href={enrollmentCreate()}>
                                <ClipboardList className="size-4" />
                                New enrollment
                            </Link>
                        </Button>
                    </div>
                </section>

                <section
                    aria-label="Enrollment system totals"
                    className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                >
                    {statCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <Link
                                key={card.key}
                                href={card.href}
                                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                            {card.label}
                                        </p>
                                        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                            {stats[card.key].toLocaleString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`flex size-10 items-center justify-center rounded-lg ${card.color}`}
                                    >
                                        <Icon className="size-5" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Enrollments by program
                                </h2>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    Enrollment record count for each course.
                                </p>
                            </div>
                            <Link
                                href={coursesIndex()}
                                className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
                            >
                                Manage courses
                            </Link>
                        </div>

                        {enrollmentsByCourse.length === 0 ? (
                            <p className="mt-8 rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                No courses have been added yet.
                            </p>
                        ) : (
                            <div className="mt-6 space-y-5">
                                {enrollmentsByCourse.map((course) => (
                                    <div
                                        key={course.courseid}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-start justify-between gap-3 text-sm">
                                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                                {course.coursename}
                                            </span>
                                            <span className="shrink-0 font-semibold text-slate-900 tabular-nums dark:text-slate-100">
                                                {course.enrolled_count}
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-blue-600 transition-[width] dark:bg-blue-400"
                                                style={{
                                                    width: `${(course.enrolled_count / maxCourseEnrollments) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-700 dark:bg-slate-900">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Enrollments by year level
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Distribution of enrollment records by year
                                level.
                            </p>
                        </div>

                        {enrollmentsByYearLevel.length === 0 ? (
                            <p className="mt-8 rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                No enrollment records to summarize yet.
                            </p>
                        ) : (
                            <div className="mt-6 space-y-5">
                                {enrollmentsByYearLevel.map((yearLevel) => (
                                    <div
                                        key={yearLevel.yearlevel}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-start justify-between gap-3 text-sm">
                                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                                {yearLevel.yearlevel}
                                            </span>
                                            <span className="shrink-0 font-semibold text-slate-900 tabular-nums dark:text-slate-100">
                                                {yearLevel.total}
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-emerald-600 transition-[width] dark:bg-emerald-400"
                                                style={{
                                                    width: `${(yearLevel.total / maxYearLevelEnrollments) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                            Manage your records
                        </h2>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            Go directly to students, enrollments, or program
                            setup.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={studentsIndex()}>View students</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={coursesIndex()}>View courses</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={courseCreate()}>Add course</Link>
                        </Button>
                    </div>
                </section>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
