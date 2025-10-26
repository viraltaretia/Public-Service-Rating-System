import React, { useState, useEffect, useMemo } from 'react';
import type { Entity } from '../../types';
import { fetchAllEntities } from '../../services/api';
import Spinner from '../Spinner';

const AdminEntitiesPage: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchAllEntities()
      .then(data => {
        setEntities(data);
      })
      .catch(err => {
        setError('Failed to load entity data.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEntities = useMemo(() => {
    return entities.filter(entity => 
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entity.contractorId || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entities, searchTerm]);

  const handleRowClick = (entityId: string) => {
    window.history.pushState({}, '', `/admin/entities/${entityId}`);
  };

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
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Public Rating</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Google Rating</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Contractor ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredEntities.map(entity => (
              <tr 
                key={entity.id} 
                className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleRowClick(entity.id)}
              >
                <td className="py-3 px-4 font-semibold">{entity.name}</td>
                <td className="py-3 px-4">{entity.type}</td>
                <td className="py-3 px-4 text-center">{entity.averageRating.toFixed(1)}</td>
                <td className="py-3 px-4 text-center">{entity.googleRating?.toFixed(1) || 'N/A'}</td>
                <td className="py-3 px-4 font-mono">{entity.contractorId || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Entities</h1>
        <input
          type="text"
          placeholder="Search entities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminEntitiesPage;
