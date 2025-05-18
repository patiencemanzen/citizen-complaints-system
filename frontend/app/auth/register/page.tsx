'use client';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <AuthForm mode="register" onSuccess={() => window.location.href = '/auth/login'} />
            </div>
        </main>
    );
}