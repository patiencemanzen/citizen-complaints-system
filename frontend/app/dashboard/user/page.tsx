import ComplaintList from '@/components/ComplaintList';

export default function UserDashboard() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Complaints</h2>
            
            <ComplaintList type="user" />
        </div>
    );
}