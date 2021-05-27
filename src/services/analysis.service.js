import { ITer, Post, Company } from '../models';
import constant from '../constant';

export default class AnalysisService {
	async post(year) {
		if (isNaN(year)) return [];
		let data = [];
		for (let i = 1; i <= 12; i++) {
			data.push({ month: i });
		}
		let startMonth, endMonth;
		data = data.map((e) => {
			startMonth = new Date(year, e.month - 1 + '');
			endMonth = new Date(year, e.month + '');
			return Post.countDocuments({
				$and: [
					{
						createdAt: { $gte: startMonth },
					},
					{
						createdAt: { $lte: endMonth },
					},
				],
			});
		});
		return await Promise.all(data);
	}

	async skillForMonth(month, year) {
		if (isNaN(year) || isNaN(month)) return [];

		let startMonth = new Date(year, month - 1);
		let endMonth = new Date(year, month);
		let analyzeSkill = constant.SKILLS.map((skill) => {
			return Post.countDocuments({
				skill,
				$and: [{ createdAt: { $gte: startMonth } }, { createdAt: { $lte: endMonth } }],
			});
		});

		let resultSkill = await Promise.all(analyzeSkill);
		let result = [];
		for (let i = 0; i < resultSkill.length; i++) {
			if (resultSkill[i] > 0) {
				result.push({ [constant.SKILLS[i]]: resultSkill[i] });
			}
		}
		return result;
	}

	async skillForYear(year) {
		if (isNaN(year)) return [];

		let startMonth = new Date(year);
		let endMonth = new Date(parseInt(year) + 1 + '');

		let analyzeSkill = constant.SKILLS.map((skill) => {
			return Post.countDocuments({
				skill,
				$and: [{ createdAt: { $gte: startMonth } }, { createdAt: { $lte: endMonth } }],
			});
		});

		let resultSkill = await Promise.all(analyzeSkill);
		let result = [];
		for (let i = 0; i < resultSkill.length; i++) {
			if (resultSkill[i] > 0) {
				result.push({ [constant.SKILLS[i]]: resultSkill[i] });
			}
		}
		return result;
	}

	async analysisUser() {
		const [numberOfIter, numberOfCompany] = await Promise.all([ITer.countDocuments(), Company.countDocuments()]);
		return { numberOfIter, numberOfCompany };
	}
}
