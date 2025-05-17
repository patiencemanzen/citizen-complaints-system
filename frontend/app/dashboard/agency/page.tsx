import ComplaintList from '@/components/ComplaintList';

export default function AgencyDashboard() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Agency Complaints</h2>
            <ComplaintList type="agency" />
        </div>
    );
}