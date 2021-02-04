import { Role } from "../models";

export const initialRole = () => {
    Role.estimatedDocumentCount(async (err, count) => {
        if (!err && count === 0) {
            await Role.create({ roleName: "iter" });
            await Role.create({ roleName: "company" });
            await Role.create({ roleName: "admin" });
            await Role.create({ roleName: "moderator" });
            console.log("Add role ");
            return;
        }
        console.log("Role already ");
    });
};
