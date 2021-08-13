import { Post, ITer, Company } from '../models';
import mongo from 'mongoose';
import NotificationService from './notification.service';
import { followerService } from '../services';
import { iterService } from '.';
import c from '../constant';
import constant from '../constant';
const notification = new NotificationService();
export default class PostService {
	async create(data) {
		const post = await Post.create(data);
		// send notification for iter had follow
		const followers = await followerService.getFollowers(data.accountId);
		const notifications = followers.map((follower) => {
			return {
				type: constant.NOTIFICATIONS_TYPE.POST,
				title: `New job`,
				content: `${data.name} had post new job for ${data.skill.join(' ')}`,
				postId: post._id,
				userId: follower,
			};
		});
		await notification.createManyNotifications(notifications);
	}

	async getPosts(query, status, page = 0, take = 10) {
		let posts = [];
		page = isNaN(page) ? 1 : page - 0;
		take = isNaN(take) ? 10 : take - 0;
		let count;
		let numPages;
		if (!query) {
			count = await Post.countDocuments({ status });
			numPages = Math.ceil(count / take);
			if (page > numPages || page <= 0)
				return {
					currentPage: page,
					numPages,
					posts,
				};

			const skip = (page - 1) * take;
			posts = await Post.aggregate([
				{
					$match: {
						status,
					},
				},
				{
					$lookup: {
						from: 'company',
						localField: 'companyId',
						foreignField: '_id',
						as: 'company',
					},
				},
				{
					$project: {
						__v: 0,
						status: 0,
						createdAt: 0,
						updatedAt: 0,
						comment: 0,
						apply: {
							name: 0,
							timeApply: 0,
							email: 0,
							cvId: 0,
							_id: 0,
						},
						'company.createdAt': 0,
						'company.updatedAt': 0,
						'company._id': 0,
						'company.recruitingPost': 0,
						'company.__v': 0,
					},
				},
			])
				.sort({ _id: -1 })
				.skip(skip)
				.limit(take);
		} else {
			count = await Post.countDocuments({ status, $text: { $search: `${query}` } });
			numPages = Math.ceil(count / take);
			if (page > numPages || page <= 0)
				return {
					currentPage: page,
					numPages,
					posts,
				};

			const skip = (page - 1) * take;
			let search = '';
			let searchArray = query.split(',');
			searchArray.forEach((e) => {
				if (e.search('-') != -1) {
					search += ` -"${e.slice(1, e.length)}" `;
				} else {
					search += `"${e}"`;
				}
			});
			posts = await Post.aggregate([
				{
					$match: {
						status,
						$text: { $search: `${search}` },
					},
				},
				{
					$lookup: {
						from: 'company',
						localField: 'companyId',
						foreignField: '_id',
						as: 'company',
					},
				},
				{
					$project: {
						__v: 0,
						status: 0,
						createdAt: 0,
						updatedAt: 0,
						comment: 0,
						apply: {
							name: 0,
							timeApply: 0,
							email: 0,
							cvId: 0,
							_id: 0,
						},
						'company.createdAt': 0,
						'company.updatedAt': 0,
						'company._id': 0,
						'company.recruitingPost': 0,
						'company.__v': 0,
						score: { $meta: 'textScore' },
					},
				},
			])
				.sort({ score: { $meta: 'textScore' }, _id: -1 })
				.skip(skip)
				.limit(take);
		}

		return {
			currentPage: page,
			numPages,
			posts,
		};
	}

	async getPost(_id) {
		return await Post.aggregate([
			{
				$match: {
					_id: mongo.Types.ObjectId(_id),
				},
			},
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
					comment: 0,
					company: {
						createdAt: 0,
					},
				},
			},
			{
				$lookup: {
					from: 'company',
					localField: 'companyId',
					foreignField: '_id',
					as: 'company',
				},
			},
		]).sort({ _id: -1 });
	}

	async update(id, data) {
		if (!(await this.getPost(id))) return false;
		await Post.findByIdAndUpdate({ _id: id }, data);
		return true;
	}

	async deletePost(id) {
		let post = await Post.findById(id);
		if (!post) return false;
		await Post.findByIdAndDelete(id);
		if (post.status == 'ACCEPTED') {
			const numPost = await Post.countDocuments({ companyId: post.companyId, status: 'ACCEPTED' });
			await Company.findByIdAndUpdate(post.companyId, { recruitingPost: numPost });
		}
		return true;
	}

	async donePost(_id) {
		const post = await Post.findById(_id);
		if (!post) return false;
		await Post.findByIdAndUpdate(_id, { status: 'DONE' });
		const numPost = await Post.countDocuments({ companyId: post.companyId, status: 'ACCEPTED' });
		await Company.findByIdAndUpdate(post.companyId, { recruitingPost: numPost });
		return true;
	}

	async acceptPost(id) {
		const check = await Post.findOne({ _id: id });
		if (!check) return 0;
		if (check.status == 'ACCEPTED') return 1;
		const accepted = await Post.findByIdAndUpdate(id, { status: 'ACCEPTED' });
		if (!accepted) return 1;
		const numPost = await Post.countDocuments({ companyId: accepted.companyId, status: 'ACCEPTED' });
		await Company.findByIdAndUpdate(accepted.companyId, { recruitingPost: numPost });
		return 2;
	}

	async listsatifieldPosts(skill, email) {
		// check time nua
		let posts = await Post.aggregate([
			{
				$match: {
					$text: { $search: skill },
					status: 'ACCEPTED',
				},
			},
			{
				$lookup: {
					from: 'company',
					localField: 'companyId',
					foreignField: '_id',
					as: 'company',
				},
			},
			{
				$project: {
					title: 1,
					address: 1,
					skill: 1,
					endTime: 1,
					'company.image': 1,
					'company.name': 1,
				},
			},
		])
			.sort({ createdAt: -1 })
			.limit(10);
		return { posts, email };
	}

	async getCompanyPost(accountId) {
		return await Post.aggregate([
			{
				$match: {
					accountId: mongo.Types.ObjectId(accountId),
				},
			},
			{
				$project: {
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
					apply: 0,
					comment: 0,
					company: {
						createdAt: 0,
					},
				},
			},
			{
				$lookup: {
					from: 'company',
					localField: 'companyId',
					foreignField: '_id',
					as: 'company',
				},
			},
		]).sort({ _id: -1 });
	}

	async applyPost(_id, iterId, cvId) {
		const existIter = await Post.findOne({ _id, apply: { $elemMatch: { iterId } } });
		if (existIter) return false;
		const iter = await ITer.findOne({ accountId: iterId });
		await Post.findByIdAndUpdate(
			{ _id },
			{ $push: { apply: { name: iter.name, email: iter.email, iterId, cvId } } },
		);
		return true;
	}

	async listPostsByCompanyId(accountId) {
		return await Post.find(
			{ accountId, status: 'ACCEPTED' },
			{ comment: 0, __v: 0, createdAt: 0, companyId: 0, updatedAt: 0, status: 0 },
		).sort({ _id: -1 });
	}

	async responseListApply(postId, listResponse) {
		const post = await Post.findById(postId);
		if (!post) return false;
		let listApply = post.apply || [];
		const listIter = listResponse.map((iter) => {
			return iterService.getIter(iter.iterId);
		});
		const listResponsePromise = listResponse.map((item, index) => {
			if (!listIter[index]) return null;
			else {
				const index = listApply.findIndex((apply) => {
					return JSON.stringify(apply.iterId) == JSON.stringify(item.iterId) && apply.status == 'pending';
				});
				if (index == -1) return null;
				listApply[index].status = item.status == 'agree' ? 'agreed' : 'rejected';
				let notify = {
					title: `Response apply post ${post.title}`,
					type: constant.NOTIFICATIONS_TYPE.POST,
					postId,
				};
				notify.content =
					item.status == 'agree'
						? `${post.name} agree your apply, please wait an email to confirm`
						: `${post.name} reject your apply`;

				return notification.createNotification(item.iterId, notify);
			}
		});
		await Post.findByIdAndUpdate(postId, { apply: listApply });
		await Promise.all(listResponsePromise);
	}

	async listAppliedPosts(iterId) {
		let posts = await Post.find(
			{
				apply: { $elemMatch: { iterId } },
			},
			{
				__v: 0,
				updatedAt: 0,
			},
		).sort({ _id: -1 });

		posts = posts.map((post) => {
			post.status = post.apply.find((iter) => JSON.stringify(iter.iterId) == JSON.stringify(iterId)).status;
			post.apply = null;
			delete post.apply;
			return post;
		});
		return posts;
	}
}
