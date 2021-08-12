import { Follow, Company } from '../models';
export default class FollowService {
	async follow(iterId, companyId) {
		const isFollowed = await Follow.findOne({
			iterId,
			companyId,
		});
		const company = await Company.findOne({ accountId: companyId });

		if (isFollowed) {
			await Follow.findByIdAndDelete(isFollowed._id);
			await Company.findOneAndUpdate(
				{ accountId: companyId },
				{
					numberOfFollowers: company.numberOfFollowers ? company.numberOfFollowers - 1 : 0,
				},
			);
			return false;
		}

		await Follow.create({
			iterId,
			companyId,
		});

		await Company.findOneAndUpdate(
			{ accountId: companyId },
			{
				numberOfFollowers: company.numberOfFollowers ? company.numberOfFollowers + 1 : 1,
			},
		);
		return true;
	}

	async getFollowing(iterId) {
		const follow = await Follow.find({ iterId }, { companyId: 1, _id: 0 });
		return follow.map((f) => f.companyId);
	}
}

export const followerService = new FollowService();
