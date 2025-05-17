import StatusTracker from '@/components/StatusTracker';

export default function StatusPage({ params }: { params: { ticketId: string } }) {
    return (
        <main className="container mx-auto py-8">
            <StatusTracker ticketId={params.ticketId} />
        </main>
    );
}