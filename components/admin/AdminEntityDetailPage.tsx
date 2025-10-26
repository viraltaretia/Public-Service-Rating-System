import React, { useState, useEffect } from 'react';
import type { Entity, UserRating } from '../../types';
import { fetchEntityWithRatings } from '../../services/api';
import Spinner from '../Spinner';

interface AdminEntityDetailPageProps {
    entityId: string;
}

const AdminEntityDetailPage: React.FC<AdminEntityDetailPageProps> = ({ entityId }) => {
    const [entity, setEntity] = useState<Entity | null>(null);
    const [ratings, setRatings] = useState<UserRating[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchEntityWithRatings(entityId)
            .then(({ entity: fetchedEntity, ratings: fetchedRatings }) => {
                if (fetchedEntity) {
                    setEntity(fetchedEntity);
                    setRatings(fetchedRatings);
                } else {
                    setError("Entity not found.");
                }
            })
            .catch(err => {
                setError("Failed to load entity details.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [entityId]);
    
    const handleBack = () => {
        window.history.pushState({}, '', '/admin/entities');
        window.dispatchEvent(new Event('pathchange'));
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spinner isPageSpinner={true} /></div>;
    }
    if (error) {
        return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;
    }
    if (!entity) {
        return null;
    }

    return (
        <div>
            <button onClick={handleBack} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Entities
            </button>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{entity.name}</h1>
                <p className="text-lg text-blue-600 font-medium mt-1">{entity.type}</p>
                <p className="text-md text-gray-500 mt-2">{entity.address}</p>
                <div className="mt-4 border-t pt-4 flex flex-wrap gap-x-8 gap-y-2">
                    <p><strong className="font-semibold">Public Rating:</strong> {entity.averageRating.toFixed(1)}</p>
                    <p><strong className="font-semibold">Google Rating:</strong> {entity.googleRating?.toFixed(1) || 'N/A'}</p>
                    <p><strong className="font-semibold">Contractor ID:</strong> <span className="font-mono">{entity.contractorId || 'N/A'}</span></p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Ratings ({ratings.length})</h2>
                <div className="space-y-4">
                    {ratings.length > 0 ? ratings.map(rating => (
                        <div key={rating.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Submitted on: <span className="font-normal">{new Date(rating.submittedAt).toLocaleDateString()}</span>
                                    </p>
                                    {rating.comment && <p className="text-gray-600 mt-2 italic">"{rating.comment}"</p>}
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                     {rating.photosCount > 0 && 
                                        <span className="text-sm bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full">
                                            {rating.photosCount} Photo(s)
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-gray-500">No user ratings submitted for this entity yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminEntityDetailPage;