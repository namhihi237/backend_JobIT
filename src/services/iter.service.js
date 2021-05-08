import { ITer, Account, UserPer } from '../models';
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

	async deleteIter(_id) {
		const iter = await this.getIterByIt(_id);
		if (!iter) return false;
		const userPers = await UserPer.find({ userId: iter.accountId });
		const deleteUserPers = userPers.map((e) => UserPer.findByIdAndDelete({ _id: e._id }));
		await Promise.all([
			ITer.findByIdAndDelete({ _id }),
			Account.findByIdAndDelete({ _id: iter.accountId }),
			...deleteUserPers,
		]);
		return true;
	}

	async registerSendEmail(accountId, receiveMail) {
		return await ITer.findOneAndUpdate({ accountId }, { receiveMail });
	}
}
