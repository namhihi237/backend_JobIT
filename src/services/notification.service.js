import { Notification } from '../models';

export default class NotificationService {
	async getNotifications(userId) {
		return Notification.find({ userId });
	}

	async createNotification(userId, notification) {
		return Notification.create({ userId, ...notification });
	}
}
