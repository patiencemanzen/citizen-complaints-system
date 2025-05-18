'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import ComplaintComments, { Comment } from './ComplaintComments';

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
                let data = Array.isArray(res.data)
                    ? res.data.map((c: unknown) => {
                        const complaint = c as Record<string, unknown>;
                        return { ...complaint, id: complaint._id as string } as Complaint;
                    })
                    : [];

                data = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setComplaints(data);
            })
            .catch(() => setComplaints([]))
            .then(() => setLoading(false));
    }, [type]);

    if (loading) return <PageLoader />;

    return (
        <>
            <section className="bg-gray-100 rounded-3xl">
                <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-10 lg:py-10">
                    <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        {complaints.map((c, idx) => {
                            // Sort comments descending by createdAt if present
                            const sortedComments = (c.comments || []).slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                            return (
                                <li key={c.id} className={`mb-10 ms-6${idx === complaints.length - 1 ? '' : ''}`}>
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate capitalize">
                                                {typeof c.userId === 'object' && c.userId !== null && 'username' in c.userId
                                                    ? (c.userId as { username: string }).username
                                                    : String(c.userId)}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                To:
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
                                    <ComplaintComments complaintId={c.id} comments={sortedComments} />
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>
        </>
    );
}