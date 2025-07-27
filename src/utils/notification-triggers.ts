import { 
  NotificationType, 
  NotificationContext,
  createNotification,
  createPushNotification,
  shouldSendNotification 
} from './notifications';

// Environment variable helper for OneSignal
const getOneSignalAppId = (): string => {
  return process.env.ONESIGNAL_APP_ID || process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '';
};

/**
 * Booking-related notification triggers
 */
export class BookingNotificationTriggers {
  /**
   * Send notification when a new booking request is made
   */
  static async sendBookingRequest(data: {
    listing_owner_id: string;
    renter_name: string;
    item_title: string;
    duration: number;
    booking_id: string;
    start_date: string;
    end_date: string;
    price_total: number;
  }): Promise<void> {
    const context: NotificationContext['booking_request'] = {
      renter_name: data.renter_name,
      item_title: data.item_title,
      duration: data.duration,
      booking_id: data.booking_id,
    };

    const notification = createNotification('booking_request', context, data.listing_owner_id);
    
    // Send via API (this would be called from your booking creation logic)
    await sendNotificationViaAPI(data.listing_owner_id, 'booking_request', context, 'high');
  }

  /**
   * Send notification when a booking is confirmed
   */
  static async sendBookingConfirmed(data: {
    renter_id: string;
    item_title: string;
    booking_id: string;
    start_date: string;
    owner_name: string;
  }): Promise<void> {
    const context: NotificationContext['booking_confirmed'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
      start_date: data.start_date,
    };

    await sendNotificationViaAPI(data.renter_id, 'booking_confirmed', context, 'normal');
  }

  /**
   * Send notification when a booking is cancelled
   */
  static async sendBookingCancelled(data: {
    affected_user_id: string;
    item_title: string;
    booking_id: string;
    reason?: string;
  }): Promise<void> {
    const context: NotificationContext['booking_cancelled'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
      reason: data.reason,
    };

    await sendNotificationViaAPI(data.affected_user_id, 'booking_cancelled', context, 'normal');
  }

  /**
   * Send notification when a booking is completed
   */
  static async sendBookingCompleted(data: {
    renter_id: string;
    item_title: string;
    booking_id: string;
  }): Promise<void> {
    const context: NotificationContext['booking_completed'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
    };

    await sendNotificationViaAPI(data.renter_id, 'booking_completed', context, 'low');
  }
}

/**
 * Payment-related notification triggers
 */
export class PaymentNotificationTriggers {
  /**
   * Send notification when payment is received
   */
  static async sendPaymentReceived(data: {
    owner_id: string;
    amount: number;
    item_title: string;
    booking_id: string;
    renter_name: string;
  }): Promise<void> {
    const context: NotificationContext['payment_received'] = {
      amount: data.amount,
      item_title: data.item_title,
      booking_id: data.booking_id,
    };

    await sendNotificationViaAPI(data.owner_id, 'payment_received', context, 'normal');
  }

  /**
   * Send notification when payment fails
   */
  static async sendPaymentFailed(data: {
    renter_id: string;
    item_title: string;
    booking_id: string;
    error_message?: string;
  }): Promise<void> {
    const context: NotificationContext['payment_failed'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
      error_message: data.error_message,
    };

    await sendNotificationViaAPI(data.renter_id, 'payment_failed', context, 'high');
  }
}

/**
 * Message-related notification triggers
 */
export class MessageNotificationTriggers {
  /**
   * Send notification when a new message is received
   */
  static async sendMessageReceived(data: {
    recipient_id: string;
    sender_name: string;
    item_title: string;
    message_id: string;
    message_preview?: string;
  }): Promise<void> {
    const context: NotificationContext['message_received'] = {
      sender_name: data.sender_name,
      item_title: data.item_title,
      message_id: data.message_id,
    };

    await sendNotificationViaAPI(data.recipient_id, 'message_received', context, 'normal');
  }
}

/**
 * Review-related notification triggers
 */
