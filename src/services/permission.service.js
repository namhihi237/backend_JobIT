import { Account, Admin, Permission, UserPer } from "../models";

export default class PermissionService {
    async getPermissions(role) {
        let permissions = [];
        console.log(role);

        if (!role) permissions = await Permission.find();
        else permissions = await Permission.find({ role });
        return permissions;
    }

    async getUserPermission(userId) {
        const permissions = await UserPer.find({ userId }, { createdAt: 0, __v: 0, updatedAt: 0 });
        return permissions;
    }

    async updatePermisson(permissions, role, apply) {
        let updatePer = permissions.map((e) => {
            return Permission.findOneAndUpdate(
                { _id: e._id, check: !e.check },
                { check: e.check } // check thay doi state moi doi
            );
        });
        const [...changed] = await Promise.all(updatePer);
        let usersRole = [];
        if (role != "moderator") usersRole = await Account.find({ role }, { password: 0 });
        else usersRole = await Admin.find({ role }, { password: 0 });
        // no apply
        if (apply === false) {
            let addUserPers = [];
            for (let item of changed) {
                if (item) {
                    if (item.check == false) {
                        // flase => true
                        // add permission
                        let addUserPer = usersRole.map((e) => {
                            return UserPer.create({
                                userId: e._id,
                                perId: item._id,
                                perName: item.perName,
                                actionCode: item.actionCode,
                                check: false, // no apply
                            });
                        });
                        addUserPers = [...addUserPers, ...addUserPer];
                    } else {
                        // remove permission
                        // xoa user per neu false. true => false
                        let userPerDels = await UserPer.find(
                            {
                                perId: item._id,
                            },
                            { _id: 1 }
                        );
                        // console.log(userPerDels);
                        userPerDels = userPerDels.map((e) =>
                            UserPer.findByIdAndDelete({ _id: e._id })
                        );
                        addUserPers = [...addUserPers, ...userPerDels];
                    }
                }
            }
            await Promise.all(addUserPers);
        } else {
            let addUserPers = [];
            for (let item of changed) {
                if (item) {
                    if (item.check == false) {
                        // flase => true
                        // add permission
                        let addUserPer = usersRole.map((e) => {
                            return UserPer.create({
                                userId: e._id,
                                perId: item._id,
                                perName: item.perName,
                                actionCode: item.actionCode,
                                check: true, // no apply
                            });
                        });
                        addUserPers = [...addUserPers, ...addUserPer];
                    } else {
                        // remove permission
                        // xoa user per neu false. true => false
                        let userPerDels = await UserPer.find(
                            {
                                perId: item._id,
                            },
                            { _id: 1 }
                        );
                        // console.log(userPerDels);
                        userPerDels = userPerDels.map((e) =>
                            UserPer.findByIdAndDelete({ _id: e._id })
                        );
                        addUserPers = [...addUserPers, ...userPerDels];
                    }
                }
            }
            await Promise.all(addUserPers);
        }
    }

    async updateUserPermisson(userId, permissions) {
        const newPermission = permissions.map((e) => {
            return UserPer.findOneAndUpdate(
                { userId, _id: e._id, check: !e.check },
                { check: e.check }
            );
        });
        await Promise.all(newPermission);
    }
}
