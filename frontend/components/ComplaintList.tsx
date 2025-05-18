'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';

type Complaint = {
    id: string;
    agency: string;
    category: string;
    description: string;
    status: string;
    createdAt: string;
};

export default function ComplaintList({ type }: { type: 'user' | 'agency' }) {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/complaints`;

        axios.get<Complaint[]>(endpoint)
            .then(res => setComplaints(res.data))
            .catch(() => setComplaints([]))
            .then(() => setLoading(false));
    }, [type]);

    if (loading) return <PageLoader />;

    return (
        <>
            <section className="bg-gray-100 py-10">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 px-4 sm:px-0">
                        {complaints.map((c) => (
                            <div key={c.id} className="overflow-hidden bg-white rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate">{c.agency}</p>
                                            <p className="text-sm text-gray-600 truncate">{c.category}</p>
                                        </div>
                                        <span className="inline-block text-sky-500 font-semibold">{c.status}</span>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-gray-800">
                                            {c.description}
                                            <span className="block text-sky-500 mt-2">{new Date(c.createdAt).toLocaleString()}</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}