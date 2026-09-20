import { mockStore } from '../../utils/mockStore';

export class NotificationsService {
  public async getNotifications() {
    return mockStore.notifications;
  }

  public async markAsRead(id: string) {
    const notif = mockStore.notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    return { success: true, notification: notif };
  }
}

export const notificationsService = new NotificationsService();
