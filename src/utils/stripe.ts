// src/utils/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// ==================== CONNECT ACCOUNTS ====================

export const createConnectedAccount = async (email: string, country: string = 'AU') => {
  const account = await stripe.accounts.create({
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
  const link = await stripe.accountLinks.create({
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

export const getAccountStatus = async (accountId: string) => {
  const account = await stripe.accounts.retrieve(accountId);
  
  return {
    id: account.id,
    charges_enabled: account.charges_enabled,
    payouts_enabled: account.payouts_enabled,
    details_submitted: account.details_submitted,
    currently_due: account.requirements?.currently_due || [],
    eventually_due: account.requirements?.eventually_due || [],
    past_due: account.requirements?.past_due || [],
    pending_verification: account.requirements?.pending_verification || [],
    disabled_reason: account.requirements?.disabled_reason,
    verification_status: {
      identity: account.individual?.verification?.status || 'unverified',
      document: account.individual?.verification?.document?.back 
        ? 'verified' 
        : account.individual?.verification?.document?.front 
          ? 'pending' 
          : 'unverified',
    },
    business_type: account.business_type,
    country: account.country,
  };
};

export const createLoginLink = async (accountId: string) => {
  const loginLink = await stripe.accounts.createLoginLink(accountId);
  return loginLink.url;
};

// ==================== CUSTOMERS ====================

export const createCustomer = async ({
  email,
  name,
  phone,
  metadata = {},
}: {
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, string>;
}) => {
  const customer = await stripe.customers.create({
    email,
    name,
    phone,
    metadata: {
      platform: 'rent-it-forward',
      ...metadata,
    },
  });

  return customer.id;
};

export const getCustomer = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

export const updateCustomer = async (customerId: string, updates: Stripe.CustomerUpdateParams) => {
  const customer = await stripe.customers.update(customerId, updates);
  return customer;
};

// ==================== PAYMENT INTENTS ====================

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
  const intent = await stripe.paymentIntents.create({
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

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  const intent = await stripe.paymentIntents.confirm(paymentIntentId);
  return intent;
};

export const getPaymentIntent = async (paymentIntentId: string) => {
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return intent;
};

// ==================== ESCROW & DEPOSITS ====================

export const createEscrowPayment = async ({
  amount,
  depositAmount,
  currency = 'aud',
  applicationFeeAmount,
  connectedAccountId,
  customerId,
  bookingId,
  listingTitle,
}: {
  amount: number;
  depositAmount: number;
  currency?: string;
  applicationFeeAmount: number;
  connectedAccountId: string;
  customerId: string;
  bookingId: string;
  listingTitle: string;
}) => {
  const totalAmount = amount + depositAmount;
  
  const intent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency,
    application_fee_amount: applicationFeeAmount,
    customer: customerId,
    description: `Rental payment for "${listingTitle}" (including $${(depositAmount / 100).toFixed(2)} security deposit)`,
    metadata: {
      platform: 'rent-it-forward',
      booking_id: bookingId,
      rental_amount: amount.toString(),
      deposit_amount: depositAmount.toString(),
      listing_title: listingTitle,
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

export const releaseEscrowPayment = async (paymentIntentId: string, amountToRelease: number) => {
  // This would be handled through transfers or by updating the payment intent
  // For now, we'll create a transfer for the rental amount (excluding deposit)
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (intent.transfer_data?.destination) {
    const transfer = await stripe.transfers.create({
      amount: amountToRelease,
      currency: intent.currency,
      destination: typeof intent.transfer_data.destination === 'string' 
        ? intent.transfer_data.destination 
        : intent.transfer_data.destination.id,
      description: `Rental payment release for ${intent.description}`,
      metadata: {
        original_payment_intent: paymentIntentId,
        type: 'rental_payment_release',
      },
    });
    
    return transfer.id;
  }
  
  throw new Error('No destination account found for escrow release');
};

export const refundDeposit = async (paymentIntentId: string, depositAmount: number, reason?: string) => {
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: depositAmount,
    reason: reason as Stripe.RefundCreateParams.Reason,
    metadata: {
      type: 'deposit_refund',
      platform: 'rent-it-forward',
    },
  });

  return refund.id;
};

// ==================== IDENTITY VERIFICATION ====================

export const uploadVerificationDocument = async (
  accountId: string,
  documentType: 'identity_document' | 'address_document',
  frontImageData: string,
  backImageData?: string
) => {
  try {
    // Create file for front of document
    const frontFile = await stripe.files.create({
      purpose: 'identity_document',
      file: {
        data: Buffer.from(frontImageData, 'base64'),
        name: `${documentType}_front.jpg`,
        type: 'image/jpeg',
      },
    });

    let backFile;
    if (backImageData) {
      backFile = await stripe.files.create({
        purpose: 'identity_document',
        file: {
          data: Buffer.from(backImageData, 'base64'),
          name: `${documentType}_back.jpg`,
          type: 'image/jpeg',
        },
      });
    }

    // Update the account with the document
    if (documentType === 'identity_document') {
      await stripe.accounts.update(accountId, {
        individual: {
          verification: {
            document: {
              front: frontFile.id,
              back: backFile?.id,
            },
          },
        },
      });
    } else if (documentType === 'address_document') {
      await stripe.accounts.update(accountId, {
        individual: {
          verification: {
            additional_document: {
              front: frontFile.id,
              back: backFile?.id,
            },
          },
        },
      });
    }

    return {
      front_file_id: frontFile.id,
      back_file_id: backFile?.id,
    };
  } catch (error) {
    console.error('Error uploading verification document:', error);
    throw error;
  }
};

export const getVerificationStatus = async (accountId: string) => {
  const account = await stripe.accounts.retrieve(accountId);
  
  return {
    overall_status: account.details_submitted && account.charges_enabled && account.payouts_enabled 
      ? 'verified' 
      : account.details_submitted 
        ? 'pending' 
        : 'unverified',
    identity_verification: {
      status: account.individual?.verification?.status || 'unverified',
      details: account.individual?.verification?.details || null,
    },
    document_verification: {
      front_uploaded: !!account.individual?.verification?.document?.front,
      back_uploaded: !!account.individual?.verification?.document?.back,
      status: account.individual?.verification?.document?.details_code || 'not_uploaded',
    },
    requirements: {
      currently_due: account.requirements?.currently_due || [],
      eventually_due: account.requirements?.eventually_due || [],
      past_due: account.requirements?.past_due || [],
      pending_verification: account.requirements?.pending_verification || [],
    },
    capabilities: {
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
    },
    disabled_reason: account.requirements?.disabled_reason,
  };
};

// ==================== WEBHOOKS ====================

export const constructWebhookEvent = (payload: string | Buffer, signature: string) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Stripe webhook secret not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
};

// ==================== PRICING & FEES ====================

export const calculatePlatformFee = (amount: number, feePercentage: number = 5) => {
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

// ==================== UTILITY FUNCTIONS ====================

export const formatAmountForStripe = (amount: number) => {
  // Convert dollars to cents
  return Math.round(amount * 100);
};

export const formatAmountFromStripe = (amount: number) => {
  // Convert cents to dollars
  return amount / 100;
};

export const isTestMode = () => {
  return process.env.STRIPE_SECRET_KEY?.includes('sk_test_') || false;
};

// Export the stripe instance for direct access when needed
export { stripe };
