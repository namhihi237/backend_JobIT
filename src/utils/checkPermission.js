import { Role, Permission } from "../models";
/* check role and permission of role*/
export const checkRoleAndPer = async (role, actionCode) => {
    try {
        const _role = await Role.findOne({ roleName: role });
        if (!_role) {
            return false;
        }
        const per = await Permission.findOne({ roleId: _role._id, actionCode, check: true });
        if (!per) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};
