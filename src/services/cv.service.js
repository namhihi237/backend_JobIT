import { Cv } from '../models';

export default class CvService {
	async create(data) {
		await Cv.create(data);
	}

	async reciveMail(iterId, receive) {
		return await Cv.findOneAndUpdate({ iterId }, { receiveMail: receive });
	}

	async getCv(_id) {
		return await Cv.findById({ _id }, { createdAt: 0, updatedAt: 0, __v: 0 });
	}

	async getCvByUser(iterId) {
		return await Cv.findOne({ iterId }, { createdAt: 0, updatedAt: 0, __v: 0 });
	}

	async deleteCv(iterId) {
		return await Cv.findOneAndDelete({ iterId });
	}

	async update(iterId, data) {
		return await Cv.findOneAndUpdate({ iterId }, data);
	}
}
