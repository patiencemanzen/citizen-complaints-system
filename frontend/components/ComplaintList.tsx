'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import ComplaintForm from "./ComplaintForm";

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
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const endpoint = type === 'user'
            ? `${process.env.NEXT_PUBLIC_API_URL}/complaints/user/me`
            : `${process.env.NEXT_PUBLIC_API_URL}/complaints/agency/me`;
        axios.get<Complaint[]>(endpoint)
            .then(res => setComplaints(res.data))
            .catch(() => setComplaints([]))
            .then(() => setLoading(false));
    }, [type]);

    const handleComplaintCreated = (newComplaint: Complaint) => {
        setComplaints([newComplaint, ...complaints]);
        closeModal();
    };

    if (loading) return <PageLoader />;

    return (<>
        <div className="flex justify-end mb-4">
            <button
                type="button"
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
            >
                New Complaint
            </button>
        </div>
        {modalOpen && (
            <div tabIndex={-1} aria-hidden={!modalOpen} className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-40">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Submit a Complaint
                            </h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <ComplaintForm onSuccess={handleComplaintCreated} />
                        </div>
                    </div>
                </div>
            </div>
        )}
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