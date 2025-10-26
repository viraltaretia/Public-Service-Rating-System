// Fix: Add a global declaration for window.google to inform TypeScript that it exists,
// as it's loaded from a script tag. This resolves errors about 'google' not
// existing on 'window'.
declare global {
    interface Window {
        google: any;
        googleMapsReady?: boolean;
        googleMapsAuthFailed?: boolean;
    }
}

import type { Entity, Location, RatingSubmission, UserRating, Contractor, AdminDashboardStats } from '../types';
import { EntityType } from '../types';

// --- Mock Data ---
const MOCK_ENTITIES: Entity[] = [
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

const MOCK_RATINGS: UserRating[] = [
    { id: 'rating-1', entityId: 'road-1', entityName: 'MG Road', ratings: { potholes: 2, cleanliness: 3 }, comment: 'Too many potholes near the trinity circle.', photosCount: 1, submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-2', entityId: 'office-1', entityName: 'RTO', ratings: { work_speed: 1, helpfulness: 2, corruption: 1 }, comment: 'Very slow process, had to wait for hours.', photosCount: 0, submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'rating-3', entityId: 'park-1', entityName: 'Cubbon Park', ratings: { cleanliness: 5, maintenance: 4 }, comment: 'Well maintained and clean, great for walks.', photosCount: 2, submittedAt: new Date().toISOString() },
    { id: 'rating-4', entityId: 'road-1', entityName: 'MG Road', ratings: { potholes: 1, footpaths: 2 }, comment: 'Footpaths are broken and unusable.', photosCount: 1, submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
];

const MOCK_CONTRACTORS: Contractor[] = [
    { id: 'CTR-101', name: 'Reliable Roads Inc.', contact: 'roads-dept@example.com', assignedEntitiesCount: 2 },
    { id: 'CTR-205', name: 'GreenScape Maintainers', contact: 'parks@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-300', name: 'AquaClear Solutions', contact: 'lakes@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-METRO', name: 'MetroLink Services', contact: 'metro@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-BUS', name: 'City Transport Authority', contact: 'bus@example.com', assignedEntitiesCount: 1 },
    { id: 'CTR-WASTE', name: 'Urban Waste Management', contact: 'waste@example.com', assignedEntitiesCount: 1 },
];

// --- Google Maps API Integration ---

const mapGoogleTypeToEntityType = (googleType: string): EntityType => {
    if (googleType.includes('park')) return EntityType.PARK;
    if (googleType.includes('bus_station')) return EntityType.BUS_STATION;
    if (googleType.includes('subway_station') || googleType.includes('transit_station')) return EntityType.METRO_STATION;
    if (googleType.includes('local_government_office')) return EntityType.GOVERNMENT_OFFICE;
    return EntityType.OTHER;
};

export const fetchNearbyEntities = async (userLocation: Location): Promise<Entity[]> => {
  // Fallback to mock data if Google Maps API isn't available or fails
  const useMockData = () => MOCK_ENTITIES.slice(0, 5);

  if (!window.google || !window.google.maps || window.googleMapsAuthFailed) {
      console.warn("Google Maps API failed or not available. Falling back to mock data.");
      return useMockData();
  }

  try {
      // Asynchronously load the Places library using the modern importLibrary function
      const { Place } = await window.google.maps.importLibrary("places");
      
      // Construct the request for the new Place.searchNearby() method
      const request = {
          fields: ['id', 'displayName', 'types', 'location', 'formattedAddress', 'rating'],
          locationRestriction: {
              center: userLocation,
              radius: 5000,
          },
          includedTypes: ['park', 'bus_station', 'subway_station', 'transit_station', 'local_government_office', 'tourist_attraction']
      };

      // Call the new API, which returns a promise with place results
      const { places } = await Place.searchNearby(request);

      if (places && places.length > 0) {
          const entities: Entity[] = places.map(place => ({
              id: place.id!,
              name: place.displayName!,
              type: place.types && place.types.length > 0 ? mapGoogleTypeToEntityType(place.types[0]) : EntityType.OTHER,
              location: {
                  lat: place.location!.lat(),
                  lng: place.location!.lng(),
              },
              address: place.formattedAddress || 'Address not available',
              averageRating: (Math.random() * 4 + 1), // Keep mock platform rating
              googleRating: place.rating,
              contractorId: `CTR-${Math.floor(Math.random() * 1000)}` // Keep mock contractorId
          }));
          return entities;
      } else {
          console.warn('Google Places API (New) search returned no results, falling back to mock data.');
          return useMockData();
      }
  } catch (error) {
      console.error("An error occurred with the new Google Maps API, falling back to mock data.", error);
      return useMockData();
  }
};

// --- User Rating Submission ---

export const submitRating = (submission: RatingSubmission): Promise<{ success: true }> => {
  console.log('Submitting rating:', submission);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Rating submitted for entity ID ${submission.entityId}`);
      resolve({ success: true });
    }, 1500);
  });
};

// --- Admin Portal Mock API ---

const initializeAdminCredentials = () => {
    if (!localStorage.getItem('adminUser')) {
        localStorage.setItem('adminUser', 'admin');
        localStorage.setItem('adminPass', 'password');
    }
};
initializeAdminCredentials();

export const adminLogin = (user: string, pass: string): Promise<{success: boolean}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedUser = localStorage.getItem('adminUser');
            const storedPass = localStorage.getItem('adminPass');
            const success = user === storedUser && pass === storedPass;
            resolve({ success });
        }, 1000);
    });
};

export const changeAdminPassword = (currentPass: string, newPass: string): Promise<{success: boolean; message: string}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedPass = localStorage.getItem('adminPass');
            if (currentPass !== storedPass) {
                resolve({ success: false, message: 'Current password does not match.' });
                return;
            }
            localStorage.setItem('adminPass', newPass);
            resolve({ success: true, message: 'Password updated successfully!' });
        }, 1000)
    });
}

export const fetchAdminDashboardStats = (): Promise<AdminDashboardStats> => {
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

export const fetchAllEntities = (): Promise<Entity[]> => {
     return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ENTITIES), 1000);
     });
};

export const fetchEntityWithRatings = (entityId: string): Promise<{entity: Entity | undefined; ratings: UserRating[]}> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const entity = MOCK_ENTITIES.find(e => e.id === entityId);
            const ratings = MOCK_RATINGS.filter(r => r.entityId === entityId);
            resolve({ entity, ratings });
        }, 700);
    });
};

export const fetchAllContractors = (): Promise<Contractor[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(MOCK_CONTRACTORS), 1000);
    });
};
