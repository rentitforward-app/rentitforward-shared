// Core exports for rentitforward-shared
export * from './types/booking';
export * from './types/listing';
export * from './types/review';
export * from './types/user';
export * from './types/notification';
export * from './types/search';
export * from './design-system';
export * from './utils/formatting';
export * from './utils/reviews';
export * from './utils/stripe';
export * from './utils/pricing';
export * from './utils/notifications';
export * from './utils/notification-triggers';
export * from './utils/search';
export * from './utils/search-api';
export * from './constants';
export * from './graphql';

// Location types and utilities (selective exports to avoid conflicts)
export type {
  Coordinates,
  Location,
  GeolocationResult,
  GeocodingResult,
  DistanceCalculationOptions,
  ListingWithDistance,
  LocationBounds,
  LocationSearchParams,
  GeocodingConfig,
  AustralianStateCode,
} from './types/location';

export { 
  DEFAULT_AUSTRALIA_LOCATION,
  MAJOR_AUSTRALIAN_CITIES,
} from './types/location';

export {
  geocodeAddress,
  reverseGeocode,
  cleanAddressForGeocoding,
  isValidAustralianResult,
  createGeocodingCacheKey,
} from './utils/geocoding';

export {
  isValidCoordinates,
  isWithinAustralia,
  calculateCenterPoint,
  calculateBounds,
  isWithinBounds,
  findWithinRadius,
  sortByDistance,
  parsePostGISPoint,
  toPostGISPoint,
  getDefaultLocation,
} from './utils/geolocation'; 