import { z } from 'zod';
export declare enum ListingStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}
export declare enum ListingCondition {
    NEW = "new",
    LIKE_NEW = "like_new",
    EXCELLENT = "excellent",
    GOOD = "good",
    FAIR = "fair",
    POOR = "poor"
}
export declare enum ListingCategory {
    TOOLS_DIY = "tools_diy",
    ELECTRONICS = "electronics",
    CAMERAS = "cameras",
    SPORTS_OUTDOORS = "sports_outdoors",
    EVENT_PARTY = "event_party",
    INSTRUMENTS = "instruments",
    AUTOMOTIVE = "automotive",
    HOME_GARDEN = "home_garden",
    APPLIANCES = "appliances",
    OTHER = "other"
}
export declare enum PricingType {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    HOURLY = "hourly"
}
export declare const ListingImageSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
    alt: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    uploadedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string;
    order: number;
    uploadedAt: string;
    thumbnail?: string | undefined;
    alt?: string | undefined;
}, {
    id: string;
    url: string;
    order: number;
    uploadedAt: string;
    thumbnail?: string | undefined;
    alt?: string | undefined;
}>;
export declare const AvailabilitySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    unavailableDates: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    minimumRentalPeriod: z.ZodDefault<z.ZodNumber>;
    maximumRentalPeriod: z.ZodOptional<z.ZodNumber>;
    advanceBookingDays: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    minimumRentalPeriod: number;
    advanceBookingDays: number;
    unavailableDates?: string[] | undefined;
    maximumRentalPeriod?: number | undefined;
}, {
    startDate: string;
    endDate: string;
    unavailableDates?: string[] | undefined;
    minimumRentalPeriod?: number | undefined;
    maximumRentalPeriod?: number | undefined;
    advanceBookingDays?: number | undefined;
}>;
export declare const PricingSchema: z.ZodObject<{
    basePrice: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    pricingType: z.ZodDefault<z.ZodNativeEnum<typeof PricingType>>;
    weeklyDiscount: z.ZodOptional<z.ZodNumber>;
    monthlyDiscount: z.ZodOptional<z.ZodNumber>;
    securityDeposit: z.ZodOptional<z.ZodNumber>;
    cleaningFee: z.ZodOptional<z.ZodNumber>;
    deliveryFee: z.ZodOptional<z.ZodNumber>;
    pickupFee: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    basePrice: number;
    currency: string;
    pricingType: PricingType;
    weeklyDiscount?: number | undefined;
    monthlyDiscount?: number | undefined;
    securityDeposit?: number | undefined;
    cleaningFee?: number | undefined;
    deliveryFee?: number | undefined;
    pickupFee?: number | undefined;
}, {
    basePrice: number;
    currency?: string | undefined;
    pricingType?: PricingType | undefined;
    weeklyDiscount?: number | undefined;
    monthlyDiscount?: number | undefined;
    securityDeposit?: number | undefined;
    cleaningFee?: number | undefined;
    deliveryFee?: number | undefined;
    pickupFee?: number | undefined;
}>;
export declare const ListingSchema: z.ZodObject<{
    id: z.ZodString;
    ownerId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodNativeEnum<typeof ListingCategory>;
    subcategory: z.ZodOptional<z.ZodString>;
    condition: z.ZodNativeEnum<typeof ListingCondition>;
    brand: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    specifications: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        uploadedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }>, "many">;
    pricing: z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        pricingType: z.ZodDefault<z.ZodNativeEnum<typeof PricingType>>;
        weeklyDiscount: z.ZodOptional<z.ZodNumber>;
        monthlyDiscount: z.ZodOptional<z.ZodNumber>;
        securityDeposit: z.ZodOptional<z.ZodNumber>;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        deliveryFee: z.ZodOptional<z.ZodNumber>;
        pickupFee: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }, {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }>;
    availability: z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
        unavailableDates: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        minimumRentalPeriod: z.ZodDefault<z.ZodNumber>;
        maximumRentalPeriod: z.ZodOptional<z.ZodNumber>;
        advanceBookingDays: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    }, {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    }>;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postcode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        coordinates: z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lat: number;
            lng: number;
        }, {
            lat: number;
            lng: number;
        }>;
        deliveryRadius: z.ZodOptional<z.ZodNumber>;
        pickupAvailable: z.ZodDefault<z.ZodBoolean>;
        deliveryAvailable: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    }, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    }>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    includedItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    requirements: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    restrictions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    instructions: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodNativeEnum<typeof ListingStatus>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    favoriteCount: z.ZodDefault<z.ZodNumber>;
    bookingCount: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodDefault<z.ZodNumber>;
    reviewCount: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    featuredUntil: z.ZodOptional<z.ZodString>;
    lastBookedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: ListingStatus;
    location: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    };
    rating: number;
    reviewCount: number;
    ownerId: string;
    title: string;
    description: string;
    category: ListingCategory;
    condition: ListingCondition;
    images: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[];
    pricing: {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    };
    availability: {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    };
    viewCount: number;
    favoriteCount: number;
    bookingCount: number;
    createdAt: string;
    updatedAt: string;
    subcategory?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    tags?: string[] | undefined;
    publishedAt?: string | undefined;
    featuredUntil?: string | undefined;
    lastBookedAt?: string | undefined;
}, {
    id: string;
    location: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    };
    ownerId: string;
    title: string;
    description: string;
    category: ListingCategory;
    condition: ListingCondition;
    images: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[];
    pricing: {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    };
    availability: {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    };
    createdAt: string;
    updatedAt: string;
    status?: ListingStatus | undefined;
    rating?: number | undefined;
    reviewCount?: number | undefined;
    subcategory?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    viewCount?: number | undefined;
    favoriteCount?: number | undefined;
    bookingCount?: number | undefined;
    tags?: string[] | undefined;
    publishedAt?: string | undefined;
    featuredUntil?: string | undefined;
    lastBookedAt?: string | undefined;
}>;
export declare const CreateListingSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    ownerId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodNativeEnum<typeof ListingCategory>;
    subcategory: z.ZodOptional<z.ZodString>;
    condition: z.ZodNativeEnum<typeof ListingCondition>;
    brand: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    specifications: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        uploadedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }>, "many">;
    pricing: z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        pricingType: z.ZodDefault<z.ZodNativeEnum<typeof PricingType>>;
        weeklyDiscount: z.ZodOptional<z.ZodNumber>;
        monthlyDiscount: z.ZodOptional<z.ZodNumber>;
        securityDeposit: z.ZodOptional<z.ZodNumber>;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        deliveryFee: z.ZodOptional<z.ZodNumber>;
        pickupFee: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }, {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }>;
    availability: z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
        unavailableDates: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        minimumRentalPeriod: z.ZodDefault<z.ZodNumber>;
        maximumRentalPeriod: z.ZodOptional<z.ZodNumber>;
        advanceBookingDays: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    }, {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    }>;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postcode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        coordinates: z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lat: number;
            lng: number;
        }, {
            lat: number;
            lng: number;
        }>;
        deliveryRadius: z.ZodOptional<z.ZodNumber>;
        pickupAvailable: z.ZodDefault<z.ZodBoolean>;
        deliveryAvailable: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    }, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    }>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    includedItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    requirements: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    restrictions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    instructions: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodNativeEnum<typeof ListingStatus>>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    favoriteCount: z.ZodDefault<z.ZodNumber>;
    bookingCount: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodDefault<z.ZodNumber>;
    reviewCount: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
    featuredUntil: z.ZodOptional<z.ZodString>;
    lastBookedAt: z.ZodOptional<z.ZodString>;
}, "id" | "status" | "rating" | "reviewCount" | "ownerId" | "viewCount" | "favoriteCount" | "bookingCount" | "createdAt" | "updatedAt" | "publishedAt" | "lastBookedAt">, "strip", z.ZodTypeAny, {
    location: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    };
    title: string;
    description: string;
    category: ListingCategory;
    condition: ListingCondition;
    images: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[];
    pricing: {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    };
    availability: {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    };
    subcategory?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    tags?: string[] | undefined;
    featuredUntil?: string | undefined;
}, {
    location: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    };
    title: string;
    description: string;
    category: ListingCategory;
    condition: ListingCondition;
    images: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[];
    pricing: {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    };
    availability: {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    };
    subcategory?: string | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    tags?: string[] | undefined;
    featuredUntil?: string | undefined;
}>;
export declare const UpdateListingSchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postcode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        coordinates: z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lat: number;
            lng: number;
        }, {
            lat: number;
            lng: number;
        }>;
        deliveryRadius: z.ZodOptional<z.ZodNumber>;
        pickupAvailable: z.ZodDefault<z.ZodBoolean>;
        deliveryAvailable: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    }, {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodNativeEnum<typeof ListingCategory>>;
    subcategory: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    condition: z.ZodOptional<z.ZodNativeEnum<typeof ListingCondition>>;
    brand: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    model: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    year: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    specifications: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        uploadedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }, {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }>, "many">>;
    pricing: z.ZodOptional<z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        pricingType: z.ZodDefault<z.ZodNativeEnum<typeof PricingType>>;
        weeklyDiscount: z.ZodOptional<z.ZodNumber>;
        monthlyDiscount: z.ZodOptional<z.ZodNumber>;
        securityDeposit: z.ZodOptional<z.ZodNumber>;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        deliveryFee: z.ZodOptional<z.ZodNumber>;
        pickupFee: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }, {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    }>>;
    availability: z.ZodOptional<z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
        unavailableDates: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        minimumRentalPeriod: z.ZodDefault<z.ZodNumber>;
        maximumRentalPeriod: z.ZodOptional<z.ZodNumber>;
        advanceBookingDays: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    }, {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    }>>;
    features: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    includedItems: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    requirements: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    restrictions: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    featuredUntil: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        pickupAvailable: boolean;
        deliveryAvailable: boolean;
        deliveryRadius?: number | undefined;
    } | undefined;
    title?: string | undefined;
    description?: string | undefined;
    category?: ListingCategory | undefined;
    subcategory?: string | undefined;
    condition?: ListingCondition | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    images?: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[] | undefined;
    pricing?: {
        basePrice: number;
        currency: string;
        pricingType: PricingType;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    } | undefined;
    availability?: {
        startDate: string;
        endDate: string;
        minimumRentalPeriod: number;
        advanceBookingDays: number;
        unavailableDates?: string[] | undefined;
        maximumRentalPeriod?: number | undefined;
    } | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    tags?: string[] | undefined;
    featuredUntil?: string | undefined;
}, {
    location?: {
        address: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country?: string | undefined;
        deliveryRadius?: number | undefined;
        pickupAvailable?: boolean | undefined;
        deliveryAvailable?: boolean | undefined;
    } | undefined;
    title?: string | undefined;
    description?: string | undefined;
    category?: ListingCategory | undefined;
    subcategory?: string | undefined;
    condition?: ListingCondition | undefined;
    brand?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    specifications?: Record<string, string> | undefined;
    images?: {
        id: string;
        url: string;
        order: number;
        uploadedAt: string;
        thumbnail?: string | undefined;
        alt?: string | undefined;
    }[] | undefined;
    pricing?: {
        basePrice: number;
        currency?: string | undefined;
        pricingType?: PricingType | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
        pickupFee?: number | undefined;
    } | undefined;
    availability?: {
        startDate: string;
        endDate: string;
        unavailableDates?: string[] | undefined;
        minimumRentalPeriod?: number | undefined;
        maximumRentalPeriod?: number | undefined;
        advanceBookingDays?: number | undefined;
    } | undefined;
    features?: string[] | undefined;
    includedItems?: string[] | undefined;
    requirements?: string[] | undefined;
    restrictions?: string[] | undefined;
    instructions?: string | undefined;
    tags?: string[] | undefined;
    featuredUntil?: string | undefined;
}>;
export declare const ListingFilterSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodNativeEnum<typeof ListingCategory>>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    condition: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof ListingCondition>, "many">>;
    location: z.ZodOptional<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
        radius: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
        radius: number;
    }, {
        lat: number;
        lng: number;
        radius?: number | undefined;
    }>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    deliveryAvailable: z.ZodOptional<z.ZodBoolean>;
    pickupAvailable: z.ZodOptional<z.ZodBoolean>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sortBy: z.ZodDefault<z.ZodEnum<["relevance", "price_low", "price_high", "newest", "rating", "distance"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sortBy: "rating" | "relevance" | "price_low" | "price_high" | "newest" | "distance";
    page: number;
    limit: number;
    location?: {
        lat: number;
        lng: number;
        radius: number;
    } | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    category?: ListingCategory | undefined;
    condition?: ListingCondition[] | undefined;
    pickupAvailable?: boolean | undefined;
    deliveryAvailable?: boolean | undefined;
    features?: string[] | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    location?: {
        lat: number;
        lng: number;
        radius?: number | undefined;
    } | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    category?: ListingCategory | undefined;
    condition?: ListingCondition[] | undefined;
    pickupAvailable?: boolean | undefined;
    deliveryAvailable?: boolean | undefined;
    features?: string[] | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    sortBy?: "rating" | "relevance" | "price_low" | "price_high" | "newest" | "distance" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type Listing = z.infer<typeof ListingSchema>;
export type CreateListing = z.infer<typeof CreateListingSchema>;
export type UpdateListing = z.infer<typeof UpdateListingSchema>;
export type ListingImage = z.infer<typeof ListingImageSchema>;
export type ListingPricing = z.infer<typeof PricingSchema>;
export type ListingAvailability = z.infer<typeof AvailabilitySchema>;
export type ListingFilter = z.infer<typeof ListingFilterSchema>;
export type ListingLocation = Listing['location'];
