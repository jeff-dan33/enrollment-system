import { Link } from '@inertiajs/react';
import { ClipboardPlus, UserPlus } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { create as enrollmentCreate } from '@/routes/enrollments';
import { create as studentCreate } from '@/routes/students';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border/50 bg-background/95 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <div className="hidden min-w-0 sm:block">
                    {breadcrumbs.length > 0 ? (
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    ) : (
                        <div className="truncate text-sm font-semibold text-foreground">
                            Enrollment Management
                        </div>
                    )}
                </div>
            </div>
            <nav
                aria-label="Quick actions"
                className="flex shrink-0 items-center gap-2"
            >
                <Button variant="outline" size="sm" asChild>
                    <Link href={studentCreate()} aria-label="Add student">
                        <UserPlus className="size-4" />
                        <span className="hidden sm:inline">Add student</span>
                    </Link>
                </Button>
                <Button size="sm" asChild>
                    <Link
                        href={enrollmentCreate()}
                        aria-label="Create enrollment"
                    >
                        <ClipboardPlus className="size-4" />
                        <span className="hidden sm:inline">New enrollment</span>
                    </Link>
                </Button>
            </nav>
        </header>
    );
}
