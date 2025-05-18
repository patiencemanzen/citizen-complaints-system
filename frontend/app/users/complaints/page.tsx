'use client';

import ComplaintList from '@/components/ComplaintList';
import ComplaintForm from '@/components/ComplaintForm';
import { useState, useEffect } from 'react';

export default function UserDashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const handleComplaintCreated = () => {
        setRefreshKey(k => k + 1);
        closeModal();
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <div className="px-20 py-10 bg-white min-h-screen transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
                </div>
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

            <ComplaintList type="user" key={refreshKey} />
        </div>
    );
}