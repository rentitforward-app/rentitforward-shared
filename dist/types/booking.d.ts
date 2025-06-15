import { z } from 'zod';
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DISPUTED = "disputed",
    REFUNDED = "refunded"
}
export declare enum BookingCancellationReason {
    USER_REQUESTED = "user_requested",
    OWNER_CANCELLED = "owner_cancelled",
    ITEM_UNAVAILABLE = "item_unavailable",
    PAYMENT_FAILED = "payment_failed",
    POLICY_VIOLATION = "policy_violation",
    DAMAGE_REPORTED = "damage_reported",
    OTHER = "other"
}
export declare enum DeliveryMethod {
    PICKUP = "pickup",
    DELIVERY = "delivery",
    MEETUP = "meetup"
}
export declare const BookingSchema: z.ZodObject<{
    id: z.ZodString;
    listingId: z.ZodString;
    ownerId: z.ZodString;
    renterId: z.ZodString;
    status: z.ZodDefault<z.ZodNativeEnum<typeof BookingStatus>>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    durationDays: z.ZodNumber;
    pricing: z.ZodObject<{
        basePrice: z.ZodNumber;
        totalDays: z.ZodNumber;
        subtotal: z.ZodNumber;
        weeklyDiscount: z.ZodOptional<z.ZodNumber>;
        monthlyDiscount: z.ZodOptional<z.ZodNumber>;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        deliveryFee: z.ZodOptional<z.ZodNumber>;
        serviceFee: z.ZodNumber;
        securityDeposit: z.ZodOptional<z.ZodNumber>;
        tax: z.ZodNumber;
        total: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        basePrice: number;
        currency: string;
        totalDays: number;
        subtotal: number;
        serviceFee: number;
        tax: number;
        total: number;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
    }, {
        basePrice: number;
        totalDays: number;
        subtotal: number;
        serviceFee: number;
        tax: number;
        total: number;
        currency?: string | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
    }>;
    delivery: z.ZodObject<{
        method: z.ZodNativeEnum<typeof DeliveryMethod>;
        pickupAddress: z.ZodOptional<z.ZodString>;
        deliveryAddress: z.ZodOptional<z.ZodString>;
        meetupLocation: z.ZodOptional<z.ZodString>;
        pickupTime: z.ZodOptional<z.ZodString>;
        deliveryTime: z.ZodOptional<z.ZodString>;
        returnTime: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }, {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }>;
    specialRequests: z.ZodOptional<z.ZodString>;
    renterNotes: z.ZodOptional<z.ZodString>;
    ownerNotes: z.ZodOptional<z.ZodString>;
    confirmedAt: z.ZodOptional<z.ZodString>;
    startedAt: z.ZodOptional<z.ZodString>;
    completedAt: z.ZodOptional<z.ZodString>;
    cancelledAt: z.ZodOptional<z.ZodString>;
    cancellationReason: z.ZodOptional<z.ZodNativeEnum<typeof BookingCancellationReason>>;
    cancellationNote: z.ZodOptional<z.ZodString>;
    lastMessageAt: z.ZodOptional<z.ZodString>;
    unreadMessagesCount: z.ZodDefault<z.ZodNumber>;
    renterReviewId: z.ZodOptional<z.ZodString>;
    ownerReviewId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: BookingStatus;
    startDate: string;
    endDate: string;
    ownerId: string;
    pricing: {
        basePrice: number;
        currency: string;
        totalDays: number;
        subtotal: number;
        serviceFee: number;
        tax: number;
        total: number;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
    };
    createdAt: string;
    updatedAt: string;
    delivery: {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    };
    listingId: string;
    renterId: string;
    durationDays: number;
    unreadMessagesCount: number;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
    ownerNotes?: string | undefined;
    confirmedAt?: string | undefined;
    startedAt?: string | undefined;
    completedAt?: string | undefined;
    cancelledAt?: string | undefined;
    cancellationReason?: BookingCancellationReason | undefined;
    cancellationNote?: string | undefined;
    lastMessageAt?: string | undefined;
    renterReviewId?: string | undefined;
    ownerReviewId?: string | undefined;
}, {
    id: string;
    startDate: string;
    endDate: string;
    ownerId: string;
    pricing: {
        basePrice: number;
        totalDays: number;
        subtotal: number;
        serviceFee: number;
        tax: number;
        total: number;
        currency?: string | undefined;
        weeklyDiscount?: number | undefined;
        monthlyDiscount?: number | undefined;
        securityDeposit?: number | undefined;
        cleaningFee?: number | undefined;
        deliveryFee?: number | undefined;
    };
    createdAt: string;
    updatedAt: string;
    delivery: {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    };
    listingId: string;
    renterId: string;
    durationDays: number;
    status?: BookingStatus | undefined;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
    ownerNotes?: string | undefined;
    confirmedAt?: string | undefined;
    startedAt?: string | undefined;
    completedAt?: string | undefined;
    cancelledAt?: string | undefined;
    cancellationReason?: BookingCancellationReason | undefined;
    cancellationNote?: string | undefined;
    lastMessageAt?: string | undefined;
    unreadMessagesCount?: number | undefined;
    renterReviewId?: string | undefined;
    ownerReviewId?: string | undefined;
}>;
export declare const CreateBookingSchema: z.ZodObject<{
    listingId: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    delivery: z.ZodObject<{
        method: z.ZodNativeEnum<typeof DeliveryMethod>;
        pickupAddress: z.ZodOptional<z.ZodString>;
        deliveryAddress: z.ZodOptional<z.ZodString>;
        meetupLocation: z.ZodOptional<z.ZodString>;
        pickupTime: z.ZodOptional<z.ZodString>;
        deliveryTime: z.ZodOptional<z.ZodString>;
        returnTime: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }, {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }>;
    specialRequests: z.ZodOptional<z.ZodString>;
    renterNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    delivery: {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    };
    listingId: string;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
}, {
    startDate: string;
    endDate: string;
    delivery: {
        method: DeliveryMethod;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    };
    listingId: string;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
}>;
export declare const UpdateBookingSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<typeof BookingStatus>>;
    delivery: z.ZodOptional<z.ZodObject<{
        method: z.ZodOptional<z.ZodNativeEnum<typeof DeliveryMethod>>;
        pickupAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        deliveryAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        meetupLocation: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        pickupTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        deliveryTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        returnTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        method?: DeliveryMethod | undefined;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }, {
        method?: DeliveryMethod | undefined;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    }>>;
    specialRequests: z.ZodOptional<z.ZodString>;
    renterNotes: z.ZodOptional<z.ZodString>;
    ownerNotes: z.ZodOptional<z.ZodString>;
    cancellationReason: z.ZodOptional<z.ZodNativeEnum<typeof BookingCancellationReason>>;
    cancellationNote: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: BookingStatus | undefined;
    delivery?: {
        method?: DeliveryMethod | undefined;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    } | undefined;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
    ownerNotes?: string | undefined;
    cancellationReason?: BookingCancellationReason | undefined;
    cancellationNote?: string | undefined;
}, {
    status?: BookingStatus | undefined;
    delivery?: {
        method?: DeliveryMethod | undefined;
        pickupAddress?: string | undefined;
        deliveryAddress?: string | undefined;
        meetupLocation?: string | undefined;
        pickupTime?: string | undefined;
        deliveryTime?: string | undefined;
        returnTime?: string | undefined;
        notes?: string | undefined;
    } | undefined;
    specialRequests?: string | undefined;
    renterNotes?: string | undefined;
    ownerNotes?: string | undefined;
    cancellationReason?: BookingCancellationReason | undefined;
    cancellationNote?: string | undefined;
}>;
export declare const BookingFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof BookingStatus>, "many">>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    renterId: z.ZodOptional<z.ZodString>;
    listingId: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["newest", "oldest", "start_date", "end_date", "total"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sortBy: "newest" | "total" | "oldest" | "start_date" | "end_date";
    page: number;
    limit: number;
    status?: BookingStatus[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    ownerId?: string | undefined;
    listingId?: string | undefined;
    renterId?: string | undefined;
}, {
    status?: BookingStatus[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    ownerId?: string | undefined;
    sortBy?: "newest" | "total" | "oldest" | "start_date" | "end_date" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    listingId?: string | undefined;
    renterId?: string | undefined;
}>;
export type Booking = z.infer<typeof BookingSchema>;
export type CreateBooking = z.infer<typeof CreateBookingSchema>;
export type UpdateBooking = z.infer<typeof UpdateBookingSchema>;
export type BookingFilter = z.infer<typeof BookingFilterSchema>;
export type BookingPricing = Booking['pricing'];
export type BookingDelivery = Booking['delivery'];
