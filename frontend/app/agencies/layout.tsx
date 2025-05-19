import AgencySidebar from '@/components/sidebars/AgenciesSidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <AgencySidebar>{children}</AgencySidebar>;
}