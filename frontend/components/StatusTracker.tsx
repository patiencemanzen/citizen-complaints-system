'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageLoader from './PageLoader';

interface Complaint {
    agency: string;
    category: string;
    description: string;
    status: string;
    createdAt: string;
}

export default function StatusTracker({ ticketId }: { ticketId: string }) {
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<Complaint>(`${process.env.NEXT_PUBLIC_API_URL}/complaints/${ticketId}`)
            .then((res) => setComplaint(res.data))
            .catch(() => setComplaint(null))
            .then(() => setLoading(false));
    }, [ticketId]);

    if (loading) return <PageLoader />;
    if (!complaint) return <div className="text-red-500">Complaint not found.</div>;

    return (
        <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-2">Complaint Status</h2>
            <div className="mb-2"><b>Agency:</b> {complaint.agency}</div>
            <div className="mb-2"><b>Category:</b> {complaint.category}</div>
            <div className="mb-2"><b>Description:</b> {complaint.description}</div>
            <div className="mb-2"><b>Status:</b> <span className="font-semibold">{complaint.status}</span></div>
            <div className="mb-2"><b>Submitted:</b> {new Date(complaint.createdAt).toLocaleString()}</div>
        </div>
    );
}