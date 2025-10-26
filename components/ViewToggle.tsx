import React from 'react';

const ViewToggle = ({ currentView, onViewChange }) => {
  const baseClasses = "p-2 rounded-md transition-colors";
  const activeClasses = "bg-blue-500 text-white";
  const inactiveClasses = "bg-gray-200 text-gray-600 hover:bg-gray-300";

  return (
    React.createElement("div", { className: "flex space-x-2 bg-gray-200 rounded-lg p-1" },
      React.createElement("button",
        {
          onClick: () => onViewChange('grid'),
          className: `${baseClasses} ${currentView === 'grid' ? activeClasses : inactiveClasses}`,
          "aria-label": "Grid View",
          title: "Grid View"
        },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
          React.createElement("path", { d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" })
        )
      ),
      React.createElement("button",
        {
          onClick: () => onViewChange('list'),
          className: `${baseClasses} ${currentView === 'list' ? activeClasses : inactiveClasses}`,
          "aria-label": "List View",
          title: "List View"
        },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
          React.createElement("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" })
        )
      )
    )
  );
};

export default ViewToggle;