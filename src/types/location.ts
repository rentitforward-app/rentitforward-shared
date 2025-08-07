/**
 * Location-related types for geolocation and mapping functionality
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface GeolocationPosition extends Coordinates {
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  timestamp?: number;
}

export interface GeolocationResult {
  success: boolean;
  location?: GeolocationPosition;
  error?: string;
}

export interface GeocodingResult {
  success: boolean;
  location?: Location;
  coordinates?: Coordinates;
  error?: string;
}

export interface DistanceCalculationOptions {
  unit?: 'km' | 'miles';
  precision?: number;
}

export interface ListingWithDistance {
  id: string;
  distance?: number; // in kilometers by default
  coordinates?: Coordinates;
}

export interface LocationBounds {
  northeast: Coordinates;
  southwest: Coordinates;
}

export interface LocationSearchParams {
  userLocation?: Coordinates;
  radius?: number; // in kilometers
  bounds?: LocationBounds;
  maxResults?: number;
}

/**
 * Configuration for geocoding services
 */
export interface GeocodingConfig {
  apiKey: string;
  provider: 'google' | 'mapbox' | 'nominatim';
  language?: string;
  region?: string;
}

/**
 * Australian states and territories
 */
export const AUSTRALIAN_STATES = [
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' },
] as const;

export type AustralianStateCode = typeof AUSTRALIAN_STATES[number]['code'];

/**
 * Default location for Australia (geographic center)
 */
export const DEFAULT_AUSTRALIA_LOCATION: Coordinates = {
  latitude: -25.2744,
  longitude: 133.7751,
};

/**
 * Major Australian cities with coordinates
 */
export const MAJOR_AUSTRALIAN_CITIES = {
  sydney: { latitude: -33.8688, longitude: 151.2093, name: 'Sydney', state: 'NSW' },
  melbourne: { latitude: -37.8136, longitude: 144.9631, name: 'Melbourne', state: 'VIC' },
  brisbane: { latitude: -27.4698, longitude: 153.0251, name: 'Brisbane', state: 'QLD' },
  perth: { latitude: -31.9505, longitude: 115.8605, name: 'Perth', state: 'WA' },
  adelaide: { latitude: -34.9285, longitude: 138.6007, name: 'Adelaide', state: 'SA' },
  canberra: { latitude: -35.2809, longitude: 149.1300, name: 'Canberra', state: 'ACT' },
  hobart: { latitude: -42.8821, longitude: 147.3272, name: 'Hobart', state: 'TAS' },
  darwin: { latitude: -12.4634, longitude: 130.8456, name: 'Darwin', state: 'NT' },
} as const; 