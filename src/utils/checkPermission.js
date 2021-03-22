import { Role, Permission, UserPer } from "../models";
/* check role and permission of role*/
export const checkRoleAndPer = async (userId, actionCode) => {
    try {
        console.log(userId, actionCode);
        const userPermission = await UserPer.findOne({
            userId,
            actionCode,
            check: true,
        });
        console.log(userPermission);
        if (!userPermission) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
