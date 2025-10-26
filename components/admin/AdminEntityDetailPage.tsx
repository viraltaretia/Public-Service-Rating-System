import React, { useState, useEffect } from 'react';
import { fetchEntityWithRatings } from '../../services/api.ts';
import Spinner from '../Spinner.tsx';

const AdminEntityDetailPage = ({ entityId }) => {
    const [entity, setEntity] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return React.createElement("div", { className: "flex justify-center items-center h-64" }, React.createElement(Spinner, { isPageSpinner: true }));
    }
    if (error) {
        return React.createElement("div", { className: "p-4 text-center text-red-600 bg-red-50 rounded-lg" }, error);
    }
    if (!entity) {
        return null;
    }

    return (
        React.createElement("div", null,
            React.createElement("button", { onClick: handleBack, className: "text-blue-600 hover:text-blue-800 font-semibold flex items-center mb-4" },
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor" },
                    React.createElement("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" })
                ),
                "Back to Entities"
            ),

            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6" },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-800" }, entity.name),
                React.createElement("p", { className: "text-lg text-blue-600 font-medium mt-1" }, entity.type),
                React.createElement("p", { className: "text-md text-gray-500 mt-2" }, entity.address),
                React.createElement("div", { className: "mt-4 border-t pt-4 flex flex-wrap gap-x-8 gap-y-2" },
                    React.createElement("p", null, React.createElement("strong", { className: "font-semibold" }, "Public Rating:"), ` ${entity.averageRating.toFixed(1)}`),
                    React.createElement("p", null, React.createElement("strong", { className: "font-semibold" }, "Google Rating:"), ` ${entity.googleRating?.toFixed(1) || 'N/A'}`),
                    React.createElement("p", null, React.createElement("strong", { className: "font-semibold" }, "Contractor ID:"), React.createElement("span", { className: "font-mono" }, ` ${entity.contractorId || 'N/A'}`))
                )
            ),

            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md" },
                React.createElement("h2", { className: "text-2xl font-bold text-gray-800 mb-4" }, `User Ratings (${ratings.length})`),
                React.createElement("div", { className: "space-y-4" },
                    ratings.length > 0 ? ratings.map(rating => (
                        React.createElement("div", { key: rating.id, className: "border border-gray-200 rounded-lg p-4" },
                            React.createElement("div", { className: "flex justify-between items-start" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "font-semibold text-gray-700" },
                                        "Submitted on: ", React.createElement("span", { className: "font-normal" }, new Date(rating.submittedAt).toLocaleDateString())
                                    ),
                                    rating.comment && React.createElement("p", { className: "text-gray-600 mt-2 italic" }, `"${rating.comment}"`)
                                ),
                                React.createElement("div", { className: "text-right flex-shrink-0 ml-4" },
                                     rating.photosCount > 0 && 
                                        React.createElement("span", { className: "text-sm bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full" },
                                            `${rating.photosCount} Photo(s)`
                                        )
                                )
                            )
                        )
                    )) : React.createElement("p", { className: "text-gray-500" }, "No user ratings submitted for this entity yet.")
                )
            )
        )
    );
};

export default AdminEntityDetailPage;