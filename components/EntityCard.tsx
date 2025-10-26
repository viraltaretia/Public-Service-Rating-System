import React from 'react';
import type { Entity } from '../types';

interface EntityCardProps {
  entity: Entity;
  onSelect: (entity: Entity) => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onSelect }) => {
  const getRatingColor = (rating: number, source: 'public' | 'google') => {
    if(source === 'google') return 'bg-gray-100 text-gray-800';
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div 
      onClick={() => onSelect(entity)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
                 <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getRatingColor(entity.averageRating, 'public')}`}>
                    Public: {entity.averageRating.toFixed(1)}
                 </span>
                 {entity.googleRating && (
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getRatingColor(entity.googleRating, 'google')}`}>
                        Google: {entity.googleRating.toFixed(1)}
                    </span>
                 )}
            </div>
             <span className="text-xs font-semibold uppercase text-blue-500 tracking-wider flex-shrink-0 ml-2">{entity.type}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-3">{entity.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{entity.address}</p>
      </div>
      <div className="bg-gray-50 px-5 py-3 text-right">
        <span className="text-blue-600 font-semibold hover:text-blue-800">
          View & Rate &rarr;
        </span>
      </div>
    </div>
  );
};

export default EntityCard;