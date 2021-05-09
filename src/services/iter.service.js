import { ITer, Account, UserPer, Cv } from '../models';
import { pagination } from '../utils';

export default class IterService {
	async getIter(id) {
		return await ITer.findOne(
			{ accountId: id },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				role: 0,
				roleId: 0,
			},
		);
	}
	async getIterByIt(_id) {
		return await ITer.findOne(
			{ _id },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				role: 0,
				roleId: 0,
			},
		);
	}

	async update(_id, data) {
		if (!(await this.getIter(_id))) return false;
		await ITer.findOneAndUpdate({ accountId: _id }, data);
		return true;
	}

	async getIters(page, take) {
		return await pagination(ITer, {}, page, take);
	}

	async getIterReceiveEmail() {
		return await ITer.find(
			{ receiveMail: true },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
				role: 0,
				roleId: 0,
				gender: 0,
				phone: 0,
				address: 0,
				birthday: 0,
				image: 0,
				receiveMail: 0,
			},
		);
	}

	async deleteIter(_id) {
		const iter = await this.getIterByIt(_id);
		if (!iter) return false;
		const userPers = await UserPer.find({ userId: iter.accountId });
		const deleteUserPers = userPers.map((e) => UserPer.findByIdAndDelete({ _id: e._id }));
		await Promise.all([
			ITer.findByIdAndDelete({ _id }),
			Account.findByIdAndDelete({ _id: iter.accountId }),
			...deleteUserPers,
			Cv.findOneAndDelete({ iterId: iter.accountId }),
		]);
		return true;
	}

	async registerSendEmail(accountId, receiveMail) {
		return await ITer.findOneAndUpdate({ accountId }, { receiveMail });
	}
}
