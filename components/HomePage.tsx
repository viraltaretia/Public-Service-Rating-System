import React, { useState, useEffect, useContext } from 'react';
import type { Entity, Location } from '../types';
import { EntityType } from '../types';
import { fetchNearbyEntities } from '../services/api';
import EntityCard from './EntityCard';
import Spinner from './Spinner';
import { LanguageContext } from '../contexts/LanguageContext';

interface HomePageProps {
  onSelectEntity: (entity: Entity) => void;
  location: Location | null;
  locationError: string | null;
  locationLoading: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


const HomePage: React.FC<HomePageProps> = ({ onSelectEntity, location, locationError, locationLoading }) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EntityType | 'ALL'>('ALL');
  const { t } = useContext(LanguageContext);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (location) {
      setLoading(true);
      setApiError(null);
      fetchNearbyEntities(location, selectedType, debouncedSearchTerm)
        .then(data => {
          setEntities(data);
        })
        .catch(err => {
          console.error("Failed to fetch entities", err);
          setApiError(t('home.apiErrorMessage'));
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!locationLoading) {
      setLoading(false);
    }
  }, [location, locationLoading, selectedType, debouncedSearchTerm, t]);


  const renderContent = () => {
    if (locationLoading || loading) {
      return <div className="flex justify-center items-center h-64"><Spinner isPageSpinner={true} /></div>;
    }

    if (apiError) {
        return (
          <div className="text-center py-10 px-6 bg-red-50 text-red-800 rounded-lg">
            <h3 className="mt-4 text-2xl font-bold">{t('home.apiError')}</h3>
            <p className="mt-2">{apiError}</p>
          </div>
        );
    }

    if (locationError) {
      return (
        <div className="text-center py-10 px-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <h3 className="text-xl font-semibold">{t('home.locationError')}</h3>
          <p className="mt-2">{locationError}</p>
          <p className="mt-1 text-sm">{t('home.locationErrorMessage')}</p>
        </div>
      );
    }
    
    if(!location) {
        return (
             <div className="text-center py-10 px-4 bg-blue-50 text-blue-800 rounded-lg">
                <h3 className="text-xl font-semibold">{t('home.loading')}</h3>
                <p className="mt-2">{t('home.loadingMessage')}</p>
             </div>
        )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.length > 0 ? (
          entities.map(entity => (
            <EntityCard key={entity.id} entity={entity} onSelect={onSelectEntity} />
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-gray-500 mt-8">{t('home.noResults')}</p>
        )}
      </div>
    );
  };
  
  const entityTypes: (EntityType | 'ALL')[] = ['ALL', ...Object.values(EntityType)];


  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{t('home.findPlaces')}</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('home.searchPlaceholder')}
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
              <option key={type} value={type}>
                {type === 'ALL' ? t('home.allTypes') : type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default HomePage;