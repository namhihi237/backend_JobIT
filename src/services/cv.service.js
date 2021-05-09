import { Cv } from '../models';
import IterService from './iter.service';
import _ from 'lodash';
const iterService = new IterService();

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
		let [iter, cv] = await Promise.all([
			iterService.getIter(iterId),
			Cv.findOne({ iterId }, { createdAt: 0, updatedAt: 0, __v: 0 }),
		]);
		return { ...JSON.parse(JSON.stringify(cv)), receiveMail: _.get(iter, 'receiveMail') };
	}

	async getCvFilterSkill(iterId) {
		return Cv.findOne({ iterId }, { skill: 1, iterId: 1 });
	}

	async deleteCv(iterId) {
		return await Cv.findOneAndDelete({ iterId });
	}

	async update(iterId, data) {
		return await Cv.findOneAndUpdate({ iterId }, data);
	}
}
