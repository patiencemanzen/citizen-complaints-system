'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import ComplaintComments, { Comment } from './ComplaintComments';
import Image from 'next/image';

type Complaint = {
    id: string;
    agencyId: { name: string } | string;
    userId: { username: string } | string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    comments?: Comment[];
};

export default function ComplaintList({ type }: { type: 'user' | 'agency' }) {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/complaints`;

        axios.get(endpoint)
            .then(res => {
                const data = Array.isArray(res.data)
                    ? res.data.map((c: unknown) => {
                        const complaint = c as Record<string, unknown>;
                        return { ...complaint, id: complaint._id as string } as Complaint;
                    })
                    : [];
                setComplaints(data);
            })
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
                                        <Image width={500} height={500} unoptimized className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg" alt="" />

                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate capitalize">
                                                {typeof c.userId === 'object' && c.userId !== null && 'username' in c.userId
                                                    ? (c.userId as { username: string }).username
                                                    : String(c.userId)}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                Agency: 
                                                {typeof c.agencyId === 'object' && c.agencyId !== null && 'name' in c.agencyId
                                                    ? (c.agencyId as { name: string }).name
                                                    : String(c.agencyId)}
                                            </p>
                                        </div>
                                        <span className="inline-block text-sky-500 font-semibold">{c.status}</span>
                                    </div>
                                    <blockquote className="mt-5">
                                        <h2 className="text-base text-gray-800 font-bold capitalize">
                                            {c.title}
                                        </h2>
                                        <p className="text-base text-gray-800">
                                            {c.description}
                                            <span className="block text-sky-500 mt-2">{new Date(c.createdAt).toLocaleString()}</span>
                                        </p>
                                    </blockquote>
                                    <ComplaintComments complaintId={c.id} comments={c.comments || []} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}