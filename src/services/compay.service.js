import { Company, Account } from "../models";

export default class CompayService {
    async getCompany(_id) {
        const company = await Company.findOne(
            { accountId: _id },
            {
                __v: 0,
                createdAt: 0,
                updateAt: 0,
                role: 0,
                rate: 0,
            }
        );
        return company;
    }

    async update(_id, data) {
        if (!(await this.getCompany(_id))) return false;

        await Company.findOneAndUpdate({ accountId: _id }, data);
        return true;
    }

    async getCompanys() {
        const companys = await Company.find({}, { __v: 0, updatedAt: 0 });
        return companys;
    }

    async deleteCompany(_id) {
        const company = await this.getCompany(_id);
        if (!company) return false;
        await Promise.all([
            Company.findByIdAndDelete({ _id }),
            Account.findByIdAndDelete({ _id: company.accountId }),
        ]);
        return true;
    }
}
