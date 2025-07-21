# Rent It Forward – Shared Package

**Last Updated**: July 20, 2025  
**Version**: 1.0.0  
**Status**: Foundation Complete

This package contains shared logic used by both the web and mobile apps in the **Rent It Forward** multi-repo workspace.

---

## 🏗️ Workspace Context

This project is part of a multi-repository workspace for **Rent It Forward** (RENTITFORWARD-WORKSPACE), a peer-to-peer rental marketplace.

Workspace contains:
- `rentitforward-web/`: Next.js + Tailwind web app
- `rentitforward-mobile/`: Expo + React Native mobile app
- `rentitforward-shared/`: Shared logic (types, utils, API clients) **(THIS PACKAGE)**

Please use shared logic from `rentitforward-shared` wherever possible.

---

## 📦 Package Overview

This is a **pure TypeScript package** that provides:
- Type-safe interfaces and schemas
- Utility functions and helpers
- Design system tokens
- Business logic and constants
- Validation schemas with Zod

**Key Principle**: This package contains **NO platform-specific code** - it works across web, mobile, and any TypeScript environment.

---

## 📁 Folder Structure

```
src/
├── constants/                    # Static configurations and enums
│   └── index.ts                 # App-wide constants and categories
├── design-system/               # Cross-platform UI tokens
│   ├── colors.ts               # Brand colors and semantic colors
│   ├── spacing.ts              # Consistent spacing scale
│   ├── typography.ts           # Font sizes, weights, line heights
│   ├── breakpoints.ts          # Responsive design breakpoints
│   ├── patterns.ts             # Common component patterns
│   ├── components.ts           # Component-specific styling tokens
│   ├── layout.ts               # Layout-related constants
│   ├── theme.ts                # Combined theme configuration
│   ├── tokens.ts               # Flattened token exports
│   └── index.ts                # Main design system export
├── types/                       # Shared TypeScript interfaces
│   ├── user.ts                 # User profiles, roles, authentication
│   ├── listing.ts              # Listings, categories, pricing
│   ├── booking.ts              # Bookings, payments, delivery
│   └── index.ts                # Re-exported types
├── utils/                       # Helper functions and business logic
│   ├── formatting.ts           # Date, price, text formatting
│   ├── pricing.ts              # Rental pricing calculations
│   ├── stripe.ts               # Stripe utility functions
│   └── index.ts                # Re-exported utilities
└── index.ts                     # Main package entry point
```

---

## 🎨 Design System

### Core Philosophy
The design system provides a single source of truth for styling across web (Tailwind CSS) and mobile (NativeWind) platforms.

### Design Tokens
```typescript
// Colors
export const colors = {
  primary: {
    green: '#44D62C',        // Brand green
    // ... full scale
  },
  gray: {
    50: '#f9fafb',
    // ... full scale
    900: '#111827',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Typography
export const typography = {
  sizes: {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
    // ... full scale
  },
  weights: {
    normal: '400', medium: '500', semibold: '600', bold: '700',
  },
  lineHeights: {
    tight: 1.25, normal: 1.5, relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  // ... full scale
};
```

### Usage Examples

#### Web (Tailwind CSS)
```typescript
import { colors, spacing } from 'rentitforward-shared/src/design-system';

// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        gray: colors.gray,
      },
      spacing: spacing,
    },
  },
};

// In components
<div className="bg-primary-green text-white p-4">
  <h1 className="text-2xl font-semibold">Rent It Forward</h1>
</div>
```

#### Mobile (React Native + NativeWind)
```typescript
import { colors, spacing, typography } from 'rentitforward-shared/src/design-system';

// In components
<View className="bg-primary-green p-4">
  <Text style={{ 
    color: colors.white, 
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold 
  }}>
    Rent It Forward
  </Text>
</View>
```

---

## 📊 Type System

### Comprehensive Data Models

#### User Types
```typescript
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: UserLocation;
  role: UserRole;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  rating: number;
  reviewCount: number;
  joinedAt: string;
  stripeAccountId?: string;
  stripeCustomerId?: string;
}

// Registration and update schemas
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
```

