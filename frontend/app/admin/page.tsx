import AgencyCard from '@/components/AgencyCard';
import axios from 'axios';

type Agency = {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
};

export default async function AdminPage() {
    const { data: agencies } = await axios.get<Agency[]>(`${process.env.NEXT_PUBLIC_API_URL}/agencies`);

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Agencies</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agencies.map((agency: Agency) => (
                    <AgencyCard key={agency.id} agency={agency} admin />
                ))}
            </div>
            {/* Add Agency management modals/forms here */}
        </main>
    );
}