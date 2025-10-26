import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import AdminEntitiesPage from './components/admin/AdminEntitiesPage';
import AdminEntityDetailPage from './components/admin/AdminEntityDetailPage';
import AdminContractorsPage from './components/admin/AdminContractorsPage';
import AdminSettingsPage from './components/admin/AdminSettingsPage';
// Fix: Import the AdminLoginPage to use in the authentication flow.
import AdminLoginPage from './components/admin/AdminLoginPage';

import { useGeolocation } from './hooks/useGeolocation';
import type { Entity } from './types';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';


const AppContent: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // Fix: Add state to manage admin login status, persisted in session storage.
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(sessionStorage.getItem('isAdminLoggedIn') === 'true');
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to browser navigation events
    window.addEventListener('popstate', onLocationChange);

    // Hijack pushState to listen to programmatic navigation
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      onLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleBack = () => {
    setSelectedEntity(null);
  };

  // Fix: Update logout handler to clear authentication state.
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('isAdminLoggedIn');
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };
  
  const renderAdminContent = () => {
    const entityDetailMatch = currentPath.match(/^\/admin\/entities\/(.+)$/);
    if (entityDetailMatch) {
      const entityId = entityDetailMatch[1];
      return <AdminEntityDetailPage entityId={entityId} />;
    }

    switch(currentPath) {
      case '/admin/dashboard':
        return <AdminDashboardPage />;
      case '/admin/entities':
        return <AdminEntitiesPage />;
      case '/admin/contractors':
        return <AdminContractorsPage />;
      case '/admin/settings':
        return <AdminSettingsPage />;
      default:
        // Fallback for any other /admin path
        return <AdminDashboardPage />;
    }
  };

  const renderContent = () => {
     // Fix: Protect the admin route with a login check.
     if (currentPath.startsWith('/admin')) {
        if (!isAdminLoggedIn) {
          return <AdminLoginPage onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            sessionStorage.setItem('isAdminLoggedIn', 'true');
          }} />;
        }
        return (
          <AdminLayout onLogout={handleAdminLogout}>
            {renderAdminContent()}
          </AdminLayout>
        );
     }

     return (
        <>
            <Header />
            <main className="container mx-auto p-4 md:p-6">
                {selectedEntity ? (
                <DetailPage
                    entity={selectedEntity}
                    onBack={handleBack}
                />
                ) : (
                <HomePage
                    onSelectEntity={handleSelectEntity}
                    location={location}
                    locationError={locationError}
                    locationLoading={locationLoading}
                />
                )}
            </main>
        </>
     );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        {renderContent()}
        <div id="map" className="hidden"></div>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    )
}

export default App;