"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEX_PATTERNS = exports.DATE_FORMATS = exports.STORAGE_BUCKETS = exports.API_ENDPOINTS = exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = exports.BUSINESS_RULES = exports.AUSTRALIAN_STATES = exports.CATEGORIES = exports.FONTS = exports.COLORS = void 0;
// Brand Colors
exports.COLORS = {
    primary: '#44D62C',
    secondary: '#343C3E',
    accent: '#FFFFFF',
    background: '#F8F9FA',
    text: {
        primary: '#1A1A1A',
        secondary: '#6B7280',
        light: '#9CA3AF'
    },
    status: {
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
    },
    border: '#E5E7EB',
    shadow: 'rgba(0, 0, 0, 0.1)'
};
// Typography
exports.FONTS = {
    primary: 'Poppins',
    secondary: 'Roboto',
    mono: 'Monaco, monospace'
};
// Category Configuration
exports.CATEGORIES = {
    TOOLS_DIY: {
        label: 'Tools & DIY',
        icon: '🔧',
        color: '#FF6B35',
        subcategories: ['Power Tools', 'Hand Tools', 'Measuring Tools', 'Safety Equipment', 'Ladders & Scaffolding']
    },
    ELECTRONICS: {
        label: 'Electronics',
        icon: '📱',
        color: '#4ECDC4',
        subcategories: ['Computers', 'Audio', 'Gaming', 'Smart Home', 'Tablets']
    },
    CAMERAS: {
        label: 'Cameras',
        icon: '📷',
        color: '#45B7D1',
        subcategories: ['DSLR', 'Mirrorless', 'Action Cameras', 'Lenses', 'Accessories']
    },
    SPORTS_OUTDOORS: {
        label: 'Sports & Outdoors',
        icon: '🏃',
        color: '#96CEB4',
        subcategories: ['Camping', 'Cycling', 'Water Sports', 'Winter Sports', 'Fitness']
    },
    EVENT_PARTY: {
        label: 'Event & Party',
        icon: '🎉',
        color: '#FECA57',
        subcategories: ['Sound Systems', 'Lighting', 'Decorations', 'Furniture', 'Catering Equipment']
    },
    INSTRUMENTS: {
        label: 'Instruments',
        icon: '🎸',
        color: '#FF9FF3',
        subcategories: ['Guitars', 'Keyboards', 'Drums', 'Wind Instruments', 'Recording Equipment']
    },
    AUTOMOTIVE: {
        label: 'Automotive',
        icon: '🚗',
        color: '#54A0FF',
        subcategories: ['Car Care', 'Tools', 'Accessories', 'Bike Racks', 'Trailers']
    },
    HOME_GARDEN: {
        label: 'Home & Garden',
        icon: '🏡',
        color: '#5F27CD',
        subcategories: ['Gardening Tools', 'Lawn Care', 'Cleaning Equipment', 'Furniture', 'Appliances']
    },
    APPLIANCES: {
        label: 'Appliances',
        icon: '🏠',
        color: '#00D2D3',
        subcategories: ['Kitchen', 'Laundry', 'Heating & Cooling', 'Small Appliances', 'Cleaning']
    },
    OTHER: {
        label: 'Other',
        icon: '📦',
        color: '#A0A0A0',
        subcategories: ['Books', 'Games', 'Baby Items', 'Pet Supplies', 'Miscellaneous']
    }
};
// Australian States
exports.AUSTRALIAN_STATES = [
    { code: 'NSW', name: 'New South Wales' },
    { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' },
    { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' },
    { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' },
    { code: 'NT', name: 'Northern Territory' }
];
// Business Rules
exports.BUSINESS_RULES = {
    // Pricing
    MIN_PRICE: 1,
    MAX_PRICE: 10000,
    DEFAULT_CURRENCY: 'AUD',
    // Rentals
    MIN_RENTAL_DAYS: 1,
    MAX_RENTAL_DAYS: 365,
    MAX_ADVANCE_BOOKING_DAYS: 365,
    // Images
    MAX_IMAGES_PER_LISTING: 10,
    MAX_IMAGE_SIZE_MB: 10,
    SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
    // Text Limits
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 2000,
    MAX_BIO_LENGTH: 500,
    // Search
    DEFAULT_SEARCH_RADIUS: 10, // km
    MAX_SEARCH_RADIUS: 100, // km
    DEFAULT_SEARCH_LIMIT: 20,
    MAX_SEARCH_LIMIT: 100,
    // Reviews
    MIN_RATING: 1,
    MAX_RATING: 5,
    // Fees
    SERVICE_FEE_PERCENTAGE: 0.05, // 5%
    PAYMENT_PROCESSING_FEE: 0.029, // 2.9%
    GST_RATE: 0.1 // 10%
};
// Error Messages
exports.ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid Australian phone number',
    INVALID_POSTCODE: 'Please enter a valid Australian postcode',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    INVALID_DATE: 'Please enter a valid date',
    INVALID_PRICE: 'Please enter a valid price',
    IMAGE_TOO_LARGE: 'Image file is too large',
    UNSUPPORTED_FILE_TYPE: 'File type not supported',
    GENERIC_ERROR: 'Something went wrong. Please try again.'
};
// Success Messages
exports.SUCCESS_MESSAGES = {
    ACCOUNT_CREATED: 'Account created successfully',
    LOGIN_SUCCESS: 'Logged in successfully',
    LISTING_CREATED: 'Listing created successfully',
    LISTING_UPDATED: 'Listing updated successfully',
    BOOKING_CREATED: 'Booking request sent successfully',
    BOOKING_CONFIRMED: 'Booking confirmed successfully',
    MESSAGE_SENT: 'Message sent successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    REVIEW_SUBMITTED: 'Review submitted successfully'
};
// API Endpoints (relative paths)
exports.API_ENDPOINTS = {
    // Auth
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    // Users
    USERS: '/api/users',
    USER_PROFILE: '/api/users/profile',
    USER_LISTINGS: '/api/users/listings',
    USER_BOOKINGS: '/api/users/bookings',
    // Listings
    LISTINGS: '/api/listings',
    LISTING_SEARCH: '/api/listings/search',
    LISTING_UPLOAD: '/api/listings/upload',
    // Bookings
    BOOKINGS: '/api/bookings',
    BOOKING_CONFIRM: '/api/bookings/confirm',
    BOOKING_CANCEL: '/api/bookings/cancel',
    // Messages
    MESSAGES: '/api/messages',
    CONVERSATIONS: '/api/conversations',
    // Reviews
    REVIEWS: '/api/reviews',
    // Payments
    PAYMENTS: '/api/payments',
    STRIPE_CONNECT: '/api/payments/stripe/connect',
    // Admin
    ADMIN_USERS: '/api/admin/users',
    ADMIN_LISTINGS: '/api/admin/listings',
    ADMIN_BOOKINGS: '/api/admin/bookings'
};
// Storage Buckets
exports.STORAGE_BUCKETS = {
    LISTING_IMAGES: 'listing-images',
    USER_AVATARS: 'user-avatars',
    VERIFICATION_DOCS: 'verification-documents',
    MESSAGE_ATTACHMENTS: 'message-attachments'
};
// Date Formats
exports.DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'dd/MM/yyyy HH:mm',
    TIME: 'HH:mm'
};
// Regex Patterns
exports.REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_AU: /^(\+61|0)[2-9]\d{8}$/,
    POSTCODE_AU: /^\d{4}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};
