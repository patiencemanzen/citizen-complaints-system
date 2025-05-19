'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
    { href: '/users/complaints', label: 'Complaints' },
    { href: '/users/agency', label: 'Agencies' },
];

export default function DashboardSidebar({ children }: { children: ReactNode }) {
    const { setToken, role } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/auth/login");
    };

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (typeof window !== 'undefined') {
            if (
                localStorage.getItem('color-theme') === 'dark' ||
                (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-20">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Citizen Portal</span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent w-full text-left"
                                >
                                    Logout {role}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button
                        id="theme-toggle"
                        type="button"
                        onClick={() => {
                            const html = document.documentElement;
                            const darkIcon = document.getElementById('theme-toggle-dark-icon');
                            const lightIcon = document.getElementById('theme-toggle-light-icon');
                            // toggle icons inside button
                            if (darkIcon && lightIcon) {
                                darkIcon.classList.toggle('hidden');
                                lightIcon.classList.toggle('hidden');
                            }
                            // if set via local storage previously
                            if (localStorage.getItem('color-theme')) {
                                if (localStorage.getItem('color-theme') === 'light') {
                                    html.classList.add('dark');
                                    localStorage.setItem('color-theme', 'dark');
                                } else {
                                    html.classList.remove('dark');
                                    localStorage.setItem('color-theme', 'light');
                                }
                            } else {
                                if (html.classList.contains('dark')) {
                                    html.classList.remove('dark');
                                    localStorage.setItem('color-theme', 'light');
                                } else {
                                    html.classList.add('dark');
                                    localStorage.setItem('color-theme', 'dark');
                                }
                            }
                        }}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        <span className="ml-2">Toggle Theme</span>
                    </button>
                </div>
            </nav>
            <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
        </>
    );
}