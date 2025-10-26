import React from 'react';
import AdminHeader from './AdminHeader.tsx';
import AdminSidebar from './AdminSidebar.tsx';

const AdminLayout = ({ children, onLogout }) => {
  return (
    React.createElement("div", { className: "flex h-screen bg-gray-100 font-sans" },
      React.createElement(AdminSidebar, null),
      React.createElement("div", { className: "flex-1 flex flex-col overflow-hidden" },
        React.createElement(AdminHeader, { onLogout: onLogout }),
        React.createElement("main", { className: "flex-1 overflow-x-hidden overflow-y-auto bg-gray-100" },
          React.createElement("div", { className: "container mx-auto px-6 py-8" },
            children
          )
        )
      )
    )
  );
};

export default AdminLayout;