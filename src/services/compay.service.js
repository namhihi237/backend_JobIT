import { Company, Account, UserPer } from '../models';
import { pagination } from '../utils';
export default class CompayService {
	async getCompany(_id) {
		return await Company.findOne(
			{ accountId: _id },
			{
				__v: 0,
				createdAt: 0,
				updateAt: 0,
				role: 0,
				rate: 0,
			},
		);
	}

	async getCompanyById(_id) {
		return await Company.findById(
			{ _id },
			{
				__v: 0,
				createdAt: 0,
				updateAt: 0,
				role: 0,
				rate: 0,
			},
		);
	}

	async update(_id, data) {
		if (!(await this.getCompany(_id))) return false;

		await Company.findOneAndUpdate({ accountId: _id }, data);
		return true;
	}

	async getCompanies(page, take) {
		return await pagination(Company, {}, page, take);
	}

	async deleteCompany(_id) {
		const company = await this.getCompanyById(_id);
		if (!company) return false;
		const userPers = await UserPer.find({ userId: company.accountId });
		const deleteUserPers = userPers.map((e) => UserPer.findByIdAndDelete({ _id: e._id }));
		await Promise.all([
			Company.findByIdAndDelete({ _id }),
			Account.findByIdAndDelete({ _id: company.accountId }),
			...deleteUserPers,
		]);
		return true;
	}

	async getInfoCompanies(page, take) {
		return await pagination(Company, {}, page, take, { __v: 0, createdAt: 0 });
	}


}
