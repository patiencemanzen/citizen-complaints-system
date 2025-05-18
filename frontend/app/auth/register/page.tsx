'use client';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <div className="flex justify-between mb-4">
                    <Link href="/auth/login" className="text-blue-600 hover:underline text-sm">Login</Link>
                </div>
                <AuthForm mode="register" onSuccess={() => window.location.href = '/auth/login'} />
            </div>
        </main>
    );
}