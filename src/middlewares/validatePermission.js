import { Role, Permission } from "../models";
import { HttpError } from "../utils";
/* check role - permision user*/

const createModPer = async (req, res, next) => {
    const { role } = req.user;
    try {
        if (!(await checkRoleAndPer(role, "CREATE_MOD"))) {
            throw new HttpError("Denny permission create account mod", 401);
        }
        next();
    } catch (error) {
        next(error);
    }
};

/* check role and permission of role*/
const checkRoleAndPer = async (role, actionCode) => {
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

export const roleMiddleware = { createModPer };
