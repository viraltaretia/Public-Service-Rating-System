import React, { useState, useEffect } from 'react';
import { fetchAllContractors } from '../../services/api.ts';
import Spinner from '../Spinner.tsx';

const AdminContractorsPage = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Contractor ID"),
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Name"),
              React.createElement("th", { className: "text-left py-3 px-4 uppercase font-semibold text-sm" }, "Contact"),
              React.createElement("th", { className: "text-center py-3 px-4 uppercase font-semibold text-sm" }, "Assigned Entities")
            )
          ),
          React.createElement("tbody", { className: "text-gray-700" },
            contractors.map(contractor => (
              React.createElement("tr", { key: contractor.id, className: "border-b border-gray-200 hover:bg-gray-50" },
                React.createElement("td", { className: "py-3 px-4 font-mono" }, contractor.id),
                React.createElement("td", { className: "py-3 px-4 font-semibold" }, contractor.name),
                React.createElement("td", { className: "py-3 px-4" }, contractor.contact),
                React.createElement("td", { className: "py-3 px-4 text-center font-bold" }, contractor.assignedEntitiesCount)
              )
            ))
          )
        )
      )
    );
  };

  return (
    React.createElement("div", null,
      React.createElement("h1", { className: "text-3xl font-bold text-gray-800 mb-6" }, "Manage Contractors"),
      renderContent()
    )
  );
};

export default AdminContractorsPage;