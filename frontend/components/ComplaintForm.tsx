'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NotificationToast from './NotificationToast';

type FormData = {
    agencyId: string;
    category: string;
    description: string;
    contactInfo?: string;
};

export default function ComplaintForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    type Agency = {
        id: string;
        name: string;
    };

    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        axios.get<Agency[]>(`${process.env.NEXT_PUBLIC_API_URL}/agencies`).then(res => setAgencies(res.data));
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/complaints`, data);
            setToast({ type: 'success', message: 'Complaint submitted successfully!' });
            reset();
        } catch {
            setToast({ type: 'error', message: 'Submission failed. Try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow max-w-lg mx-auto">
            {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <div className="mb-4">
                <label className="block mb-1">Agency</label>
                <select {...register('agencyId', { required: true })} className="input input-bordered w-full">
                    <option value="">Select an agency</option>
                    {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                {errors.agencyId && <span className="text-red-500 text-sm">Agency is required</span>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input {...register('category', { required: true })} className="input input-bordered w-full" />
                {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full" />
                {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
            </div>
            <div className="mb-4">
                <label className="block mb-1">Contact Info (optional)</label>
                <input {...register('contactInfo')} className="input input-bordered w-full" />
            </div>
            <button type="submit" className="btn btn-primary w-full">Submit</button>
        </form>
    );
}