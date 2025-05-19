import { ReactNode } from 'react';
import DashboardSidebar from '@/components/sidebars/DashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <DashboardSidebar>{children}</DashboardSidebar>;
}