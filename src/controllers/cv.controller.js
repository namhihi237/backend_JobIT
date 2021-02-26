import { ITer, Cv, Company } from "../models";
import { HttpError } from "../utils";

const createCv = async (req, res, next) => {
    const { _id } = req.user;
    let { linkGit, skill, personalSkill, education, experience, description } = req.body;
    try {
        const user = await ITer.findById({ _id });
        const { email, fullName } = user;
        await Cv.create({
            iterId: _id,
            linkGit,
            skill,
            iterName: fullName,
            personalSkill,
            education,
            experience,
            description,
            email,
        });
        res.status(200).json({
            status: 200,
            msg: "Create new Cv success",
        });
    } catch (error) {
        next(error);
    }
};

const receiveMail = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const cv = await Cv.findOneAndUpdate({ iterId: _id }, { receiveMail: true });
        if (!cv) {
            throw new HttpError("You are not have cv", 400);
        }
        res.status(200).json({
            status: 200,
            msg: "Registed receive email ",
        });
    } catch (error) {
        next(error);
    }
};

const cancelReceiveMail = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const cv = await Cv.findOneAndUpdate({ iterId: _id }, { receiveMail: false });
        if (!cv) {
            throw new HttpError("You are not have cv", 400);
        }
        res.status(200).json({
            status: 200,
            msg: "Cancel receive email ",
        });
    } catch (error) {
        next(error);
    }
};

export const cvController = { createCv, receiveMail, cancelReceiveMail };