export class ReviewNotificationTriggers {
  /**
   * Send notification when a review is received
   */
  static async sendReviewReceived(data: {
    reviewee_id: string;
    reviewer_name: string;
    rating: number;
    review_id: string;
    item_title?: string;
  }): Promise<void> {
    const context: NotificationContext['review_received'] = {
      reviewer_name: data.reviewer_name,
      rating: data.rating,
      review_id: data.review_id,
    };

    await sendNotificationViaAPI(data.reviewee_id, 'review_received', context, 'low');
  }

  /**
   * Send notification requesting a review
   */
  static async sendReviewRequest(data: {
    user_id: string;
    item_title: string;
    booking_id: string;
    days_after_completion?: number;
  }): Promise<void> {
    const context: NotificationContext['review_request'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
    };

    // For review requests, we might want to delay the notification
    const urgency = data.days_after_completion && data.days_after_completion > 1 ? 'low' : 'normal';
    
    await sendNotificationViaAPI(data.user_id, 'review_request', context, urgency);
  }
}

/**
 * Listing-related notification triggers
 */
export class ListingNotificationTriggers {
  /**
   * Send notification when a listing is approved
   */
  static async sendListingApproved(data: {
    owner_id: string;
    item_title: string;
    listing_id: string;
  }): Promise<void> {
    const context: NotificationContext['listing_approved'] = {
      item_title: data.item_title,
      listing_id: data.listing_id,
    };

    await sendNotificationViaAPI(data.owner_id, 'listing_approved', context, 'normal');
  }

  /**
   * Send notification when a listing is rejected
   */
  static async sendListingRejected(data: {
    owner_id: string;
    item_title: string;
    listing_id: string;
    reason?: string;
  }): Promise<void> {
    const context: NotificationContext['listing_rejected'] = {
      item_title: data.item_title,
      listing_id: data.listing_id,
      reason: data.reason,
    };

    await sendNotificationViaAPI(data.owner_id, 'listing_rejected', context, 'normal');
  }
}

/**
 * System notification triggers
 */
export class SystemNotificationTriggers {
  /**
   * Send system announcement to all users or specific segments
   */
  static async sendSystemAnnouncement(data: {
    announcement_text: string;
    target_users?: string[]; // If not provided, sends to all users
    urgency?: 'immediate' | 'normal' | 'low';
  }): Promise<void> {
    const context: NotificationContext['system_announcement'] = {
      announcement_text: data.announcement_text,
    };

    if (data.target_users) {
      // Send to specific users
      await Promise.all(
        data.target_users.map(userId => 
          sendNotificationViaAPI(userId, 'system_announcement', context, data.urgency || 'normal')
        )
      );
    } else {
      // Send to all users via segments
      await sendNotificationToSegment('system_announcement', context, 'All Users', data.urgency || 'normal');
    }
  }

  /**
   * Send a reminder notification
   */
  static async sendReminder(data: {
    user_id: string;
    reminder_text: string;
    urgency?: 'immediate' | 'normal' | 'low';
  }): Promise<void> {
    const context: NotificationContext['reminder'] = {
      reminder_text: data.reminder_text,
    };

    await sendNotificationViaAPI(data.user_id, 'reminder', context, data.urgency || 'normal');
  }
}

/**
 * Utility function to send notification via API
 */
