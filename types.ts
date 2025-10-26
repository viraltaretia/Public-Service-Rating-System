export enum EntityType {
  ROAD = 'Road',
  GOVERNMENT_OFFICE = 'Government Office',
  METRO_STATION = 'Metro Station',
  BUS_STATION = 'Bus Station',
  PARK = 'Park',
  LAKE = 'Lake / Water Body',
  DUMP_YARD = 'Dump Yard',
  OTHER = 'Other',
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  location: Location;
  averageRating: number; // Our platform's rating
  googleRating?: number; // Google's rating
  address: string;
  contractorId?: string; // Hidden from user, visible to admin
}

export interface RatingParameter {
  key: string;
  label: string;
  description: string;
}

export interface RatingSubmission {
  entityId: string;
  ratings: { [key:string]: number };
  comment: string;
  photos: string[]; // base64 strings
}

export interface UserRating {
  id: string;
  entityId: string;
  entityName: string; 
  ratings: { [key: string]: number };
  comment: string;
  photosCount: number;
  submittedAt: string; // ISO string
}

export interface Contractor {
  id:string;
  name: string;
  contact: string;
  assignedEntitiesCount: number;
}

export interface AdminDashboardStats {
    totalEntities: number;
    totalRatings: number;
    totalContractors: number;
    averageRating: number;
}

export interface CategoryStat {
    category: EntityType;
    averageRating: number;
    ratingCount: number;
}

export interface TimeSeriesStat {
    date: string;
    count: number;
}