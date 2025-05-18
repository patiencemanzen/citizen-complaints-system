import AgencyCard from '@/components/AgencyCard';
import axios from 'axios';

type Agency = {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
};

export default async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
  }

  let agencies: Agency[] = [];

  try {
    const res = await axios.get<Agency[]>(`${apiUrl}/agencies`, { headers: { 'Cache-Control': 'no-store' } });
    agencies = res.data;
  } catch (error) {
    console.log(error)
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Government Agencies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agencies.map((agency: Agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </main>
  );
}