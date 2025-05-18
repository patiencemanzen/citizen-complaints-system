"use client";

import { useState } from "react";
import axios from "@/utils/axios";
import NotificationToast from "@/components/NotificationToast";
import VerificationCodeInput from "@/components/VerificationCodeInput";
import PasswordResetForm from "@/components/PasswordResetForm";

export default function VerifyCodePage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [verified, setVerified] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/auth/verify-code", { email, code, newPassword: "" }); // Only verify code
            setVerified(true);
            setToast({ type: "success", message: "Code verified. You can now reset your password." });
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
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Code</h2>
                {!verified ? (
                    <form onSubmit={handleVerify} className="space-y-5">
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
                        <VerificationCodeInput onChange={setCode} />
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            Verify Code
                        </button>
                    </form>
                ) : (
                    <PasswordResetForm email={email} />
                )}
            </div>
        </main>
    );
}
