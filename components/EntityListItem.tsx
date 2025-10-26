import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const EntityListItem = ({ entity, onSelect }) => {
  const { t } = useContext(LanguageContext);
  
  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    React.createElement("div", 
      {
        onClick: () => onSelect(entity),
        className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 flex items-center justify-between w-full"
      },
      React.createElement("div", { className: "flex-grow" },
        React.createElement("span", { className: "text-xs font-semibold uppercase text-blue-500 tracking-wider" }, entity.type),
        React.createElement("h3", { className: "text-lg font-bold text-gray-800" }, entity.name),
        React.createElement("p", { className: "text-gray-500 text-sm mt-1" }, entity.address)
      ),
      React.createElement("div", { className: "flex items-center space-x-4 flex-shrink-0 ml-4" },
        React.createElement("div", { className: "text-center" },
            React.createElement("div", { className: `text-2xl font-bold ${getRatingColor(entity.averageRating)}` },
                entity.averageRating.toFixed(1)
            ),
            React.createElement("div", { className: "text-xs text-gray-500" }, t('card.publicRating'))
        ),
        entity.googleRating && (
             React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "text-2xl font-bold text-gray-700" },
                    entity.googleRating.toFixed(1)
                ),
                React.createElement("div", { className: "text-xs text-gray-500" }, t('card.googleRating'))
            )
        ),
        React.createElement("span", { className: "text-blue-600 font-semibold hover:text-blue-800 hidden md:block" },
          t('card.viewAndRate')
        )
      )
    )
  );
};

export default EntityListItem;