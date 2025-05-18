"use client";

import { useEffect, useState } from "react";
import AgencyCard from "@/components/AgencyCard";
import axios from "axios";
import AgencyForm from "../../components/AgencyForm";

export type Agency = {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
};

export default function AdminAgenciesPage() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editAgency, setEditAgency] = useState<Agency | null>(null);

    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = async () => {
        setLoading(true);
        const { data } = await axios.get<Agency[]>(`${process.env.NEXT_PUBLIC_API_URL}/agencies`);
        setAgencies(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this agency?")) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/agencies/${id}`);
            fetchAgencies();
        }
    };

    const handleEdit = (agency: Agency) => {
        setEditAgency(agency);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditAgency(null);
        fetchAgencies();
    };

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Manage Agencies</h1>
            <button
                className="mb-4 btn btn-primary"
                onClick={() => {
                    setEditAgency(null);
                    setShowForm(true);
                }}
            >
                Add Agency
            </button>
            {showForm && (
                <AgencyForm
                    agency={editAgency}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditAgency(null);
                    }}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agencies.map((agency) => (
                    <AgencyCard
                        key={agency.id}
                        agency={agency}
                        admin
                        onEdit={() => handleEdit(agency)}
                        onDelete={() => handleDelete(agency.id)}
                    />
                ))}
            </div>
        </main>
    );
}