async function sendNotificationViaAPI(
  user_id: string,
  type: NotificationType,
  context: any,
  urgency: 'immediate' | 'normal' | 'low' = 'normal'
): Promise<void> {
  try {
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || '',
      },
      body: JSON.stringify({
        user_id,
        type,
        context,
        urgency,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to send notification:', error);
      throw new Error(`Notification API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Notification sent successfully:', result.notification_id);
  } catch (error) {
    console.error('Error sending notification:', error);
    // In production, you might want to queue this for retry
    throw error;
  }
}

/**
 * Utility function to send notification to a segment
 */
async function sendNotificationToSegment(
  type: NotificationType,
  context: any,
  segment: string,
  urgency: 'immediate' | 'normal' | 'low' = 'normal'
): Promise<void> {
  const appId = getOneSignalAppId();
  if (!appId) {
    throw new Error('OneSignal App ID not configured');
  }

  const notification = createNotification(type, context, 'segment-notification');
  
  const pushNotification = createPushNotification(appId, {
    ...notification,
    id: `segment-${Date.now()}`,
  }, {
    segments: [segment],
    priority: urgency === 'immediate' ? 10 : urgency === 'normal' ? 7 : 5,
  });

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify(pushNotification),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OneSignal API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Segment notification sent successfully:', result.id);
  } catch (error) {
    console.error('Error sending segment notification:', error);
    throw error;
  }
}

/**
 * Batch notification sending for multiple users
 */
export async function sendBatchNotifications(notifications: Array<{
  user_id: string;
  type: NotificationType;
  context: any;
  urgency?: 'immediate' | 'normal' | 'low';
}>): Promise<void> {
  const BATCH_SIZE = 100; // OneSignal has rate limits
  
  for (let i = 0; i < notifications.length; i += BATCH_SIZE) {
    const batch = notifications.slice(i, i + BATCH_SIZE);
    
    await Promise.all(
      batch.map(notification => 
        sendNotificationViaAPI(
          notification.user_id, 
          notification.type, 
          notification.context, 
          notification.urgency
        ).catch(error => {
          console.error(`Failed to send notification to ${notification.user_id}:`, error);
          // Continue with other notifications even if one fails
        })
      )
    );
    
    // Add delay between batches to respect rate limits
    if (i + BATCH_SIZE < notifications.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

/**
 * Scheduled notification helpers
 */
export class ScheduledNotifications {
  /**
   * Schedule a booking reminder (e.g., 24 hours before start date)
   */
  static async scheduleBookingReminder(data: {
    user_id: string;
    booking_id: string;
    item_title: string;
    start_date: Date;
    hours_before: number;
  }): Promise<void> {
    const reminderTime = new Date(data.start_date);
    reminderTime.setHours(reminderTime.getHours() - data.hours_before);
    
    const context: NotificationContext['reminder'] = {
      reminder_text: `Your rental of "${data.item_title}" starts in ${data.hours_before} hours. Make sure you're ready!`,
    };

    // In a real implementation, you'd use a job queue like Bull or cron jobs
    // For now, we'll use OneSignal's send_after feature
    const appId = getOneSignalAppId();
    if (!appId) return;

    const notification = createNotification('reminder', context, data.user_id);
    
    const pushNotification = createPushNotification(appId, {
      ...notification,
      id: `reminder-${data.booking_id}-${data.hours_before}h`,
    }, {
      external_user_ids: [data.user_id],
      send_after: reminderTime.toISOString(),
      priority: 6,
    });

    // Send to OneSignal with scheduled delivery
    try {
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify(pushNotification),
      });

      if (!response.ok) {
        throw new Error(`OneSignal API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Scheduled notification created:', result.id);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  /**
   * Schedule a review request (e.g., 3 days after booking completion)
   */
  static async scheduleReviewRequest(data: {
    user_id: string;
    booking_id: string;
    item_title: string;
    completion_date: Date;
    days_after: number;
  }): Promise<void> {
    const reminderTime = new Date(data.completion_date);
    reminderTime.setDate(reminderTime.getDate() + data.days_after);
    
    const context: NotificationContext['review_request'] = {
      item_title: data.item_title,
      booking_id: data.booking_id,
    };

    const appId = getOneSignalAppId();
    if (!appId) return;

    const notification = createNotification('review_request', context, data.user_id);
    
    const pushNotification = createPushNotification(appId, {
      ...notification,
      id: `review-request-${data.booking_id}`,
    }, {
      external_user_ids: [data.user_id],
      send_after: reminderTime.toISOString(),
      priority: 5,
      ttl: 604800, // 7 days
    });

    try {
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify(pushNotification),
      });

      if (!response.ok) {
        throw new Error(`OneSignal API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Scheduled review request created:', result.id);
    } catch (error) {
      console.error('Error scheduling review request:', error);
    }
  }
} 