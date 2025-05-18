"use client";

import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <AuthForm mode="login" onSuccess={() => window.location.href = '/dashboard/user'} />
            </div>
        </main>
    );
}