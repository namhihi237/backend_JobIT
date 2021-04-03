import { ITer, Account } from "../models";

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

    async update(_id, data) {
        if (!(await this.getIter(_id))) return false;
        await ITer.findByIdAndUpdate({ accountId: _id }, data);
        return true;
    }

    async getIters() {
        const iters = await ITer.find({}, { __v: 0, updatedAt: 0, receiveMailJob: 0 });
        return iters;
    }

    async deleteIter(_id) {
        const iter = await this.getIter(_id);
        if (!iter) return false;

        await Promise.all([
            ITer.findByIdAndDelete({ _id }),
            Account.findByIdAndDelete({ _id: iter.accountId }),
        ]);
        return true;
    }
}
