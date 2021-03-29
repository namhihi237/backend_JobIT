import { UserPer, Permission, Admin } from "../models";
import bcrypt from "bcryptjs";
export const initAccountAmin = async () => {
    try {
        let admin = await Admin.findOne({ userName: "admin" });
        if (admin) {
            console.log("Account admin is already");
            return;
        }
        const password = "123456";
        const hash = await bcrypt.hash(password, 12);
        admin = await Admin.create({
            userName: "admin",
            password: hash,
            role: "admin",
        });
        let permissions = await Permission.find({ role: "admin", check: true });
        permissions = permissions.map((e) => {
            return UserPer.create({
                userId: admin._id,
                perId: e._id,
                perName: e.perName,
                actionCode: e.actionCode,
                check: true,
            });
        });
        await Promise.all(permissions);
        console.log("Account admin has been created.");
    } catch (error) {
        console.log(error);
    }
};
