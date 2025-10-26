
// Fix: Add a global declaration for window.google to inform TypeScript that it exists,
// as it's loaded from a script tag. This resolves errors about 'google' not
// existing on 'window'.
// Fix: Uncommented the global declaration for google maps.
declare global {
    interface Window {
        google: any;
        googleMapsReady?: boolean;
        googleMapsAuthFailed?: boolean;
    }
}

import { EntityType } from '../types.ts';

// --- Mock Data ---
const MOCK_ENTITIES = [
    { id: 'road-1', name: 'MG Road', type: EntityType.ROAD, location: { lat: 12.9716, lng: 77.5946 }, averageRating: 3.5, googleRating: 4.2, address: 'Near Commercial Street, Bengaluru', contractorId: 'CTR-101' },
    { id: 'office-1', name: 'Regional Transport Office', type: EntityType.GOVERNMENT_OFFICE, location: { lat: 12.9730, lng: 77.5900 }, averageRating: 2.1, googleRating: 2.5, address: 'Koramangala, Bengaluru', contractorId: 'N/A' },
    { id: 'park-1', name: 'Cubbon Park', type: EntityType.PARK, location: { lat: 12.9757, lng: 77.5929 }, averageRating: 4.8, googleRating: 4.6, address: 'Kasturba Road, Bengaluru', contractorId: 'CTR-205' },
    { id: 'lake-1', name: 'Ulsoor Lake', type: EntityType.LAKE, location: { lat: 12.9800, lng: 77.6200 }, averageRating: 3.2, googleRating: 4.1, address: 'Near MG Road, Bengaluru', contractorId: 'CTR-300' },
    { id: 'road-2', name: 'Outer Ring Road', type: EntityType.ROAD, location: { lat: 12.9141, lng: 77.6245 }, averageRating: 2.9, googleRating: 3.8, address: 'Marathahalli, Bengaluru', contractorId: 'CTR-101' },
    { id: 'office-2', name: 'Passport Seva Kendra', type: EntityType.GOVERNMENT_OFFICE, location: { lat: 12.9245, lng: 77.6191 }, averageRating: 4.2, googleRating: 4.4, address: 'Lalbagh Main Road, Bengaluru', contractorId: 'N/A' },
    { id: 'metro-1', name: 'Indiranagar Metro Station', type: EntityType.METRO_STATION, location: { lat: 12.9784, lng: 77.6408 }, averageRating: 4.5, googleRating: 4.3, address: 'CMH Road, Indiranagar', contractorId: 'CTR-METRO' },
    { id: 'bus-1', name: 'Majestic Bus Station', type: EntityType.BUS_STATION, location: { lat: 12.9767, lng: 77.5713 }, averageRating: 2.3, googleRating: 3.0, address: 'Majestic, Bengaluru', contractorId: 'CTR-BUS' },
    { id: 'dump-1', name: 'Bellahalli Dump Yard', type: EntityType.DUMP_YARD, location: { lat: 13.1165, lng: 77.6198 }, averageRating: 1.5, address: 'Bellahalli, Bengaluru', contractorId: 'CTR-WASTE' },
];

