'use client';

import { useEffect, useState } from 'react';
import AgencyCard from '@/components/AgencyCard';
import api from '@/utils/axios';

type Agency = {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
};

export default function AgencyDashboard() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Agency[]>('/agencies')
      .then(res => setAgencies(res.data))
      .catch(() => setAgencies([]));
    setLoading(false);
  }, []);

  return (
    <div className="px-20 py-10">
      <h2 className="text-xl font-semibold mb-4 text-slate-900">All Agencies</h2>
      {loading ? (
        <div>Loading...</div>
      ) : agencies.length === 0 ? (
        <div className="text-gray-500">No agencies found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}
    </div>
  );
}