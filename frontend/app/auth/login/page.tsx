"use client";

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="flex justify-between mb-4">
                    <Link href="/auth/register" className="text-blue-600 hover:underline text-sm">Register</Link>
                    <Link href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
                </div>
                <AuthForm mode="login" onSuccess={() => {
                    
                }} />
            </div>
        </main>
    );
}