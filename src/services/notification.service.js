import { Notification, Account, Company, ITer } from '../models';

export default class NotificationService {
	async getNotifications(userId, page, take) {
		let notifications = [];
		page = isNaN(page) ? 1 : page - 0;
		take = isNaN(take) ? 10 : take - 0;
		let count;
		let numPages;
		count = await Notification.countDocuments({ userId });
		numPages = Math.ceil(count / take);
		if (page > numPages || page <= 0)
			return {
				currentPage: page,
				numPages,
				notifications,
			};

		const skip = (page - 1) * take;
		notifications = await Notification.find({ userId }, { __v: 0, updatedAt: 0 })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(take)
			.exec();

		return {
			currentPage: page,
			numPages,
			notifications,
		};
	}

	async createNotification(userId, notification) {
		return Notification.create({ userId, ...notification });
	}

	async createManyNotifications(notifications) {
		return Notification.create(notifications);
	}

	async getNumberOfNotifications(userId) {
		const account = await Account.findById(userId);
		if (!account) return 0;
		if (account.role == 'iter') {
			const iter = await Iter.findOne({ accountId: userId });
			return iter.numberOfNotifications;
		}
		if (account.role == 'company') {
			const company = await Company.findOne({ accountId: userId });
			return company.numberOfNotifications;
		}
	}

	async reset(userId) {
		const account = await Account.findById(userId);
		if (!account) return 0;
		if (account.role == 'iter') {
			await Iter.findOneAndUpdate({ accountId: userId }, { numberOfNotifications: 0 });
			return;
		}
		if (account.role == 'company') {
			await Company.findOneAndUpdate({ accountId: userId }, { numberOfNotifications: 0 });
			return;
		}
	}
}
