/**
 * Shared utilities index
 * Export all utility functions for use across web and mobile platforms
 */

// Formatting utilities
export * from './formatting';

// Pricing utilities
export * from './pricing';

// Platform utilities
export * from './platform';

// Stripe utilities (platform-aware)
export * from './stripe-platform';

// Legacy Stripe utilities (server-only, temporarily disabled for mobile compatibility)
// export * from './stripe';

// Reviews utilities
export * from './reviews';

// Geolocation utilities
export * from './geolocation';

// Geocoding utilities
export * from './geocoding';

// Notification utilities
export * from './notifications';
export * from './notification-triggers';

// Search and predictive text utilities
export * from './search';
export * from './search-api';

// Calendar and availability utilities
export * from './calendar';