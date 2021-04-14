import {} from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

const register = async (req, res, next) => {
    let { password, email, fullName } = req.body;
    email = email.toLowerCase();
    try {
        const user = await authService.getAccount({ email });
        if (user) {
            throw new HttpError("The email has already been used by another account", 400);
        }
        const data = { email, password, fullName };
        await authService.register(data, "iter");
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
        const user = await authService.getAccount({ email });
        if (!user) throw new HttpError("Email or password is incorrect", 400);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new HttpError("Email or password is incorrect", 400);

        let data = {
            email: user.email,
            _id: user._id,
            role: user.role,
        };
        const token = tokenEncode(data);

        res.status(200).json({
            status: 200,
            msg: "Success",
            role: data.role,
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const authController = {
    registerIter,
    login,
};
