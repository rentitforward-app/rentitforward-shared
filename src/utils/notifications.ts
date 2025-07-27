import { 
  NotificationType, 
  NotificationTemplate, 
  NotificationContext, 
  NOTIFICATION_TEMPLATES,
  PushNotification,
  AppNotification
} from '../types/notification';

/**
 * Template replacement utility
 * Replaces {{variable}} placeholders in notification templates with actual values
 */
export function replaceTemplate(
  template: string, 
  context: Record<string, any>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = context[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Creates a notification payload for a specific type with context
 */
export function createNotification<T extends NotificationType>(
  type: T,
  context: NotificationContext[T],
  userId: string,
  overrides?: Partial<NotificationTemplate>
): Omit<AppNotification, 'id' | 'created_at' | 'updated_at'> {
  const template = NOTIFICATION_TEMPLATES[type];
  const title = replaceTemplate(template.title, context);
  const message = replaceTemplate(template.message, context);
  const action_url = template.action_url 
    ? replaceTemplate(template.action_url, context) 
    : undefined;

  return {
    user_id: userId,
    type,
    title: overrides?.title || title,
    message: overrides?.message || message,
    data: { ...context, ...overrides?.data },
    is_read: false,
    action_url: overrides?.action_url || action_url,
  };
}

/**
 * Creates a OneSignal push notification payload
 */
export function createPushNotification(
  appId: string,
  notification: Partial<AppNotification> & { 
    title: string; 
    message: string; 
    user_id: string;
  },
  options?: {
    external_user_ids?: string[];
    player_ids?: string[];
    segments?: string[];
    big_picture?: string;
    web_url?: string;
    web_buttons?: Array<{
      id: string;
      text: string;
      url?: string;
    }>;
    priority?: number;
    ttl?: number;
    send_after?: string;
    delayed_option?: 'timezone' | 'last-active';
  }
): PushNotification {
  const template = notification.type 
    ? NOTIFICATION_TEMPLATES[notification.type] 
    : null;

  return {
    app_id: appId,
    headings: { en: notification.title },
    contents: { en: notification.message },
    
    // Targeting - prefer external_user_ids for user targeting
    include_external_user_ids: options?.external_user_ids || [notification.user_id],
    include_player_ids: options?.player_ids,
    included_segments: options?.segments,
    
    // Custom data for deep linking and analytics
    data: {
      type: notification.type,
      action_url: notification.action_url,
      notification_id: notification.id,
      ...notification.data,
    },
    
    // Behavior settings
    priority: options?.priority || template?.priority || 7,
    ttl: options?.ttl || template?.ttl || 86400, // 24 hours default
    
    // Rich content
    big_picture: options?.big_picture || template?.big_picture,
    large_icon: options?.big_picture, // Use same image for large icon
    
    // Web specific
    web_url: options?.web_url || getWebUrl(notification.action_url),
    web_buttons: options?.web_buttons || template?.web_buttons,
    
    // iOS specific - for rich notifications
    ios_attachments: options?.big_picture ? {
      image: options.big_picture,
    } : undefined,
    
    // Android specific
    android_channel_id: getAndroidChannelId(notification.type),
    
    // Scheduling
    send_after: options?.send_after,
  };
}

/**
 * Converts relative URLs to absolute web URLs
 */
function getWebUrl(actionUrl?: string): string | undefined {
  if (!actionUrl) return undefined;
  
  // If it's already an absolute URL, return as is
  if (actionUrl.startsWith('http')) {
    return actionUrl;
  }
  
  // Convert relative URL to absolute
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.rentitforward.com';
  return `${baseUrl}${actionUrl.startsWith('/') ? '' : '/'}${actionUrl}`;
}

/**
 * Gets appropriate Android notification channel based on notification type
 */
function getAndroidChannelId(type?: NotificationType): string {
  if (!type) return 'default';
  
  switch (type) {
    case 'booking_request':
    case 'booking_confirmed':
    case 'booking_cancelled':
    case 'booking_completed':
      return 'bookings';
    
    case 'payment_received':
    case 'payment_failed':
      return 'payments';
    
    case 'message_received':
      return 'messages';
    
    case 'review_received':
    case 'review_request':
      return 'reviews';
    
    case 'listing_approved':
    case 'listing_rejected':
      return 'listings';
    
    case 'system_announcement':
    case 'reminder':
      return 'system';
    
    default:
      return 'default';
  }
}

/**
 * Validates notification preferences for a user
 */
export function shouldSendNotification(
  notificationType: NotificationType,
  preferences: {
    push_notifications: boolean;
    booking_notifications?: boolean;
    message_notifications?: boolean;
    payment_notifications?: boolean;
    review_notifications?: boolean;
    system_notifications?: boolean;
    marketing_notifications?: boolean;
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
    timezone?: string;
  }
): boolean {
  // Check if push notifications are enabled globally
  if (!preferences.push_notifications) {
    return false;
  }
  
  // Check category-specific preferences
  switch (notificationType) {
    case 'booking_request':
    case 'booking_confirmed':
    case 'booking_cancelled':
    case 'booking_completed':
      return preferences.booking_notifications !== false;
    
    case 'message_received':
      return preferences.message_notifications !== false;
    
    case 'payment_received':
    case 'payment_failed':
      return preferences.payment_notifications !== false;
    
    case 'review_received':
    case 'review_request':
      return preferences.review_notifications !== false;
    
    case 'system_announcement':
    case 'reminder':
      return preferences.system_notifications !== false;
    
    case 'listing_approved':
    case 'listing_rejected':
      return preferences.system_notifications !== false;
    
    default:
      return true;
  }
}

/**
 * Checks if current time is within user's quiet hours
 */
export function isWithinQuietHours(
  preferences: {
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
    timezone?: string;
  }
): boolean {
  if (!preferences.quiet_hours_enabled || 
      !preferences.quiet_hours_start || 
      !preferences.quiet_hours_end) {
    return false;
  }
  
  try {
    const now = new Date();
    const timezone = preferences.timezone || 'UTC';
    
    // Convert current time to user's timezone
    const userTime = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
    
    const [currentHour, currentMinute] = userTime.split(':').map(Number);
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    
    // Parse quiet hours
    const [startHour, startMinute] = preferences.quiet_hours_start.split(':').map(Number);
    const [endHour, endMinute] = preferences.quiet_hours_end.split(':').map(Number);
    
    const startTimeMinutes = startHour * 60 + startMinute;
    const endTimeMinutes = endHour * 60 + endMinute;
    
    // Handle overnight quiet hours (e.g., 22:00 to 08:00)
    if (startTimeMinutes > endTimeMinutes) {
      return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
    } else {
      return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
    }
  } catch (error) {
    console.error('Error checking quiet hours:', error);
    return false;
  }
}

/**
 * Calculates optimal send time based on user preferences
 */
export function getOptimalSendTime(
  preferences: {
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
    timezone?: string;
  },
  urgency: 'immediate' | 'normal' | 'low' = 'normal'
): string | undefined {
  // For immediate notifications, send right away regardless of quiet hours
  if (urgency === 'immediate') {
    return undefined;
  }
  
  // If not in quiet hours, send immediately
  if (!isWithinQuietHours(preferences)) {
    return undefined;
  }
  
  // If in quiet hours, schedule for end of quiet hours
  if (preferences.quiet_hours_end && preferences.timezone) {
    try {
      const now = new Date();
      const [endHour, endMinute] = preferences.quiet_hours_end.split(':').map(Number);
      
      // Create date for end of quiet hours
      const endTime = new Date(now);
      endTime.setHours(endHour, endMinute, 0, 0);
      
      // If end time is in the past (tomorrow's quiet hours), add a day
      if (endTime <= now) {
        endTime.setDate(endTime.getDate() + 1);
      }
      
      // Return ISO string for OneSignal send_after parameter
      return endTime.toISOString();
    } catch (error) {
      console.error('Error calculating optimal send time:', error);
      return undefined;
    }
  }
  
  return undefined;
}

/**
 * Notification priority mapping
 */
export const NOTIFICATION_PRIORITIES = {
  immediate: 10,
  high: 9,
  normal: 7,
  low: 5,
  marketing: 3,
} as const;

/**
 * Gets notification priority based on type and context
 */
export function getNotificationPriority(
  type: NotificationType,
  context?: { isUrgent?: boolean; amount?: number }
): number {
  if (context?.isUrgent) {
    return NOTIFICATION_PRIORITIES.immediate;
  }
  
  switch (type) {
    case 'payment_failed':
    case 'booking_request':
      return NOTIFICATION_PRIORITIES.high;
    
    case 'booking_confirmed':
    case 'payment_received':
    case 'message_received':
      return NOTIFICATION_PRIORITIES.normal;
    
    case 'review_request':
    case 'listing_approved':
    case 'reminder':
      return NOTIFICATION_PRIORITIES.low;
    
    case 'system_announcement':
      return NOTIFICATION_PRIORITIES.marketing;
    
    default:
      return NOTIFICATION_PRIORITIES.normal;
  }
}

/**
 * Creates a delayed notification for optimal delivery
 */
export function createDelayedNotification(
  appId: string,
  notification: Partial<AppNotification> & { 
    title: string; 
    message: string; 
    user_id: string;
  },
  preferences: {
    quiet_hours_enabled?: boolean;
    quiet_hours_start?: string;
    quiet_hours_end?: string;
    timezone?: string;
  },
  urgency: 'immediate' | 'normal' | 'low' = 'normal',
  options?: Parameters<typeof createPushNotification>[2]
): PushNotification {
  const sendAfter = getOptimalSendTime(preferences, urgency);
  const priority = getNotificationPriority(
    notification.type!, 
    { isUrgent: urgency === 'immediate' }
  );
  
  return createPushNotification(appId, notification, {
    ...options,
    priority,
    send_after: sendAfter,
    // Use timezone-based delivery for non-immediate notifications
    delayed_option: urgency !== 'immediate' ? 'timezone' : undefined,
  });
} 