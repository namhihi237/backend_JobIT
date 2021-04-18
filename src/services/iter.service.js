import { ITer, Account, UserPer } from "../models";
import { pagination } from "../utils";
export default class IterService {
    async getIter(id) {
        const iter = await ITer.findOne(
            { accountId: id },
            {
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                role: 0,
                roleId: 0,
            }
        );
        return iter;
    }
    async getIterByIt(_id) {
        const iter = await ITer.findOne(
            { _id },
            {
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                role: 0,
                roleId: 0,
            }
        );
        return iter;
    }

    async update(_id, data) {
        if (!(await this.getIter(_id))) return false;
        await ITer.findByIdAndUpdate({ accountId: _id }, data);
        return true;
    }

    async getIters(page, take) {
        let data = await pagination(ITer, page, take);
        return data;
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
}
