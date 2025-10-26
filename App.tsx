import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import AdminEntitiesPage from './components/admin/AdminEntitiesPage';
import AdminEntityDetailPage from './components/admin/AdminEntityDetailPage';
import AdminContractorsPage from './components/admin/AdminContractorsPage';
import AdminSettingsPage from './components/admin/AdminSettingsPage';

import { useGeolocation } from './hooks/useGeolocation';
import type { Entity } from './types';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';


const AppContent: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    const checkAuth = () => {
      const loggedIn = sessionStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAdminAuthenticated(loggedIn);
      // Redirect from /admin or /admin/ to dashboard if logged in
      if (loggedIn && (window.location.pathname === '/admin' || window.location.pathname === '/admin/')) {
        window.history.replaceState({}, '', '/admin/dashboard');
        onLocationChange();
      }
    };
    checkAuth();

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

  const handleAdminLogin = () => {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    setIsAdminAuthenticated(true);
    window.history.pushState({}, '', '/admin/dashboard');
    setCurrentPath('/admin/dashboard');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdminAuthenticated(false);
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
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
     if (currentPath.startsWith('/admin')) {
        if (!isAdminAuthenticated) {
            return <AdminLoginPage onLoginSuccess={handleAdminLogin} />;
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