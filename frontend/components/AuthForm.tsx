"use client";
import { useState } from "react";
import axios from "@/utils/axios";
import NotificationToast from "./NotificationToast";
import GoogleLoginButton from "./GoogleLoginButton";

type AuthFormProps = {
    mode: "login" | "register";
    onSuccess?: () => void;
};

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === "login") {
                const { data } = await axios.post("/auth/login", { email: form.email, password: form.password });
                const { access_token } = data as { access_token: string };
                localStorage.setItem("token", access_token);
                document.cookie = `token=${access_token}; path=/;`;
            } else {
                await axios.post("/auth/register", form);
                setToast({ type: "success", message: "Registration successful!" });
            }
            onSuccess?.();
        } catch (err: unknown) {
            // @ts-expect-error: err might not have response property
            setToast({ type: "error", message: err?.response?.data?.message || "Error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            {mode === "register" && (
                <div>
                    <label className="text-base font-medium text-gray-900">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                </div>
            )}
            <div>
                <label className="text-base font-medium text-gray-900">Email address</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
            </div>
            <div>
                <label className="text-base font-medium text-gray-900">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="block w-full p-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {mode === "login" ? "Login" : "Register"}
            </button>
            <GoogleLoginButton />
        </form>
    );
}
