import { UserPer } from "../models";
/* check role and permission of role*/
export const checkRoleAndPer = async (userId, actionCode) => {
    try {
        const userPermission = await UserPer.findOne({
            userId,
            actionCode,
            check: true,
        });
        if (!userPermission) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
