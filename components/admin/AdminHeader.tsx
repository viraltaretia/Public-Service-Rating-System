import React from 'react';

const AdminHeader = ({ onLogout }) => {
  return (
    React.createElement("header", { className: "bg-gray-800 text-white shadow-md" },
      React.createElement("div", { className: "container mx-auto px-4 py-4 md:px-6 flex justify-between items-center" },
        React.createElement("div", { className: "flex items-center space-x-3" },
           React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", viewBox: "0 0 20 20", fill: "currentColor" },
              React.createElement("path", { fillRule: "evenodd", d: "M18 8a6 6 0 11-12 0 6 6 0 0112 0zM7 8a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 017 8zM10 8a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 8zm3 .75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z", clipRule: "evenodd" })
            ),
          React.createElement("h1", { className: "text-xl md:text-2xl font-bold" }, "Admin Dashboard")
        ),
        React.createElement("button", 
            {
                onClick: onLogout,
                className: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            },
            "Logout"
        )
      )
    )
  );
};

export default AdminHeader;