'use client';

import ComplaintList from '@/components/ComplaintList';
import { useState, useEffect } from 'react';

export default function Page() {
    const [refreshKey] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <div className="px-20 py-10 bg-white min-h-screen transition-colors duration-300">
            <ComplaintList type="user" key={refreshKey} />
        </div>
    );
}