#### Listing Types
```typescript
export interface Listing {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: ListingCategory;
  condition: ListingCondition;
  images: ListingImage[];
  pricing: ListingPricing;
  availability: ListingAvailability;
  location: ListingLocation;
  status: ListingStatus;
  rating: number;
  reviewCount: number;
  // ... comprehensive fields
}

// Creation and update schemas
export type CreateListing = z.infer<typeof CreateListingSchema>;
export type UpdateListing = z.infer<typeof UpdateListingSchema>;
```

#### Booking Types
```typescript
export interface Booking {
  id: string;
  listingId: string;
  ownerId: string;
  renterId: string;
  status: BookingStatus;
  startDate: string;
  endDate: string;
  pricing: BookingPricing;
  delivery: BookingDelivery;
  // ... comprehensive fields
}
```

### Validation with Zod
All types include corresponding Zod schemas for runtime validation:

```typescript
import { UserRegistrationSchema, CreateListingSchema } from 'rentitforward-shared/src/types';

// Validate user input
const validUser = UserRegistrationSchema.parse(userInput);

// Validate listing data
const validListing = CreateListingSchema.parse(listingData);
```

---

## 🔧 Utility Functions

### Formatting Utilities
```typescript
import { formatPrice, formatDate, slugify } from 'rentitforward-shared/src/utils/formatting';

// Price formatting
formatPrice(29.99); // "$29.99"
formatPrice(29.99, 'EUR', 'de-DE'); // "29,99 €"

// Date formatting
formatDate(new Date()); // "January 20, 2025"

// URL-friendly slugs
slugify("Amazing Camera Lens"); // "amazing-camera-lens"
```

### Pricing Calculations
```typescript
import { 
  calculatePlatformFee, 
  calculateTotalPrice,
  calculateDuration 
} from 'rentitforward-shared/src/utils/pricing';

// Platform fee calculation
const fee = calculatePlatformFee(100); // 3.00 (3% default)

// Total pricing
const total = calculateTotalPrice(100, 3); // 103.00

// Rental duration
const days = calculateDuration(startDate, endDate); // Number of days
```

### Stripe Utilities
```typescript
import { stripeUtils } from 'rentitforward-shared/src/utils/stripe';

// Connect account helpers
// Platform-specific Stripe logic
```

---

## 📋 Constants & Configuration

### Application Constants
```typescript
import { 
  PLATFORM_CONSTANTS,
  LISTING_CATEGORIES,
  BOOKING_STATUSES 
} from 'rentitforward-shared/src/constants';

// Validation limits
PLATFORM_CONSTANTS.MAX_TITLE_LENGTH; // 100
PLATFORM_CONSTANTS.PLATFORM_FEE_RATE; // 0.03 (3%)

// Category options
LISTING_CATEGORIES.map(cat => ({
  value: cat.value,
  label: cat.label
}));

// Status options for UI
BOOKING_STATUSES.filter(status => status.value !== 'cancelled');
```

---

## 🛠️ Development & Build

### Installation
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run dev

