/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import NotificationToast from './NotificationToast';
import api from '../utils/axios';

type FormData = {
    agencyId: string;
    title: string;
    description: string;
    contactInfo?: string;
};

export default function ComplaintForm({ onSuccess }: { onSuccess?: (complaint: any) => void }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    type Agency = {
        _id: string;
        name: string;
    };

    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        api.get<Agency[]>(`/agencies`).then(res => setAgencies(res.data));
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await api.post(`/complaints`, data);
            setToast({ type: 'success', message: 'Complaint submitted successfully!' });
            reset();
            if (onSuccess) onSuccess(res.data);
        } catch {
            setToast({ type: 'error', message: 'Submission failed. Try again.' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
            {toast && <NotificationToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <div className="mb-5">
                <label htmlFor="agencyId" className="block mb-2 text-sm font-medium text-green-700">Agency</label>
                <select
                    id="agencyId"
                    {...register('agencyId', { required: true })}
                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                >
                    <option value="">Select an agency</option>
                    {agencies.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                </select>
                {errors.agencyId && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Agency is required!</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-green-700">title</label>
                <input
                    id="title"
                    {...register('title', { required: true })}
                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="title"
                />
                {errors.title && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> title is required!</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-green-700">Description</label>
                <textarea
                    id="description"
                    {...register('description', { required: true })}
                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Describe your complaint"
                />
                {errors.description && <span className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Description is required!</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="contactInfo" className="block mb-2 text-sm font-medium text-green-700">Contact Info (optional)</label>
                <input
                    id="contactInfo"
                    {...register('contactInfo')}
                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Your contact info"
                />
            </div>
            <button type="submit" className="btn btn-primary w-full">Submit</button>
        </form>
    );
}