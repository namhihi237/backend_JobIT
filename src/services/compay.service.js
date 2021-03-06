import { Company, Account, UserPer, Post } from '../models';
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
		await Promise.all([
			Company.findByIdAndDelete({ _id }),
			Account.findByIdAndDelete({ _id: company.accountId }),
			UserPer.deleteMany({ userId: company.accountId }),
			Post.deleteMany({ accountId: company.accountId }),
		]);
		return true;
	}

	async getInfoCompanies(page, take, query) {
		if (!query) return await pagination(Company, {}, page, take, { __v: 0, createdAt: 0 });
		return await pagination(Company, { $text: { $search: `${query}` } }, page, take, { __v: 0, createdAt: 0 });
	}
}
