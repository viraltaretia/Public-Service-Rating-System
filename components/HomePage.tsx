import React, { useState, useEffect, useMemo } from 'react';
import type { Entity, Location } from '../types';
import { EntityType } from '../types';
import { fetchNearbyEntities } from '../services/api';
import EntityCard from './EntityCard';
import Spinner from './Spinner';

interface HomePageProps {
  onSelectEntity: (entity: Entity) => void;
  location: Location | null;
  locationError: string | null;
  locationLoading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectEntity, location, locationError, locationLoading }) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EntityType | 'ALL'>('ALL');

  useEffect(() => {
    if (location) {
      setLoading(true);
      setApiError(null);
      fetchNearbyEntities(location)
        .then(data => {
          setEntities(data);
        })
        .catch(err => {
          console.error("Failed to fetch entities", err);
          setApiError("Could not load places. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!locationLoading) {
      setLoading(false);
    }
  }, [location, locationLoading]);


  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            entity.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || entity.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [entities, searchTerm, selectedType]);

  const renderContent = () => {
    if (locationLoading || loading) {
      return <div className="flex justify-center items-center h-64"><Spinner isPageSpinner={true} /></div>;
    }

    if (apiError) {
        return (
          <div className="text-center py-10 px-6 bg-red-50 text-red-800 rounded-lg">
            <h3 className="mt-4 text-2xl font-bold">Could Not Fetch Data</h3>
            <p className="mt-2">{apiError}</p>
          </div>
        );
    }

    if (locationError) {
      return (
        <div className="text-center py-10 px-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <h3 className="text-xl font-semibold">Location Error</h3>
          <p className="mt-2">{locationError}</p>
          <p className="mt-1 text-sm">Please enable location services in your browser to find nearby places.</p>
        </div>
      );
    }
    
    if(!location) {
        return (
             <div className="text-center py-10 px-4 bg-blue-50 text-blue-800 rounded-lg">
                <h3 className="text-xl font-semibold">Getting Your Location...</h3>
                <p className="mt-2">We're trying to determine your location to show you nearby places.</p>
             </div>
        )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.length > 0 ? (
          filteredEntities.map(entity => (
            <EntityCard key={entity.id} entity={entity} onSelect={onSelectEntity} />
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-gray-500 mt-8">No places found matching your criteria.</p>
        )}
      </div>
    );
  };
  
  const entityTypes = ['ALL', ...Object.values(EntityType)];

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Find Nearby Public Places</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or address..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
           <select
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as EntityType | 'ALL')}
          >
            {entityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default HomePage;
