type Agency = {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
};

export default function AgencyCard({ agency, admin }: { agency: Agency; admin?: boolean }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <h3 className="text-lg font-bold">{agency.name}</h3>
      <p className="text-gray-600 mb-2">{agency.description}</p>
      <span className="text-sm text-blue-600">{agency.contactEmail}</span>
      {admin && (
        <div className="mt-2 flex gap-2">
          <button className="btn btn-sm btn-primary">Edit</button>
          <button className="btn btn-sm btn-error">Delete</button>
        </div>
      )}
    </div>
  );
}