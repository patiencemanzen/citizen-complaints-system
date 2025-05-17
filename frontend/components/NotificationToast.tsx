'use client';
import { useEffect } from 'react';

export default function NotificationToast({
    type,
    message,
    onClose,
}: {
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
        >
            {message}
        </div>
    );
}