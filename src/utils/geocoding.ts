/**
 * Geocoding utilities for converting between addresses and coordinates
 */

import type {
  Coordinates,
  Location,
  GeocodingResult,
  GeocodingConfig,
} from '../types/location';

import { isValidCoordinates, isWithinAustralia } from './geolocation';

/**
 * Google Maps Geocoding API response types
 */
interface GoogleGeocodingResult {
  results: Array<{
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
  status: string;
  error_message?: string;
}

/**
 * MapBox Geocoding API response types
 */
interface MapBoxGeocodingResult {
  features: Array<{
    place_name: string;
    center: [number, number]; // [longitude, latitude]
    context: Array<{
      id: string;
      text: string;
    }>;
    properties: {
      address?: string;
    };
  }>;
}

/**
 * Nominatim (OpenStreetMap) response types
 */
interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

/**
 * Geocode an address to coordinates using the specified provider
 * @param address Address string to geocode
 * @param config Geocoding configuration
 * @returns Geocoding result with coordinates and location data
 */
export async function geocodeAddress(
  address: string,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  if (!address || address.trim().length === 0) {
    return {
      success: false,
      error: 'Address is required',
    };
  }

  try {
    switch (config.provider) {
      case 'google':
        return await geocodeWithGoogle(address, config);
      case 'mapbox':
        return await geocodeWithMapBox(address, config);
      case 'nominatim':
        return await geocodeWithNominatim(address);
      default:
        return {
          success: false,
          error: 'Unsupported geocoding provider',
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown geocoding error',
    };
  }
}

/**
 * Reverse geocode coordinates to an address
 * @param coordinates Coordinates to reverse geocode
 * @param config Geocoding configuration
 * @returns Geocoding result with address data
 */
export async function reverseGeocode(
  coordinates: Coordinates,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  if (!isValidCoordinates(coordinates)) {
    return {
      success: false,
      error: 'Invalid coordinates provided',
    };
  }

  try {
    switch (config.provider) {
      case 'google':
        return await reverseGeocodeWithGoogle(coordinates, config);
      case 'mapbox':
        return await reverseGeocodeWithMapBox(coordinates, config);
      case 'nominatim':
        return await reverseGeocodeWithNominatim(coordinates);
      default:
        return {
          success: false,
          error: 'Unsupported geocoding provider',
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown reverse geocoding error',
    };
  }
}

/**
 * Geocode using Google Maps Geocoding API
 */
async function geocodeWithGoogle(
  address: string,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    address: address,
    key: config.apiKey,
    region: config.region || 'au', // Default to Australia
    language: config.language || 'en',
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`
  );

  if (!response.ok) {
    throw new Error(`Google Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as GoogleGeocodingResult;

  if (data.status !== 'OK') {
    return {
      success: false,
      error: data.error_message || `Google Geocoding error: ${data.status}`,
    };
  }

  if (data.results.length === 0) {
    return {
      success: false,
      error: 'No results found for the provided address',
    };
  }

  const result = data.results[0];
  const coordinates: Coordinates = {
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
  };

  // Extract address components
  const addressComponents = result.address_components;
  const location: Location = {
    ...coordinates,
    address: result.formatted_address,
    city: getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || '',
    state: getAddressComponent(addressComponents, ['administrative_area_level_1']) || '',
    postal_code: getAddressComponent(addressComponents, ['postal_code']) || '',
    country: getAddressComponent(addressComponents, ['country']) || '',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Reverse geocode using Google Maps Geocoding API
 */
async function reverseGeocodeWithGoogle(
  coordinates: Coordinates,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    latlng: `${coordinates.latitude},${coordinates.longitude}`,
    key: config.apiKey,
    language: config.language || 'en',
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`
  );

  if (!response.ok) {
    throw new Error(`Google Reverse Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as GoogleGeocodingResult;

  if (data.status !== 'OK') {
    return {
      success: false,
      error: data.error_message || `Google Reverse Geocoding error: ${data.status}`,
    };
  }

  if (data.results.length === 0) {
    return {
      success: false,
      error: 'No address found for the provided coordinates',
    };
  }

  const result = data.results[0];
  const addressComponents = result.address_components;
  
  const location: Location = {
    ...coordinates,
    address: result.formatted_address,
    city: getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || '',
    state: getAddressComponent(addressComponents, ['administrative_area_level_1']) || '',
    postal_code: getAddressComponent(addressComponents, ['postal_code']) || '',
    country: getAddressComponent(addressComponents, ['country']) || '',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Geocode using MapBox Geocoding API
 */
async function geocodeWithMapBox(
  address: string,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    access_token: config.apiKey,
    country: 'au', // Limit to Australia
    language: config.language || 'en',
    limit: '1',
  });

  const encodedAddress = encodeURIComponent(address);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?${params}`
  );

  if (!response.ok) {
    throw new Error(`MapBox Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as MapBoxGeocodingResult;

  if (data.features.length === 0) {
    return {
      success: false,
      error: 'No results found for the provided address',
    };
  }

  const feature = data.features[0];
  const coordinates: Coordinates = {
    latitude: feature.center[1],
    longitude: feature.center[0],
  };

  // Extract location data from context
  const context = feature.context || [];
  const location: Location = {
    ...coordinates,
    address: feature.place_name,
    city: getMapBoxContext(context, 'place') || '',
    state: getMapBoxContext(context, 'region') || '',
    postal_code: getMapBoxContext(context, 'postcode') || '',
    country: getMapBoxContext(context, 'country') || '',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Reverse geocode using MapBox Geocoding API
 */
async function reverseGeocodeWithMapBox(
  coordinates: Coordinates,
  config: GeocodingConfig
): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    access_token: config.apiKey,
    language: config.language || 'en',
    limit: '1',
  });

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.longitude},${coordinates.latitude}.json?${params}`
  );

  if (!response.ok) {
    throw new Error(`MapBox Reverse Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json() as MapBoxGeocodingResult;

  if (data.features.length === 0) {
    return {
      success: false,
      error: 'No address found for the provided coordinates',
    };
  }

  const feature = data.features[0];
  const context = feature.context || [];
  
  const location: Location = {
    ...coordinates,
    address: feature.place_name,
    city: getMapBoxContext(context, 'place') || '',
    state: getMapBoxContext(context, 'region') || '',
    postal_code: getMapBoxContext(context, 'postcode') || '',
    country: getMapBoxContext(context, 'country') || '',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Geocode using Nominatim (OpenStreetMap)
 */
async function geocodeWithNominatim(address: string): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    q: address,
    format: 'json',
    addressdetails: '1',
    limit: '1',
    countrycodes: 'au', // Limit to Australia
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      headers: {
        'User-Agent': 'RentItForward/1.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Nominatim API error: ${response.statusText}`);
  }

  const data = await response.json() as NominatimResult[];

  if (data.length === 0) {
    return {
      success: false,
      error: 'No results found for the provided address',
    };
  }

  const result = data[0];
  const coordinates: Coordinates = {
    latitude: parseFloat(result.lat),
    longitude: parseFloat(result.lon),
  };

  const address_data = result.address || {};
  const location: Location = {
    ...coordinates,
    address: result.display_name,
    city: address_data.city || address_data.suburb || '',
    state: address_data.state || '',
    postal_code: address_data.postcode || '',
    country: address_data.country || 'Australia',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Reverse geocode using Nominatim
 */
async function reverseGeocodeWithNominatim(
  coordinates: Coordinates
): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    lat: coordinates.latitude.toString(),
    lon: coordinates.longitude.toString(),
    format: 'json',
    addressdetails: '1',
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params}`,
    {
      headers: {
        'User-Agent': 'RentItForward/1.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Nominatim reverse geocoding error: ${response.statusText}`);
  }

  const result = await response.json() as NominatimResult;

  if (!result.lat || !result.lon) {
    return {
      success: false,
      error: 'No address found for the provided coordinates',
    };
  }

  const address_data = result.address || {};
  const location: Location = {
    ...coordinates,
    address: result.display_name,
    city: address_data.city || address_data.suburb || '',
    state: address_data.state || '',
    postal_code: address_data.postcode || '',
    country: address_data.country || 'Australia',
  };

  return {
    success: true,
    location,
    coordinates,
  };
}

/**
 * Helper function to extract address component from Google's response
 */
function getAddressComponent(
  components: Array<{ long_name: string; short_name: string; types: string[] }>,
  types: string[]
): string | null {
  for (const component of components) {
    if (types.some(type => component.types.includes(type))) {
      return component.long_name;
    }
  }
  return null;
}

/**
 * Helper function to extract context from MapBox response
 */
function getMapBoxContext(
  context: Array<{ id: string; text: string }>,
  type: string
): string | null {
  const item = context.find(ctx => ctx.id.startsWith(type));
  return item ? item.text : null;
}

/**
 * Validate and clean address string for geocoding
 * @param address Address string to clean
 * @returns Cleaned address string
 */
export function cleanAddressForGeocoding(address: string): string {
  return address
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s\-,\.#\/]/g, '') // Remove special characters except common address chars
    .substring(0, 200); // Limit length
}

/**
 * Check if geocoding result is within Australia
 * @param result Geocoding result to validate
 * @returns True if result is valid and within Australia
 */
export function isValidAustralianResult(result: GeocodingResult): boolean {
  if (!result.success || !result.coordinates) {
    return false;
  }

  return isWithinAustralia(result.coordinates);
}

/**
 * Create a cache key for geocoding results
 * @param address Address string
 * @param provider Geocoding provider
 * @returns Cache key string
 */
export function createGeocodingCacheKey(
  address: string,
  provider: string
): string {
  const cleanAddress = cleanAddressForGeocoding(address).toLowerCase();
  return `geocoding:${provider}:${cleanAddress}`;
} 