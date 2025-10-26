import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllEntities } from '../../services/api.ts';
import Spinner from '../Spinner.tsx';

const AdminEntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleRowClick = (entityId) => {
    window.history.pushState({}, '', `/admin/entities/${entityId}`);
    window.dispatchEvent(new Event('pathchange'));
  };

  const renderContent = () => {
    if (loading) {
      return React.createElement("div", { className: "flex justify-center p-8" }, React.createElement(Spinner, { isPageSpinner: true }));
    }
    if (error) {
      return React.createElement("div", { className: "p-4 text-center text-red-600 bg-red-50 rounded-lg" }, error);
    }
    return (
      React.createElement("div", { className: "overflow-x-auto" },
        React.createElement("table", { className: "min-w-full bg-white rounded-lg shadow" },
          React.createElement("thead", { className: "bg-gray-200" },
            React.createElement("tr", null,
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Name"),
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Type"),
              React.createElement("th", { className: "text-center py-3 px-4 uppercase font-semibold text-sm" }, "Public Rating"),
              React.createElement("th", { className: "text-center py-3 px-4 uppercase font-semibold text-sm" }, "Google Rating"),
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Contractor ID")
            )
          ),
          React.createElement("tbody", { className: "text-gray-700" },
            filteredEntities.map(entity => (
              React.createElement("tr", 
                {
                  key: entity.id, 
                  className: "border-b border-gray-200 hover:bg-blue-50 cursor-pointer",
                  onClick: () => handleRowClick(entity.id)
                },
                React.createElement("td", { className: "py-3 px-4 font-semibold" }, entity.name),
                React.createElement("td", { className: "py-3 px-4" }, entity.type),
                React.createElement("td", { className: "py-3 px-4 text-center" }, entity.averageRating.toFixed(1)),
                React.createElement("td", { className: "py-3 px-4 text-center" }, entity.googleRating?.toFixed(1) || 'N/A'),
                React.createElement("td", { className: "py-3 px-4 font-mono" }, entity.contractorId || 'N/A')
              )
            ))
          )
        )
      )
    );
  };

  return (
    React.createElement("div", null,
      React.createElement("div", { className: "flex justify-between items-center mb-6" },
        React.createElement("h1", { className: "text-3xl font-bold text-gray-800" }, "Manage Entities"),
        React.createElement("input",
          {
            type: "text",
            placeholder: "Search entities...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "p-2 border border-gray-300 rounded-md w-1/3"
          }
        )
      ),
      renderContent()
    )
  );
};

export default AdminEntitiesPage;