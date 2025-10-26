import React, { useState, useEffect } from 'react';
import type { Contractor } from '../../types';
import { fetchAllContractors } from '../../services/api';
import Spinner from '../Spinner';

const AdminContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllContractors()
      .then(data => {
        setContractors(data);
      })
      .catch(err => {
        setError('Failed to load contractor data.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center p-8"><Spinner isPageSpinner={true} /></div>;
    }
    if (error) {
      return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Contractor ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Contact</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Assigned Entities</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {contractors.map(contractor => (
              <tr key={contractor.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">{contractor.id}</td>
                <td className="py-3 px-4 font-semibold">{contractor.name}</td>
                <td className="py-3 px-4">{contractor.contact}</td>
                <td className="py-3 px-4 text-center font-bold">{contractor.assignedEntitiesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Contractors</h1>
      {renderContent()}
    </div>
  );
};

export default AdminContractorsPage;
