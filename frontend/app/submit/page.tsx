import ComplaintForm from '@/components/ComplaintForm';

export default function SubmitPage() {
    return (
        <main className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Submit a Complaint</h1>
            <ComplaintForm />
        </main>
    );
}