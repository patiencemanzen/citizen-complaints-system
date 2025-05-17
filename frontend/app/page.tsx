import AgencyCard from '@/components/AgencyCard';
import axios from 'axios';

export default async function HomePage() {
  // Example: Fetch agencies from backend API
  const { data: agencies } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agencies`);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Government Agencies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agencies.map((agency: any) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </main>
  );
}