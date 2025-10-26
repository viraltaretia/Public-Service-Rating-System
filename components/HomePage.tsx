
import React, { useState, useEffect, useContext } from 'react';
import { EntityType } from '../types.ts';
import { fetchNearbyEntities } from '../services/api.ts';
import EntityCard from './EntityCard.tsx';
import EntityListItem from './EntityListItem.tsx';
import ViewToggle from './ViewToggle.tsx';
import Spinner from './Spinner.tsx';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

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


const HomePage = ({ onSelectEntity, location, locationError, locationLoading }) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('preferredView');
    return (savedView === 'grid' || savedView === 'list') ? savedView : 'grid';
  });

  const { t } = useContext(LanguageContext);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    localStorage.setItem('preferredView', view);
  }, [view]);

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
      return React.createElement("div", { className: "flex justify-center items-center h-64" }, React.createElement(Spinner, { isPageSpinner: true }));
    }

    if (apiError) {
        return (
          React.createElement("div", { className: "text-center py-10 px-6 bg-red-50 text-red-800 rounded-lg" },
            React.createElement("h3", { className: "mt-4 text-2xl font-bold" }, t('home.apiError')),
            React.createElement("p", { className: "mt-2" }, apiError)
          )
        );
    }

    if (locationError) {
      return (
        React.createElement("div", { className: "text-center py-10 px-4 bg-yellow-100 text-yellow-800 rounded-lg" },
          React.createElement("h3", { className: "text-xl font-semibold" }, t('home.locationError')),
          React.createElement("p", { className: "mt-2" }, locationError),
          React.createElement("p", { className: "mt-1 text-sm" }, t('home.locationErrorMessage'))
        )
      );
    }
    
    if(!location) {
        return (
             React.createElement("div", { className: "text-center py-10 px-4 bg-blue-50 text-blue-800 rounded-lg" },
                React.createElement("h3", { className: "text-xl font-semibold" }, t('home.loading')),
                React.createElement("p", { className: "mt-2" }, t('home.loadingMessage'))
             )
        )
    }
    
    const containerClasses = view === 'grid'
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-4";


    return (
      React.createElement("div", { className: containerClasses },
        entities.length > 0 ? (
          entities.map(entity => (
            view === 'grid' 
                ? React.createElement(EntityCard, { key: entity.id, entity: entity, onSelect: onSelectEntity })
                : React.createElement(EntityListItem, { key: entity.id, entity: entity, onSelect: onSelectEntity })
          ))
        ) : (
          React.createElement("p", { className: "col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 mt-8" }, t('home.noResults'))
        )
      )
    );
  };
  
  const entityTypes = ['ALL', ...Object.values(EntityType)];


  return (
    React.createElement("div", null,
      React.createElement("div", { className: "mb-6 bg-white p-4 rounded-lg shadow-sm" },
        React.createElement("div", { className: "flex justify-between items-center mb-4" },
            React.createElement("h2", { className: "text-2xl font-bold" }, t('home.findPlaces')),
            React.createElement(ViewToggle, { currentView: view, onViewChange: setView })
        ),
        React.createElement("div", { className: "flex flex-col md:flex-row gap-4" },
          React.createElement("input",
            {
                type: "text",
                placeholder: t('home.searchPlaceholder'),
                className: "flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                value: searchTerm,
                // Fix: Add explicit event type to help TS infer element type
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
            }
          ),
           React.createElement("select",
            {
                className: "p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                value: selectedType,
                // Fix: Add explicit event type to help TS infer element type
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)
            },
            entityTypes.map(type => (
              React.createElement("option", { key: type, value: type },
                type === 'ALL' ? t('home.allTypes') : type
              )
            ))
          )
        )
      ),
      renderContent()
    )
  );
};

export default HomePage;