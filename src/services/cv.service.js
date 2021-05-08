import { Cv } from '../models';
import IterService from './iter.service';

export default class CvService {
	iterService = new IterService();
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
		let [iter, cv] = await Promise.all([
			this.iterService.getIter(iterId),
			Cv.findOne({ iterId }, { createdAt: 0, updatedAt: 0, __v: 0 }),
		]);
		return { ...JSON.parse(JSON.stringify(cv)), receiveMail: iter.receiveMail };
	}

	async deleteCv(iterId) {
		return await Cv.findOneAndDelete({ iterId });
	}

	async update(iterId, data) {
		return await Cv.findOneAndUpdate({ iterId }, data);
	}
}
