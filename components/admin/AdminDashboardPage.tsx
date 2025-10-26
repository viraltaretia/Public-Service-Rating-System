import React, { useState, useEffect } from 'react';
import type { AdminDashboardStats } from '../../types';
import { fetchAdminDashboardStats } from '../../services/api';
import Spinner from '../Spinner';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAdminDashboardStats()
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        setError('Failed to load dashboard statistics.');
        console.error(err);
      })
      .finally(() => {
          setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner isPageSpinner={true} /></div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Total Entities" 
                value={stats.totalEntities} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <StatCard 
                title="Total Ratings" 
                value={stats.totalRatings} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
            />
            <StatCard 
                title="Total Contractors" 
                value={stats.totalContractors} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>}
            />
            <StatCard 
                title="Avg. Public Rating" 
                value={stats.averageRating.toFixed(2)} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
        </div>
    </div>
  );
};

export default AdminDashboardPage;
