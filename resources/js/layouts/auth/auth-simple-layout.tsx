import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-100 p-4 sm:p-6 md:p-10 dark:bg-slate-950">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-950/40" />
            <div className="relative w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 font-medium"
                        >
                            <div className="flex h-20 w-48 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-lg">
                                <img
                                    src="/mist-logo.png"
                                    alt="Makilala Institute of Science and Technology"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                                MIST Enrollment Management
                            </span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                {title}
                            </h1>
                            <p className="text-center text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
