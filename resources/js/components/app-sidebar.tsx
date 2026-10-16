import { Link } from '@inertiajs/react';
import {
    BookOpenCheck,
    ClipboardList,
    LayoutDashboard,
    UsersRound,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as coursesIndex } from '@/routes/courses';
import { index as enrollmentsIndex } from '@/routes/enrollments';
import { index as studentsIndex } from '@/routes/students';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Students',
        href: studentsIndex(),
        icon: UsersRound,
    },
    {
        title: 'Courses',
        href: coursesIndex(),
        icon: BookOpenCheck,
    },
    {
        title: 'Enrollments',
        href: enrollmentsIndex(),
        icon: ClipboardList,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={enrollmentsIndex()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainNavItems} label="Enrollment workspace" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
