import AdminSidebar from '@/components/sidebars/AdminSidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <AdminSidebar>{children}</AdminSidebar>;
}