"use client";

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login</h2>
                <div className="flex justify-between mb-4">
                    <Link href="/auth/register" className="text-blue-600 hover:underline text-sm">Register</Link>
                    <Link href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
                </div>
                <AuthForm mode="login" onSuccess={() => {}} />
            </div>
        </main>
    );
}