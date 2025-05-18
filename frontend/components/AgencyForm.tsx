/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import NotificationToast from "@/components/NotificationToast";
import type { Agency } from "../app/admin/page";

interface AgencyFormProps {
    agency?: Agency | null;
    onSuccess: () => void;
    onCancel: () => void;
}

type FormData = {
    name: string;
    description: string;
    contactEmail: string;
};

export default function AgencyForm({ agency, onSuccess, onCancel }: AgencyFormProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: agency || { name: "", description: "", contactEmail: "" },
    });
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            if (agency) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/agencies/${agency.id}`, data);
                setToast({ type: "success", message: "Agency updated!" });
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agencies`, data);
                setToast({ type: "success", message: "Agency created!" });
            }
            reset();
            onSuccess();
        } catch (err: any) {
            setToast({ type: "error", message: err?.response?.data?.message || "Error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button onClick={onCancel} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
                <h2 className="text-xl font-bold mb-4">{agency ? "Edit Agency" : "Add Agency"}</h2>
                {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Name</label>
                        <input
                            id="name"
                            {...register("name", { required: true })}
                            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                            placeholder="Agency name"
                        />
                        {errors.name && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Name is required!</span>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Description</label>
                        <textarea
                            id="description"
                            {...register("description", { required: true })}
                            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                            placeholder="Description"
                        />
                        {errors.description && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Description is required!</span>}
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Contact Email</label>
                        <input
                            id="contactEmail"
                            type="email"
                            {...register("contactEmail", { required: true })}
                            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                            placeholder="contact@email.com"
                        />
                        {errors.contactEmail && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Contact email is required!</span>}
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>
                        {agency ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}
