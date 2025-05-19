/* eslint-disable @typescript-eslint/no-explicit-any */
// Component for displaying and adding comments to a complaint

'use client';
import { useState } from 'react';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';

export interface Comment {
    userId: string;
    text: string;
    createdAt: string;
}

interface ComplaintCommentsProps {
    complaintId: string;
    comments: Comment[];
    onCommentAdded?: (comment: Comment) => void;
}

export default function ComplaintComments({ complaintId, comments: initialComments, onCommentAdded }: ComplaintCommentsProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments || []);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        
        try {
            const res = await api.post(`/complaints/${complaintId}/comments`, { text });
            const data = res.data as { comments: Comment[] };
            const newComment = data.comments[data.comments.length - 1];

            setComments([...comments, newComment]);
            setText('');
            if (onCommentAdded) onCommentAdded(newComment);
        } catch (err: any) {
            console.log(err)
            setError('Failed to add comment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 max-h-[300px] overflow-y-auto min-h-[200px]">
            <h4 className="font-semibold mb-2 text-slate-700">Comments</h4>
            <div className='my-3'>
                <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm bg-white text-slate-700 placeholder:text-slate-600"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black" disabled={loading || !text.trim()}>
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </form>
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
            </div>

            <div className="space-y-3 mb-3">
                {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
                {comments.map((c, idx) => (
                    <div key={idx} className="bg-gray-50 rounded p-2 border border-gray-200 text-slate-700">
                        <div className="text-sm text-slate-800">{c.text}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()} {c.userId === userId ? '(You)' : ''}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
