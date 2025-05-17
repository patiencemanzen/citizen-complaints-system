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
        // Replace with actual user/agency ID logic
        const endpoint = type === 'user'
            ? `${process.env.NEXT_PUBLIC_API_URL}/complaints/user/me`
            : `${process.env.NEXT_PUBLIC_API_URL}/complaints/agency/me`;
        axios.get<Complaint[]>(endpoint)
            .then(res => setComplaints(res.data))
            .catch(() => setComplaints([]))
            .then(() => setLoading(false));
    }, [type]);

    if (loading) return <PageLoader />;

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Agency</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(c => (
                        <tr key={c.id}>
                            <td>{c.agency}</td>
                            <td>{c.category}</td>
                            <td>{c.description}</td>
                            <td>{c.status}</td>
                            <td>{new Date(c.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}