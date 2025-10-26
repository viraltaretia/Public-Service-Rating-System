import { EntityType } from './types.ts';

export const RATING_PARAMETERS = {
  [EntityType.ROAD]: [
    { key: 'potholes', label: 'Potholes', description: 'Smoothness and absence of potholes.' },
    { key: 'footpaths', label: 'Footpaths', description: 'Condition and accessibility of sidewalks.' },
    { key: 'markings', label: 'Road Markings', description: 'Clarity of lane markings and signs.' },
    { key: 'water_management', label: 'Water Drainage', description: 'Effectiveness of drainage during rain.' },
    { key: 'cleanliness', label: 'Cleanliness', description: 'Absence of garbage and debris.' },
  ],
  [EntityType.GOVERNMENT_OFFICE]: [
    { key: 'corruption', label: 'Integrity', description: 'Absence of bribery or corruption.' },
    { key: 'availability', label: 'Officer Availability', description: 'Were the required officers present?' },
    { key: 'work_speed', label: 'Work Speed', description: 'Efficiency and speed of service.' },
    { key: 'harassment', label: 'Professionalism', description: 'Courteous and respectful treatment.' },
    { key: 'helpfulness', label: 'Helpfulness', description: 'Willingness to assist and guide.' },
  ],
  [EntityType.PARK]: [
    { key: 'cleanliness', label: 'Cleanliness', description: 'Park is free of litter and well-kept.' },
    { key: 'maintenance', label: 'Maintenance', description: 'Benches, paths, and equipment are in good repair.' },
    { key: 'safety', label: 'Safety & Lighting', description: 'Area feels safe, with adequate lighting.' },
    { key: 'greenery', label: 'Greenery', description: 'Health and maintenance of plants and lawns.' },
  ],
  [EntityType.LAKE]: [
    { key: 'water_quality', label: 'Water Quality', description: 'Clarity and cleanliness of the water.' },
    { key: 'surroundings_cleanliness', label: 'Surroundings', description: 'Banks and surrounding areas are clean.' },
    { key: 'odor', label: 'Odor', description: 'Absence of unpleasant smells.' },
    { key: 'wildlife_health', label: 'Wildlife Health', description: 'Apparent health of local flora and fauna.' },
  ],
  [EntityType.METRO_STATION]: [
    { key: 'cleanliness', label: 'Cleanliness', description: 'Station platforms and interiors are clean.' },
    { key: ' timeliness', label: 'Punctuality', description: 'Trains are on schedule.' },
    { key: 'safety', label: 'Safety & Security', description: 'Presence of security and safety measures.' },
    { key: 'accessibility', label: 'Accessibility', description: 'Ease of access for all individuals.' },
  ],
  [EntityType.BUS_STATION]: [
    { key: 'cleanliness', label: 'Cleanliness', description: 'Waiting areas and platforms are clean.' },
    { key: 'shelter_condition', label: 'Shelter Condition', description: 'Shelters are well-maintained and provide protection.' },
    { key: 'information', label: 'Information Display', description: 'Clarity and accuracy of schedules.' },
    { key: 'safety', label: 'Safety', description: 'The area feels safe, especially after dark.' },
  ],
  [EntityType.DUMP_YARD]: [
    { key: 'containment', label: 'Waste Containment', description: 'Waste is properly contained within the designated area.' },
    { key: 'odor_control', label: 'Odor Control', description: 'Measures to control unpleasant odors.' },
    { key: 'environmental_impact', label: 'Environmental Impact', description: 'Minimal impact on surrounding areas.' },
    { key: 'management', label: 'Overall Management', description: 'Efficiency of operations.' },
  ],
  [EntityType.OTHER]: [
    { key: 'cleanliness', label: 'Cleanliness', description: 'The area is clean and well-maintained.' },
    { key: 'maintenance', label: 'Maintenance', description: 'The infrastructure is in good condition.' },
    { key: 'accessibility', label: 'Accessibility', description: 'The place is easy to access for everyone.' },
    { key: 'service_quality', label: 'Quality of Service', description: 'Overall quality of the service provided.' },
  ],
};