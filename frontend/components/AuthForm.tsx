"use client";
import { useState } from "react";
import axios from "@/utils/axios";
import NotificationToast from "./NotificationToast";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";
import Button from "./button";

type AuthFormProps = {
    mode: "login" | "register";
    onSuccess?: () => void;
};

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const { setToken } = useAuth();

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
                setToken(access_token); // update context

                setTimeout(() => {
                    const t = access_token;

                    try {
                        const decoded = JSON.parse(atob(t.split('.')[1]));
                        const userRole = decoded.roles && Array.isArray(decoded.roles) && decoded.roles.length > 0
                            ? decoded.roles[0]
                            : decoded.role;

                        if (userRole === 'SUPER_ADMIN') window.location.href = '/admin';
                        else if (userRole === 'AGENCY_USER') window.location.href = '/agencies';
                        else window.location.href = '/users/complaints';
                    } catch {
                        window.location.href = '/users/complaints';
                    }
                }, 100);
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
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto items-center">
            {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            {mode === "register" && (
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        placeholder="Your username"
                    />
                </div>
            )}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="you@email.com"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Your password"
                />
            </div>
            <Button
                className="self-start px-4 py-3 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
                as="submit"
                isLoading={loading}
            >
                {mode === "login" ? "Login" : "Register"}
            </Button>
            <hr className="my-5" />
            <GoogleLoginButton />
        </form>
    );
}
