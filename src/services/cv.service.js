import { Cv } from "../models";

export default class CvService {
    async create(data) {
        await Cv.create(data);
    }

    async reciveMail(iterId, receive) {
        const cv = await Cv.findOneAndUpdate({ iterId }, { receiveMail: receive });
        return cv;
    }

    async getCv(_id) {
        const cv = await Cv.findById({ _id }, { createdAt: 0, updatedAt: 0, __v: 0 });
        return cv;
    }

    async getCvByUser(iterId) {
        const cv = await Cv.findOne({ iterId }, { createdAt: 0, updatedAt: 0, __v: 0 });
        return cv;
    }
}
