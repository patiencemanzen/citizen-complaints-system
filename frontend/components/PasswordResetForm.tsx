"use client";
import { useState } from "react";
import axios from "@/utils/axios";
import NotificationToast from "./NotificationToast";

export default function PasswordResetForm({ email }: { email: string }) {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/auth/reset-password", { email, newPassword });
            setToast({ type: "success", message: "Password reset successful!" });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setToast({ type: "error", message: err?.response?.data?.message || "Error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <div>
                <label className="text-base font-medium text-gray-900">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                Reset Password
            </button>
        </form>
    );
}
