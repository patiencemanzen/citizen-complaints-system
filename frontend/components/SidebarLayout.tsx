import { ReactNode } from 'react';
import Link from 'next/link';

const navLinks = [
    { href: '/dashboard/user', label: 'User Dashboard' },
    { href: '/dashboard/agency', label: 'Agency Dashboard' },
    { href: '/admin', label: 'Admin Panel' },
    { href: '/', label: 'Home' },
];

export default function SidebarLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-blue-800 text-white flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
                <nav className="flex-1">
                    <ul className="space-y-4">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="hover:underline">{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 bg-gray-50">{children}</main>
        </div>
    );
}