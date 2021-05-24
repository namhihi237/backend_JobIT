import { Post } from '../models';
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
		let result = await Promise.all(data);
		return result;
	}
}
