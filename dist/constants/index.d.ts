export declare const COLORS: {
    readonly primary: "#44D62C";
    readonly secondary: "#343C3E";
    readonly accent: "#FFFFFF";
    readonly background: "#F8F9FA";
    readonly text: {
        readonly primary: "#1A1A1A";
        readonly secondary: "#6B7280";
        readonly light: "#9CA3AF";
    };
    readonly status: {
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly error: "#EF4444";
        readonly info: "#3B82F6";
    };
    readonly border: "#E5E7EB";
    readonly shadow: "rgba(0, 0, 0, 0.1)";
};
export declare const FONTS: {
    readonly primary: "Poppins";
    readonly secondary: "Roboto";
    readonly mono: "Monaco, monospace";
};
export declare const CATEGORIES: {
    readonly TOOLS_DIY: {
        readonly label: "Tools & DIY";
        readonly icon: "🔧";
        readonly color: "#FF6B35";
        readonly subcategories: readonly ["Power Tools", "Hand Tools", "Measuring Tools", "Safety Equipment", "Ladders & Scaffolding"];
    };
    readonly ELECTRONICS: {
        readonly label: "Electronics";
        readonly icon: "📱";
        readonly color: "#4ECDC4";
        readonly subcategories: readonly ["Computers", "Audio", "Gaming", "Smart Home", "Tablets"];
    };
    readonly CAMERAS: {
        readonly label: "Cameras";
        readonly icon: "📷";
        readonly color: "#45B7D1";
        readonly subcategories: readonly ["DSLR", "Mirrorless", "Action Cameras", "Lenses", "Accessories"];
    };
    readonly SPORTS_OUTDOORS: {
        readonly label: "Sports & Outdoors";
        readonly icon: "🏃";
        readonly color: "#96CEB4";
        readonly subcategories: readonly ["Camping", "Cycling", "Water Sports", "Winter Sports", "Fitness"];
    };
    readonly EVENT_PARTY: {
        readonly label: "Event & Party";
        readonly icon: "🎉";
        readonly color: "#FECA57";
        readonly subcategories: readonly ["Sound Systems", "Lighting", "Decorations", "Furniture", "Catering Equipment"];
    };
    readonly INSTRUMENTS: {
        readonly label: "Instruments";
        readonly icon: "🎸";
        readonly color: "#FF9FF3";
        readonly subcategories: readonly ["Guitars", "Keyboards", "Drums", "Wind Instruments", "Recording Equipment"];
    };
    readonly AUTOMOTIVE: {
        readonly label: "Automotive";
        readonly icon: "🚗";
        readonly color: "#54A0FF";
        readonly subcategories: readonly ["Car Care", "Tools", "Accessories", "Bike Racks", "Trailers"];
    };
    readonly HOME_GARDEN: {
        readonly label: "Home & Garden";
        readonly icon: "🏡";
        readonly color: "#5F27CD";
        readonly subcategories: readonly ["Gardening Tools", "Lawn Care", "Cleaning Equipment", "Furniture", "Appliances"];
    };
    readonly APPLIANCES: {
        readonly label: "Appliances";
        readonly icon: "🏠";
        readonly color: "#00D2D3";
        readonly subcategories: readonly ["Kitchen", "Laundry", "Heating & Cooling", "Small Appliances", "Cleaning"];
    };
    readonly OTHER: {
        readonly label: "Other";
        readonly icon: "📦";
        readonly color: "#A0A0A0";
        readonly subcategories: readonly ["Books", "Games", "Baby Items", "Pet Supplies", "Miscellaneous"];
    };
};
export declare const AUSTRALIAN_STATES: readonly [{
    readonly code: "NSW";
    readonly name: "New South Wales";
}, {
    readonly code: "VIC";
    readonly name: "Victoria";
}, {
    readonly code: "QLD";
    readonly name: "Queensland";
}, {
    readonly code: "WA";
    readonly name: "Western Australia";
}, {
    readonly code: "SA";
    readonly name: "South Australia";
}, {
    readonly code: "TAS";
    readonly name: "Tasmania";
}, {
    readonly code: "ACT";
    readonly name: "Australian Capital Territory";
}, {
    readonly code: "NT";
    readonly name: "Northern Territory";
}];
export declare const BUSINESS_RULES: {
    readonly MIN_PRICE: 1;
    readonly MAX_PRICE: 10000;
    readonly DEFAULT_CURRENCY: "AUD";
    readonly MIN_RENTAL_DAYS: 1;
    readonly MAX_RENTAL_DAYS: 365;
    readonly MAX_ADVANCE_BOOKING_DAYS: 365;
    readonly MAX_IMAGES_PER_LISTING: 10;
    readonly MAX_IMAGE_SIZE_MB: 10;
    readonly SUPPORTED_IMAGE_FORMATS: readonly ["jpg", "jpeg", "png", "webp"];
    readonly MAX_TITLE_LENGTH: 100;
    readonly MAX_DESCRIPTION_LENGTH: 2000;
    readonly MAX_BIO_LENGTH: 500;
    readonly DEFAULT_SEARCH_RADIUS: 10;
    readonly MAX_SEARCH_RADIUS: 100;
    readonly DEFAULT_SEARCH_LIMIT: 20;
    readonly MAX_SEARCH_LIMIT: 100;
    readonly MIN_RATING: 1;
    readonly MAX_RATING: 5;
    readonly SERVICE_FEE_PERCENTAGE: 0.05;
    readonly PAYMENT_PROCESSING_FEE: 0.029;
    readonly GST_RATE: 0.1;
};
export declare const ERROR_MESSAGES: {
    readonly REQUIRED_FIELD: "This field is required";
    readonly INVALID_EMAIL: "Please enter a valid email address";
    readonly INVALID_PHONE: "Please enter a valid Australian phone number";
    readonly INVALID_POSTCODE: "Please enter a valid Australian postcode";
    readonly PASSWORD_TOO_SHORT: "Password must be at least 8 characters";
    readonly PASSWORDS_DONT_MATCH: "Passwords do not match";
    readonly INVALID_DATE: "Please enter a valid date";
    readonly INVALID_PRICE: "Please enter a valid price";
    readonly IMAGE_TOO_LARGE: "Image file is too large";
    readonly UNSUPPORTED_FILE_TYPE: "File type not supported";
    readonly GENERIC_ERROR: "Something went wrong. Please try again.";
};
export declare const SUCCESS_MESSAGES: {
    readonly ACCOUNT_CREATED: "Account created successfully";
    readonly LOGIN_SUCCESS: "Logged in successfully";
    readonly LISTING_CREATED: "Listing created successfully";
    readonly LISTING_UPDATED: "Listing updated successfully";
    readonly BOOKING_CREATED: "Booking request sent successfully";
    readonly BOOKING_CONFIRMED: "Booking confirmed successfully";
    readonly MESSAGE_SENT: "Message sent successfully";
    readonly PROFILE_UPDATED: "Profile updated successfully";
    readonly REVIEW_SUBMITTED: "Review submitted successfully";
};
export declare const API_ENDPOINTS: {
    readonly LOGIN: "/api/auth/login";
    readonly REGISTER: "/api/auth/register";
    readonly LOGOUT: "/api/auth/logout";
    readonly REFRESH: "/api/auth/refresh";
    readonly USERS: "/api/users";
    readonly USER_PROFILE: "/api/users/profile";
    readonly USER_LISTINGS: "/api/users/listings";
    readonly USER_BOOKINGS: "/api/users/bookings";
    readonly LISTINGS: "/api/listings";
    readonly LISTING_SEARCH: "/api/listings/search";
    readonly LISTING_UPLOAD: "/api/listings/upload";
    readonly BOOKINGS: "/api/bookings";
    readonly BOOKING_CONFIRM: "/api/bookings/confirm";
    readonly BOOKING_CANCEL: "/api/bookings/cancel";
    readonly MESSAGES: "/api/messages";
    readonly CONVERSATIONS: "/api/conversations";
    readonly REVIEWS: "/api/reviews";
    readonly PAYMENTS: "/api/payments";
    readonly STRIPE_CONNECT: "/api/payments/stripe/connect";
    readonly ADMIN_USERS: "/api/admin/users";
    readonly ADMIN_LISTINGS: "/api/admin/listings";
    readonly ADMIN_BOOKINGS: "/api/admin/bookings";
};
export declare const STORAGE_BUCKETS: {
    readonly LISTING_IMAGES: "listing-images";
    readonly USER_AVATARS: "user-avatars";
    readonly VERIFICATION_DOCS: "verification-documents";
    readonly MESSAGE_ATTACHMENTS: "message-attachments";
};
export declare const DATE_FORMATS: {
    readonly DISPLAY: "dd/MM/yyyy";
    readonly API: "yyyy-MM-dd";
    readonly DATETIME: "dd/MM/yyyy HH:mm";
    readonly TIME: "HH:mm";
};
export declare const REGEX_PATTERNS: {
    readonly EMAIL: RegExp;
    readonly PHONE_AU: RegExp;
    readonly POSTCODE_AU: RegExp;
    readonly PASSWORD: RegExp;
};
