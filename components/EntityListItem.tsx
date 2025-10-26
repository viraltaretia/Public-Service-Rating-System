import React, { useContext } from 'react';
import type { Entity } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';

interface EntityListItemProps {
  entity: Entity;
  onSelect: (entity: Entity) => void;
}

const EntityListItem: React.FC<EntityListItemProps> = ({ entity, onSelect }) => {
  const { t } = useContext(LanguageContext);
  
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div 
      onClick={() => onSelect(entity)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 flex items-center justify-between w-full"
    >
      <div className="flex-grow">
        <span className="text-xs font-semibold uppercase text-blue-500 tracking-wider">{entity.type}</span>
        <h3 className="text-lg font-bold text-gray-800">{entity.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{entity.address}</p>
      </div>
      <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
        <div className="text-center">
            <div className={`text-2xl font-bold ${getRatingColor(entity.averageRating)}`}>
                {entity.averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">{t('card.publicRating')}</div>
        </div>
        {entity.googleRating && (
             <div className="text-center">
                <div className={`text-2xl font-bold text-gray-700`}>
                    {entity.googleRating.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">{t('card.googleRating')}</div>
            </div>
        )}
        <span className="text-blue-600 font-semibold hover:text-blue-800 hidden md:block">
          {t('card.viewAndRate')}
        </span>
      </div>
    </div>
  );
};

export default EntityListItem;
