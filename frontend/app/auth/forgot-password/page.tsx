"use client";

import { useState } from "react";
import axios from "@/utils/axios";
import NotificationToast from "@/components/NotificationToast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/auth/forgot-password", { email });
            setToast({ type: "success", message: "Verification code sent to your email." });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setToast({ type: "error", message: err?.response?.data?.message || "Error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
                    <div>
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
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        Send Code
                    </button>
                </form>
            </div>
        </main>
    );
}
