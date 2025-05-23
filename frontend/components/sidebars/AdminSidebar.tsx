'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
    { href: '/admin/complaints', label: 'Complaints' },
];

export default function AdminSidebar({ children }: { children: ReactNode }) {
    const { setToken } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/auth/login");
    };

    return (
        <>
            <nav className="bg-gradient-to-br from-gray-900 to-black">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-20">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Citizenship</span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
                        aria-controls="navbar-default"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${open ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:border-0 md:p-0">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:border-0 md:p-0 dark:text-white w-full text-left"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
        </>
    );
}