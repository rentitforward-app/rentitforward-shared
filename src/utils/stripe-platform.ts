// Platform-aware Stripe utilities
import { isReactNative, isNode } from './platform';

// Type-only imports to avoid bundling issues
import type Stripe from 'stripe';

// Conditionally import and initialize Stripe only in server environments
let stripe: Stripe | null = null;

// Only initialize Stripe in server environments (Node.js)
if (isNode() && !isReactNative()) {
  try {
    // Dynamic require to avoid bundling in React Native
    const StripeModule = require('stripe');
    const StripeClass = StripeModule.default || StripeModule;
    
    if (StripeClass && process.env.STRIPE_SECRET_KEY) {
      stripe = new StripeClass(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',
      });
    }
  } catch (error) {
    console.warn('Stripe module not available in this environment:', error);
  }
}

// Helper function to ensure Stripe is available
function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error('Stripe is not available in this environment. Use this function only on the server.');
  }
  return stripe;
}

// ==================== PLATFORM DETECTION ====================

export function isStripeAvailable(): boolean {
  return stripe !== null;
}

export function requireServerEnvironment(): void {
  if (isReactNative()) {
    throw new Error('This function is not available in React Native. Use platform-specific Stripe SDK.');
  }
  if (!isNode()) {
    throw new Error('This function requires a server environment.');
  }
}

// ==================== SAFE STRIPE OPERATIONS ====================

// These functions can be called from any environment but will throw appropriate errors

export const createConnectedAccount = async (email: string, country: string = 'AU') => {
  requireServerEnvironment();
  const stripeInstance = requireStripe();
  
  const account = await stripeInstance.accounts.create({
    type: 'express',
    email,
    country,
    capabilities: {
      transfers: { requested: true },
      card_payments: { requested: true },
    },
    business_profile: {
      product_description: 'Peer-to-peer rental marketplace',
    },
    metadata: {
      platform: 'rent-it-forward',
    },
  });

  return account.id;
};

export const createAccountLink = async (accountId: string, refreshUrl: string, returnUrl: string) => {
  requireServerEnvironment();
  const stripeInstance = requireStripe();
  
  const link = await stripeInstance.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
    collection_options: {
      fields: 'currently_due',
      future_requirements: 'include',
    },
  });

  return link.url;
};

export const createPaymentIntent = async ({
  amount,
  currency = 'aud',
  applicationFeeAmount,
  connectedAccountId,
  customerId,
  metadata = {},
  description,
}: {
  amount: number;
  currency?: string;
  applicationFeeAmount: number;
  connectedAccountId: string;
  customerId?: string;
  metadata?: Record<string, string>;
  description?: string;
}) => {
  requireServerEnvironment();
  const stripeInstance = requireStripe();
  
  const intent = await stripeInstance.paymentIntents.create({
    amount,
    currency,
    application_fee_amount: applicationFeeAmount,
    customer: customerId,
    description,
    metadata: {
      platform: 'rent-it-forward',
      ...metadata,
    },
    transfer_data: {
      destination: connectedAccountId,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    client_secret: intent.client_secret,
    payment_intent_id: intent.id,
  };
};

// ==================== PRICING & FEES (Pure Functions) ====================

// These are pure functions that don't require Stripe and work everywhere

export const calculatePlatformFee = (amount: number, feePercentage: number = 5): number => {
  return Math.round(amount * (feePercentage / 100));
};

export const calculateTotalWithFees = (baseAmount: number, feePercentage: number = 5) => {
  const platformFee = calculatePlatformFee(baseAmount, feePercentage);
  return {
    base_amount: baseAmount,
    platform_fee: platformFee,
    total_amount: baseAmount + platformFee,
  };
};

export const formatAmountForStripe = (amount: number): number => {
  // Convert dollars to cents
  return Math.round(amount * 100);
};

export const formatAmountFromStripe = (amount: number): number => {
  // Convert cents to dollars
  return amount / 100;
};

// ==================== REACT NATIVE COMPATIBLE TYPES ====================

// These types can be used safely in React Native
export interface PaymentIntentResult {
  client_secret: string | null;
  payment_intent_id: string;
}

export interface PlatformFeeCalculation {
  base_amount: number;
  platform_fee: number;
  total_amount: number;
}

// ==================== ERROR TYPES ====================

export class StripeNotAvailableError extends Error {
  constructor(message: string = 'Stripe is not available in this environment') {
    super(message);
    this.name = 'StripeNotAvailableError';
  }
}

export class ServerEnvironmentRequiredError extends Error {
  constructor(message: string = 'This operation requires a server environment') {
    super(message);
    this.name = 'ServerEnvironmentRequiredError';
  }
}