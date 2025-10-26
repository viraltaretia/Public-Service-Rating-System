import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const EntityCard = ({ entity, onSelect }) => {
  const { t } = useContext(LanguageContext);
  const getRatingColor = (rating, source) => {
    if(source === 'google') return 'bg-gray-100 text-gray-800';
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    React.createElement("div", 
      {
        onClick: () => onSelect(entity),
        className: "bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
      },
      React.createElement("div", { className: "p-5 flex-grow" },
        React.createElement("div", { className: "flex justify-between items-start" },
            React.createElement("div", { className: "flex flex-wrap gap-2" },
                 React.createElement("span", { className: `inline-block px-3 py-1 text-xs font-semibold rounded-full ${getRatingColor(entity.averageRating, 'public')}` },
                    `${t('card.publicRating')}: ${entity.averageRating.toFixed(1)}`
                 ),
                 entity.googleRating && (
                    React.createElement("span", { className: `inline-block px-3 py-1 text-xs font-semibold rounded-full ${getRatingColor(entity.googleRating, 'google')}` },
                        `${t('card.googleRating')}: ${entity.googleRating.toFixed(1)}`
                    )
                 )
            ),
             React.createElement("span", { className: "text-xs font-semibold uppercase text-blue-500 tracking-wider flex-shrink-0 ml-2" }, entity.type)
        ),
        React.createElement("h3", { className: "text-xl font-bold text-gray-800 mt-3" }, entity.name),
        React.createElement("p", { className: "text-gray-500 text-sm mt-1" }, entity.address)
      ),
      React.createElement("div", { className: "bg-gray-50 px-5 py-3 text-right" },
        React.createElement("span", { className: "text-blue-600 font-semibold hover:text-blue-800" },
          t('card.viewAndRate')
        )
      )
    )
  );
};

export default EntityCard;