const MOCK_RATINGS = [
    { id: 'rating-1', entityId: 'road-1', entityName: 'MG Road', ratings: { potholes: 2, cleanliness: 3 }, comment: 'Too many potholes near the trinity circle.', photosCount: 1, submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-2', entityId: 'office-1', entityName: 'RTO', ratings: { work_speed: 1, helpfulness: 2, corruption: 1 }, comment: 'Very slow process, had to wait for hours.', photosCount: 0, submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-3', entityId: 'park-1', entityName: 'Cubbon Park', ratings: { cleanliness: 5, maintenance: 4 }, comment: 'Well maintained and clean, great for walks.', photosCount: 2, submittedAt: new Date().toISOString() },
    { id: 'rating-4', entityId: 'road-1', entityName: 'MG Road', ratings: { potholes: 1, footpaths: 2 }, comment: 'Footpaths are broken and unusable.', photosCount: 1, submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-5', entityId: 'metro-1', entityName: 'Indiranagar Metro', ratings: { cleanliness: 5, timeliness: 4 }, comment: 'Very clean and always on time.', photosCount: 0, submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-6', entityId: 'park-1', entityName: 'Cubbon Park', ratings: { safety: 5, greenery: 5 }, comment: 'Feels very safe even in the evening.', photosCount: 1, submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-7', entityId: 'road-2', entityName: 'Outer Ring Road', ratings: { potholes: 1, water_management: 1 }, comment: 'Horrible condition, becomes a river when it rains.', photosCount: 1, submittedAt: new Date().toISOString() },
    { id: 'rating-8', entityId: 'lake-1', entityName: 'Ulsoor Lake', ratings: { water_quality: 2, odor: 2 }, comment: 'Smells bad.', photosCount: 0, submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
];

const MOCK_CONTRACTORS = [
    { id: 'CTR-101', name: 'Reliable Roads Inc.', contact: 'roads-dept@example.com', assignedEntitiesCount: 2 },
    { id: 'CTR-205', name: 'GreenScape Maintainers', contact: 'parks@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-300', name: 'AquaClear Solutions', contact: 'lakes@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-METRO', name: 'MetroLink Services', contact: 'metro@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-BUS', name: 'City Transport Authority', contact: 'bus@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-WASTE', name: 'Urban Waste Management', contact: 'waste@example.com', assignedEntitiesCount: 1 },
];

// --- Google Maps API Integration ---

const GOOGLE_TYPE_TO_ENTITY_TYPE_MAP = {
    // Prioritized types first
    'subway_station': EntityType.METRO_STATION,
    'bus_station': EntityType.BUS_STATION,
    'park': EntityType.PARK,
    'local_government_office': EntityType.GOVERNMENT_OFFICE,
    'city_hall': EntityType.GOVERNMENT_OFFICE,
    'courthouse': EntityType.GOVERNMENT_OFFICE,
    'lake': EntityType.LAKE,
    'landfill': EntityType.DUMP_YARD,
    // Less specific fallback
    'transit_station': EntityType.METRO_STATION,
};

const mapGoogleTypesToEntityType = (googleTypes, placeName) => {
    if (!googleTypes || googleTypes.length === 0) return EntityType.OTHER;

    // Check for explicit type mapping
    for (const type of googleTypes) {
        if (GOOGLE_TYPE_TO_ENTITY_TYPE_MAP[type]) {
            return GOOGLE_TYPE_TO_ENTITY_TYPE_MAP[type];
        }
    }
    
    // Fallback logic for names, as types can be generic (e.g., 'tourist_attraction')
    const lowerCaseName = placeName.toLowerCase();
    if (lowerCaseName.includes('lake')) return EntityType.LAKE;
    if (lowerCaseName.includes('dump yard') || lowerCaseName.includes('landfill')) return EntityType.DUMP_YARD;
    if (lowerCaseName.includes(' road')) return EntityType.ROAD; // Check for ' road' to avoid matching "broadway"

    return EntityType.OTHER;
};


export const fetchNearbyEntities = async (
    userLocation,
    type = 'ALL',
    searchTerm = ''
) => {
  const useMockData = () => {
    let results = MOCK_ENTITIES;
    if (type !== 'ALL') {
      results = results.filter(e => e.type === type);
    }
    if (searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.trim().toLowerCase();
      results = results.filter(e =>
        e.name.toLowerCase().includes(lowercasedTerm) ||
        e.address.toLowerCase().includes(lowercasedTerm)
      );
    }
    return results.slice(0, 10);
  };

  if (!window.google || !window.google.maps || window.googleMapsAuthFailed) {
    console.warn("Google Maps API failed or not available. Falling back to mock data.");
    return useMockData();
  }
  
  const processPlaces = (places) => {
      if (!places || places.length === 0) return [];
      return places
          .filter(place => place.id && place.displayName && place.location)
          .map(place => ({
              id: place.id,
              name: place.displayName,
              type: mapGoogleTypesToEntityType(place.types || [], place.displayName),
              location: {
                  lat: place.location.lat(),
                  lng: place.location.lng(),
              },
              address: place.formattedAddress || 'Address not available',
              averageRating: (Math.random() * 4 + 1), // Keep mock platform rating
              googleRating: place.rating,
              contractorId: `CTR-${Math.floor(Math.random() * 1000)}` // Keep mock contractorId
          }));
  };

  try {
      const { Place } = await window.google.maps.importLibrary("places");
      let places = [];
      
      let textQuery = searchTerm.trim();
      if (type !== 'ALL') {
          textQuery = `${textQuery} ${type}`.trim();
      }

      if (textQuery) {
          // Use Text Search whenever there's a search term or a filter
          const request = {
              textQuery: textQuery,
              fields: ['id', 'displayName', 'types', 'location', 'formattedAddress', 'rating'],
              locationBias: {
                  center: userLocation,
                  radius: 50000, // Use a wide bias for text search
              },
          };
          const response = await Place.searchByText(request);
          places = response.places;
      } else {
          // Use Nearby Search ONLY when no filter and no search term is applied
          const includedTypes = [
              'park', 'bus_station', 'subway_station', 'transit_station', 
              'local_government_office'
          ];
          const request = {
              fields: ['id', 'displayName', 'types', 'location', 'formattedAddress', 'rating'],
              locationRestriction: {
                  center: userLocation,
                  radius: 5000,
              },
              includedTypes: includedTypes,
          };
          const response = await Place.searchNearby(request);
          places = response.places;
      }

      const entities = processPlaces(places);
      if (entities.length > 0) {
        return entities;
      } else {
        console.warn('Google Places API search returned no results, falling back to mock data for demonstration.');
        return useMockData();
      }

  } catch (error) {
      console.error("An error occurred with the Google Maps API, falling back to mock data.", error);
      return useMockData();
  }
};

// --- User Rating Submission ---

export const submitRating = (submission) => {
  console.log('Submitting rating:', submission);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Rating submitted for entity ID ${submission.entityId}`);
      resolve({ success: true });
    }, 1500);
  });
};

// --- Admin Portal Mock API ---

// Fix: Add missing adminLogin function.
// Fix: Add explicit return type for promise
export const adminLogin = (username, password): Promise<{ success: boolean }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const storedPass = localStorage.getItem('adminPass') || 'password';
            if (username === 'admin' && password === storedPass) {
                resolve({ success: true });
            } else {
                resolve({ success: false });
            }
        }, 1000);
    });
};
// Fix: Add explicit return type for promise
export const changeAdminPassword = (currentPass, newPass): Promise<{ success: boolean; message: string; }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedPass = localStorage.getItem('adminPass') || 'password';
            if (currentPass !== storedPass) {
                resolve({ success: false, message: 'Current password does not match.' });
                return;
            }
            localStorage.setItem('adminPass', newPass);
            resolve({ success: true, message: 'Password updated successfully!' });
        }, 1000)
    });
}
// Fix: Add explicit return type for promise
export const fetchAdminDashboardStats = (): Promise<{ totalEntities: number; totalRatings: number; totalContractors: number; averageRating: number; }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const totalRatingSum = MOCK_ENTITIES.reduce((sum, entity) => sum + entity.averageRating, 0);
            resolve({
                totalEntities: MOCK_ENTITIES.length,
                totalRatings: MOCK_RATINGS.length,
                totalContractors: MOCK_CONTRACTORS.length,
                averageRating: totalRatingSum / MOCK_ENTITIES.length,
            });
        }, 500);
    });
};
// Fix: Add explicit return type for promise
export const fetchRatingStatsByCategory = (): Promise<{ category: string; averageRating: number; ratingCount: number; }[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Fix: Added explicit type for stats object
            const stats: { [key: string]: { totalRating: number; count: number } } = {};
            MOCK_RATINGS.forEach(rating => {
                const entity = MOCK_ENTITIES.find(e => e.id === rating.entityId);
                if (entity) {
                    const type = entity.type;
                    if (!stats[type]) {
                        stats[type] = { totalRating: 0, count: 0 };
                    }
                    const ratingValues = Object.values(rating.ratings);
                    const avgRatingForSubmission = ratingValues.reduce((a, b) => a + b, 0) / (ratingValues.length || 1);
                    stats[type].totalRating += avgRatingForSubmission;
                    stats[type].count += 1;
                }
            });

            const result = Object.entries(stats).map(([category, data]) => ({
                category: category,
                averageRating: data.totalRating / (data.count || 1),
                ratingCount: data.count,
            }));
            
            resolve(result);
        }, 800);
    });
}
// Fix: Add explicit return type for promise
export const fetchRatingsOverTime = (): Promise<{ date: string; count: number }[]> => {
     return new Promise(resolve => {
        setTimeout(() => {
            const dailyCounts = {};
            MOCK_RATINGS.forEach(rating => {
                const date = new Date(rating.submittedAt).toISOString().split('T')[0];
                dailyCounts[date] = (dailyCounts[date] || 0) + 1;
            });

            const result = Object.entries(dailyCounts)
                .map(([date, count]) => ({ date, count: count as number }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            
            resolve(result.slice(-10)); // Return last 10 days
        }, 800);
    });
}
// Fix: Add explicit return type for promise
export const fetchAllEntities = (): Promise<any[]> => {
     return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ENTITIES), 1000);
     });
};

export const fetchEntityWithRatings = (entityId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const entity = MOCK_ENTITIES.find(e => e.id === entityId);
            const ratings = MOCK_RATINGS.filter(r => r.entityId === entityId);
            resolve({ entity, ratings });
        }, 700);
    });
};
// Fix: Add explicit return type for promise
export const fetchAllContractors = (): Promise<any[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(MOCK_CONTRACTORS), 1000);
    });
};