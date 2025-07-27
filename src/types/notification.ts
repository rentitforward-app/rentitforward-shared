import { z } from 'zod';

// OneSignal notification types
export const NotificationTypeSchema = z.enum([
  'booking_request',
  'booking_confirmed', 
  'booking_cancelled',
  'booking_completed',
  'payment_received',
  'payment_failed',
  'message_received',
  'review_received',
  'review_request',
  'listing_approved',
  'listing_rejected',
  'system_announcement',
  'reminder',
]);

export type NotificationType = z.infer<typeof NotificationTypeSchema>;

// OneSignal push notification payload
export const PushNotificationSchema = z.object({
  // OneSignal required fields
  app_id: z.string(),
  headings: z.record(z.string(), z.string()),
  contents: z.record(z.string(), z.string()),
  
  // Targeting
  include_external_user_ids: z.array(z.string()).optional(),
  include_player_ids: z.array(z.string()).optional(),
  included_segments: z.array(z.string()).optional(),
  
  // Custom data
  data: z.record(z.string(), z.any()).optional(),
  
  // Notification behavior
  priority: z.number().optional(),
  ttl: z.number().optional(),
  
  // Rich content
  big_picture: z.string().url().optional(),
  large_icon: z.string().url().optional(),
  small_icon: z.string().optional(),
  
  // Web specific
  web_url: z.string().url().optional(),
  web_buttons: z.array(z.object({
    id: z.string(),
    text: z.string(),
    url: z.string().url().optional(),
  })).optional(),
  
  // Mobile specific
  ios_attachments: z.record(z.string(), z.string()).optional(),
  android_channel_id: z.string().optional(),
  
  // Scheduling
  send_after: z.string().optional(),
  delayed_option: z.enum(['timezone', 'last-active']).optional(),
});

export type PushNotification = z.infer<typeof PushNotificationSchema>;

// Application notification data structure
export const AppNotificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: NotificationTypeSchema,
  title: z.string(),
  message: z.string(),
  data: z.record(z.string(), z.any()).optional(),
  is_read: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
  action_url: z.string().optional(),
  
  // OneSignal tracking
  onesignal_id: z.string().optional(),
  sent_at: z.date().optional(),
  delivered_at: z.date().optional(),
  opened_at: z.date().optional(),
});

export type AppNotification = z.infer<typeof AppNotificationSchema>;

// Notification preferences
export const NotificationPreferencesSchema = z.object({
  user_id: z.string().uuid(),
  email_notifications: z.boolean().default(true),
  push_notifications: z.boolean().default(true),
  sms_notifications: z.boolean().default(false),
  
  // Granular preferences
  booking_notifications: z.boolean().default(true),
  message_notifications: z.boolean().default(true),
  payment_notifications: z.boolean().default(true),
  review_notifications: z.boolean().default(true),
  system_notifications: z.boolean().default(true),
  marketing_notifications: z.boolean().default(false),
  
  // Timing preferences
  quiet_hours_enabled: z.boolean().default(false),
  quiet_hours_start: z.string().optional(), // HH:MM format
  quiet_hours_end: z.string().optional(),   // HH:MM format
  timezone: z.string().default('UTC'),
  
  created_at: z.date(),
  updated_at: z.date(),
});

export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

// OneSignal subscription data
export const OneSignalSubscriptionSchema = z.object({
  user_id: z.string().uuid(),
  player_id: z.string(), // OneSignal player/subscription ID
  external_user_id: z.string(), // Our user ID
  platform: z.enum(['web', 'ios', 'android']),
  device_type: z.enum(['web_push', 'ios', 'android']),
  is_active: z.boolean().default(true),
  subscription_data: z.record(z.string(), z.any()).optional(),
  created_at: z.date(),
  updated_at: z.date(),
  last_active: z.date().optional(),
});

export type OneSignalSubscription = z.infer<typeof OneSignalSubscriptionSchema>;

// Notification template for different types
export interface NotificationTemplate {
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  action_url?: string;
  priority?: number;
  ttl?: number;
  big_picture?: string;
  web_url?: string;
  web_buttons?: Array<{
    id: string;
    text: string;
    url?: string;
  }>;
}

