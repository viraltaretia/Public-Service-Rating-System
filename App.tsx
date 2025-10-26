
import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header.tsx';
import HomePage from './components/HomePage.tsx';
import DetailPage from './components/DetailPage.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';
import AdminDashboardPage from './components/admin/AdminDashboardPage.tsx';
import AdminEntitiesPage from './components/admin/AdminEntitiesPage.tsx';
import AdminEntityDetailPage from './components/admin/AdminEntityDetailPage.tsx';
import AdminContractorsPage from './components/admin/AdminContractorsPage.tsx';
import AdminSettingsPage from './components/admin/AdminSettingsPage.tsx';

import { useGeolocation } from './hooks/useGeolocation.ts';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext.tsx';


const AppContent = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // Removed admin login state as authentication is being bypassed.
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to browser back/forward navigation
    window.addEventListener('popstate', onLocationChange);
    // Listen to our custom event for programmatic navigation
    window.addEventListener('pathchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('pathchange', onLocationChange);
    };
  }, []);

  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
  };

  const handleBack = () => {
    setSelectedEntity(null);
  };

  // The logout handler now simply navigates back to the homepage.
  const handleAdminLogout = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('pathchange'));
  };
  
  const renderAdminContent = () => {
    const entityDetailMatch = currentPath.match(/^\/admin\/entities\/(.+)$/);
    if (entityDetailMatch) {
      const entityId = entityDetailMatch[1];
      return React.createElement(AdminEntityDetailPage, { entityId: entityId });
    }

    switch(currentPath) {
      case '/admin/dashboard':
        return React.createElement(AdminDashboardPage, null);
      case '/admin/entities':
        return React.createElement(AdminEntitiesPage, null);
      case '/admin/contractors':
        return React.createElement(AdminContractorsPage, null);
      case '/admin/settings':
        return React.createElement(AdminSettingsPage, null);
      default:
        // Fallback for any other /admin path
        return React.createElement(AdminDashboardPage, null);
    }
  };

  const renderContent = () => {
     // Removed the login check to allow direct access to the admin panel.
     if (currentPath.startsWith('/admin')) {
        return (
          // Fix: Pass children as an explicit prop to satisfy TypeScript.
          React.createElement(AdminLayout, { onLogout: handleAdminLogout, children: renderAdminContent() })
        );
     }

     return (
        React.createElement(React.Fragment, null,
            React.createElement(Header, null),
            React.createElement("main", { className: "container mx-auto p-4 md:p-6" },
                selectedEntity ? (
                React.createElement(DetailPage,
                    {
                        entity: selectedEntity,
                        onBack: handleBack
                    }
                )
                ) : (
                React.createElement(HomePage,
                    {
                        onSelectEntity: handleSelectEntity,
                        location: location,
                        locationError: locationError,
                        locationLoading: locationLoading
                    }
                )
                )
            )
        )
     );
  };

  return (
    React.createElement("div", { className: "min-h-screen bg-gray-50 font-sans text-gray-800" },
        renderContent(),
        React.createElement("div", { id: "map", className: "hidden" })
    )
  );
};

const App = () => {
    return (
        React.createElement(LanguageProvider, null,
            React.createElement(AppContent, null)
        )
    )
}

export default App;