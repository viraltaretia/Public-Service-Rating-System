
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext.tsx';

const Header = () => {
    const { t, setLanguage, language } = useContext(LanguageContext);

    const handleAdminLoginClick = () => {
        window.history.pushState({}, '', '/admin/dashboard');
        window.dispatchEvent(new Event('pathchange'));
    };

  return (
    React.createElement("header", { className: "bg-white shadow-md" },
      React.createElement("div", { className: "container mx-auto px-4 py-4 md:px-6 flex justify-between items-center" },
        React.createElement("div", { className: "flex items-center space-x-3" },
          React.createElement("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })),
          React.createElement("h1", { className: "text-xl md:text-2xl font-bold text-gray-800" }, t('header.title'))
        ),
        React.createElement("div", { className: "flex items-center space-x-4" },
             React.createElement("select",
                {
                    value: language,
                    // Fix: Add explicit event type to help TS infer element type
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value),
                    className: "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                },
                React.createElement("option", { value: "en" }, "English"),
                React.createElement("option", { value: "hi" }, "हिंदी")
             ),
             React.createElement("button",
                {
                    onClick: handleAdminLoginClick,
                    className: "bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                },
                t('header.admin')
             )
        )
      )
    )
  );
};

export default Header;