// Pre-defined notification templates
export const NOTIFICATION_TEMPLATES: Record<NotificationType, Omit<NotificationTemplate, 'type'>> = {
  booking_request: {
    title: 'New Booking Request',
    message: '{{renter_name}} wants to rent your "{{item_title}}" for {{duration}} days',
    action_url: '/dashboard/bookings',
    priority: 8,
    ttl: 86400, // 24 hours
  },
  booking_confirmed: {
    title: 'Booking Confirmed',
    message: 'Your booking for "{{item_title}}" has been confirmed!',
    action_url: '/bookings/{{booking_id}}',
    priority: 9,
  },
  booking_cancelled: {
    title: 'Booking Cancelled',
    message: 'Your booking for "{{item_title}}" has been cancelled',
    action_url: '/bookings/{{booking_id}}',
    priority: 7,
  },
  booking_completed: {
    title: 'Booking Completed',
    message: 'Your rental of "{{item_title}}" is complete. Please leave a review!',
    action_url: '/bookings/{{booking_id}}?action=review',
    priority: 6,
  },
  payment_received: {
    title: 'Payment Received',
    message: 'You received ${{amount}} for "{{item_title}}" rental',
    action_url: '/dashboard',
    priority: 8,
  },
  payment_failed: {
    title: 'Payment Failed',
    message: 'Payment for "{{item_title}}" rental could not be processed',
    action_url: '/bookings/{{booking_id}}',
    priority: 9,
  },
  message_received: {
    title: 'New Message',
    message: '{{sender_name}} sent you a message about "{{item_title}}"',
    action_url: '/messages',
    priority: 7,
    ttl: 172800, // 48 hours
  },
  review_received: {
    title: 'New Review',
    message: '{{reviewer_name}} left you a {{rating}}-star review',
    action_url: '/dashboard/reviews',
    priority: 6,
  },
  review_request: {
    title: 'Review Request',
    message: 'How was your experience with "{{item_title}}"? Leave a review!',
    action_url: '/bookings/{{booking_id}}?action=review',
    priority: 5,
    ttl: 604800, // 7 days
  },
  listing_approved: {
    title: 'Listing Approved',
    message: 'Your listing "{{item_title}}" has been approved and is now live!',
    action_url: '/listings/{{listing_id}}',
    priority: 7,
  },
  listing_rejected: {
    title: 'Listing Rejected',
    message: 'Your listing "{{item_title}}" needs updates before it can be published',
    action_url: '/listings/{{listing_id}}/edit',
    priority: 8,
  },
  system_announcement: {
    title: 'System Update',
    message: '{{announcement_text}}',
    priority: 5,
  },
  reminder: {
    title: 'Reminder',
    message: '{{reminder_text}}',
    priority: 4,
    ttl: 86400, // 24 hours
  },
};

// Utility type for notification context data
export type NotificationContext = {
  booking_request: {
    renter_name: string;
    item_title: string;
    duration: number;
    booking_id: string;
  };
  booking_confirmed: {
    item_title: string;
    booking_id: string;
    start_date: string;
  };
  booking_cancelled: {
    item_title: string;
    booking_id: string;
    reason?: string;
  };
  booking_completed: {
    item_title: string;
    booking_id: string;
  };
  payment_received: {
    amount: number;
    item_title: string;
    booking_id: string;
  };
  payment_failed: {
    item_title: string;
    booking_id: string;
    error_message?: string;
  };
  message_received: {
    sender_name: string;
    item_title: string;
    message_id: string;
  };
  review_received: {
    reviewer_name: string;
    rating: number;
    review_id: string;
  };
  review_request: {
    item_title: string;
    booking_id: string;
  };
  listing_approved: {
    item_title: string;
    listing_id: string;
  };
  listing_rejected: {
    item_title: string;
    listing_id: string;
    reason?: string;
  };
  system_announcement: {
    announcement_text: string;
  };
  reminder: {
    reminder_text: string;
  };
}; 