# Clean build directory
npm run clean
```

### Usage in Other Packages

#### Web Application
```typescript
// In rentitforward-web
import type { User, Listing } from '@rentitforward/shared';
import { colors, formatPrice } from '@rentitforward/shared';
```

#### Mobile Application
```typescript
// In rentitforward-mobile  
import type { User, Listing } from 'rentitforward-shared/src/types';
import { colors, formatPrice } from 'rentitforward-shared/src/utils/formatting';
```

### Build Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## ✅ Current Implementation Status

### ✅ Completed
- [x] **Type System (100%)**
  - User, Listing, and Booking interfaces
  - Comprehensive Zod validation schemas
  - TypeScript strict mode compliance
  
- [x] **Design System (100%)**
  - Complete color palette with semantic colors
  - Typography scale and weights
  - Spacing system and breakpoints
  - Cross-platform compatibility

- [x] **Utility Functions (80%)**
  - Formatting helpers (price, date, text)
  - Pricing calculation functions
  - Basic Stripe utilities
  
- [x] **Constants (100%)**
  - Platform configuration
  - Category and status definitions
  - Validation limits

### 🚧 In Progress
- [ ] **Advanced Utilities (20%)**
  - Complex Stripe Connect helpers
  - Search/filtering utilities
  - Analytics helpers

- [ ] **Validation Enhancements**
  - Custom validation rules
  - Error message standardization
  - Form validation helpers

### 📋 Future Enhancements
- [ ] **API Client Abstractions**
  - Supabase client wrappers
  - Error handling utilities
  - Request/response type safety

- [ ] **Business Logic**
  - Booking availability calculations
  - Pricing rule engine
  - Notification templates

---

## 🔍 Testing & Quality

### Type Safety
- Strict TypeScript configuration
- Comprehensive type coverage
- Runtime validation with Zod

### Testing (Planned)
```bash
# Unit tests for utilities
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📚 Documentation Standards

### Function Documentation
```typescript
/**
 * Calculates the platform fee for a given amount
 * @param amount - The base amount to calculate fee for
 * @param feeRate - The fee rate as a decimal (default: 0.03 for 3%)
 * @returns The calculated fee amount, rounded to 2 decimal places
 * @example
 * calculatePlatformFee(100) // 3.00
 * calculatePlatformFee(100, 0.05) // 5.00
 */
export function calculatePlatformFee(
  amount: number, 
  feeRate: number = PLATFORM_CONSTANTS.PLATFORM_FEE_RATE
): number {
  return Math.round(amount * feeRate * 100) / 100;
}
```

### Type Documentation
```typescript
/**
 * User entity representing a platform user
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  // ...
}
```

---

## 🔗 Integration Examples

### Web Application Integration
```typescript
// tailwind.config.js
import { colors, spacing, typography } from 'rentitforward-shared/src/design-system';

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        gray: colors.gray,
        semantic: colors.semantic,
      },
      spacing,
      fontSize: typography.sizes,
      fontWeight: typography.weights,
    },
  },
};

// React component
import type { Listing } from '@rentitforward/shared';
import { formatPrice } from '@rentitforward/shared';

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900">{listing.title}</h3>
      <p className="text-primary-green font-bold">
        {formatPrice(listing.pricing.basePrice)}
      </p>
    </div>
  );
}
```

### Mobile Application Integration
```typescript
// React Native component
import type { Listing } from 'rentitforward-shared/src/types';
import { formatPrice } from 'rentitforward-shared/src/utils/formatting';
import { colors, spacing } from 'rentitforward-shared/src/design-system';

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <View style={{
      backgroundColor: colors.white,
      padding: spacing.md,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.gray[200],
    }}>
      <Text style={{
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
        color: colors.gray[900],
      }}>
        {listing.title}
      </Text>
      <Text style={{
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        color: colors.primary.green,
      }}>
        {formatPrice(listing.pricing.basePrice)}
      </Text>
    </View>
  );
}
```

---

## 📞 Support & Resources

### Dependencies
- **Zod**: Schema validation and type inference
- **Stripe**: Payment processing utilities
- **TypeScript**: Type safety and compilation

### Development Resources
- **TypeScript Documentation**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Zod Documentation**: [https://zod.dev/](https://zod.dev/)
- **Design Token Best Practices**: [https://spectrum.adobe.com/page/design-tokens/](https://spectrum.adobe.com/page/design-tokens/)

### Project Resources
- **Project Status**: See `../DOCUMENTS/Project_Status_Update_2025-01-20.md`
- **Web App README**: See `../rentitforward-web/README.md`
- **Mobile App README**: See `../rentitforward-mobile/README.md`

---

*This package serves as the foundation for consistent types, styling, and business logic across the entire Rent It Forward platform. All changes should maintain backward compatibility and cross-platform support.*