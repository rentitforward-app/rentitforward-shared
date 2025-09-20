import { z } from 'zod';

// FCM notification types
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

// FCM push notification payload
export const PushNotificationSchema = z.object({
  // FCM required fields
  to: z.string().optional(), // FCM token
  registration_ids: z.array(z.string()).optional(), // Multiple FCM tokens
  condition: z.string().optional(), // Topic condition
  
  // Notification payload
  notification: z.object({
    title: z.string(),
    body: z.string(),
    image: z.string().url().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    sound: z.string().optional(),
    tag: z.string().optional(),
    click_action: z.string().optional(),
    body_loc_key: z.string().optional(),
    body_loc_args: z.array(z.string()).optional(),
    title_loc_key: z.string().optional(),
    title_loc_args: z.array(z.string()).optional(),
  }).optional(),
  
  // Data payload
  data: z.record(z.string(), z.string()).optional(),
  
  // Android specific
  android: z.object({
    collapse_key: z.string().optional(),
    priority: z.enum(['normal', 'high']).optional(),
    ttl: z.string().optional(),
    restricted_package_name: z.string().optional(),
    data: z.record(z.string(), z.string()).optional(),
    notification: z.object({
      title: z.string().optional(),
      body: z.string().optional(),
      icon: z.string().optional(),
      color: z.string().optional(),
      sound: z.string().optional(),
      tag: z.string().optional(),
      click_action: z.string().optional(),
      body_loc_key: z.string().optional(),
      body_loc_args: z.array(z.string()).optional(),
      title_loc_key: z.string().optional(),
      title_loc_args: z.array(z.string()).optional(),
      channel_id: z.string().optional(),
      ticker: z.string().optional(),
      sticky: z.boolean().optional(),
      event_time: z.string().optional(),
      local_only: z.boolean().optional(),
      notification_priority: z.enum(['PRIORITY_MIN', 'PRIORITY_LOW', 'PRIORITY_DEFAULT', 'PRIORITY_HIGH', 'PRIORITY_MAX']).optional(),
      default_sound: z.boolean().optional(),
      default_vibrate_timings: z.boolean().optional(),
      default_light_settings: z.boolean().optional(),
      vibrate_timings: z.array(z.string()).optional(),
      visibility: z.enum(['PRIVATE', 'PUBLIC', 'SECRET']).optional(),
      notification_count: z.number().optional(),
    }).optional(),
  }).optional(),
  
  // iOS specific (APNS)
  apns: z.object({
    headers: z.record(z.string(), z.string()).optional(),
    payload: z.object({
      aps: z.object({
        alert: z.union([
          z.string(),
          z.object({
            title: z.string().optional(),
            subtitle: z.string().optional(),
            body: z.string().optional(),
            'launch-image': z.string().optional(),
            'title-loc-key': z.string().optional(),
            'title-loc-args': z.array(z.string()).optional(),
            'subtitle-loc-key': z.string().optional(),
            'subtitle-loc-args': z.array(z.string()).optional(),
            'loc-key': z.string().optional(),
            'loc-args': z.array(z.string()).optional(),
          }),
        ]).optional(),
        badge: z.number().optional(),
        sound: z.union([z.string(), z.object({
          critical: z.boolean().optional(),
          name: z.string().optional(),
          volume: z.number().optional(),
        })]).optional(),
        'thread-id': z.string().optional(),
        category: z.string().optional(),
        'content-available': z.number().optional(),
        'mutable-content': z.number().optional(),
      }),
    }).optional(),
  }).optional(),
  
  // Web specific (WebPush)
  webpush: z.object({
    headers: z.record(z.string(), z.string()).optional(),
    data: z.record(z.string(), z.any()).optional(),
    notification: z.object({
      title: z.string().optional(),
      body: z.string().optional(),
      icon: z.string().optional(),
      image: z.string().optional(),
      badge: z.string().optional(),
      tag: z.string().optional(),
      color: z.string().optional(),
      click_action: z.string().optional(),
      actions: z.array(z.object({
        action: z.string(),
        title: z.string(),
        icon: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
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
  
  // FCM tracking
  fcm_message_id: z.string().optional(),
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

// FCM subscription data
export const FCMSubscriptionSchema = z.object({
  user_id: z.string().uuid(),
  fcm_token: z.string(), // FCM registration token
  platform: z.enum(['web', 'ios', 'android']),
  device_type: z.enum(['web_push', 'ios', 'android']),
  device_id: z.string().optional(),
  app_version: z.string().optional(),
  is_active: z.boolean().default(true),
  subscription_data: z.record(z.string(), z.any()).optional(),
  created_at: z.date(),
  updated_at: z.date(),
  last_active: z.date().optional(),
});

export type FCMSubscription = z.infer<typeof FCMSubscriptionSchema>;

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