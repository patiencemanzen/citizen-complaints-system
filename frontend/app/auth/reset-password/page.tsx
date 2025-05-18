"use client";

import { useState } from "react";
import PasswordResetForm from "@/components/PasswordResetForm";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <div className="mb-4">
                    <label className="text-base font-medium text-gray-900">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                </div>
                <PasswordResetForm email={email} />
            </div>
        </main>
    );
}
