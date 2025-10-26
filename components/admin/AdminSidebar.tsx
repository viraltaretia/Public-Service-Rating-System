
import React from 'react';

const NavLink = ({ href, icon, children }) => {
    // The active state is now determined on each render.
    // App.tsx's state update on path change will trigger a re-render here.
    const isActive = window.location.pathname.startsWith(href);

    const handleClick = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('pathchange'));
    };

    const baseClasses = "flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md transition-colors";
    const activeClasses = "bg-gray-700 font-bold";

    return (
        React.createElement("a", { href: href, onClick: handleClick, className: `${baseClasses} ${isActive ? activeClasses : ''}` },
            icon,
            React.createElement("span", { className: "mx-4" }, children)
        )
    );
};

const AdminSidebar = () => {
  return (
    React.createElement("div", { className: "hidden md:flex flex-col w-64 bg-gray-800" },
      React.createElement("div", { className: "flex items-center justify-center h-16 bg-gray-900" },
        React.createElement("span", { className: "text-white font-bold uppercase text-lg" }, "Admin Portal")
      ),
      React.createElement("div", { className: "flex flex-col flex-1 overflow-y-auto" },
        React.createElement("nav", { className: "flex-1 px-2 py-4 bg-gray-800" },
            // Fix: Pass children explicitly as a prop
            React.createElement(NavLink, { href: "/admin/dashboard", icon: React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" })), children: "Dashboard" }
            ),
            // Fix: Pass children explicitly as a prop
            React.createElement(NavLink, { href: "/admin/entities", icon: React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })), children: "Entities" }
            ),
            // Fix: Pass children explicitly as a prop
            React.createElement(NavLink, { href: "/admin/contractors", icon: React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 2v6h6M16 13H8M16 17H8M10 9H8" })), children: "Contractors" }
            ),
             // Fix: Pass children explicitly as a prop
             React.createElement(NavLink, { href: "/admin/settings", icon: React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })), children: "Settings" }
            )
        )
      )
    )
  );
};

export default AdminSidebar;