import { Post, ITer, Company } from '../models';
import mongo from 'mongoose';
export default class PostService {
	async create(data) {
		await Post.create(data);
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
					$project: {
						__v: 0,
						status: 0,
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
			])
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
						apply: 0,
						comment: 0,
						score: { $meta: 'textScore' },
					},
				},
			])
				.skip(skip)
				.limit(take)
				.sort({ score: { $meta: 'textScore' } });
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
		]);
	}

	async update(id, data) {
		if (!(await this.getPost(id))) return false;
		await Post.findByIdAndUpdate({ _id: id }, data);
		return true;
	}

	async deletePost(id) {
		let post = await Post.findById(id);
		if (post) return false;
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
		await Post.findByIdAndUpdate(_id, { status: '' });
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
		let posts = await Post.find({ $text: { $search: skill }, status: 'ACCEPTED' }, { title: 1, address: 1 })
			.limit(10)
			.sort({ createdAt: -1 });
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
		]);
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

	async listApply(_id) {
		if (!(await this.getPost(_id))) return [];
		const post = await Post.findById({ _id }, { comment: 0 });
		return post.apply;
	}

	async listPostsByCompanyId(accountId) {
		return await Post.find(
			{ accountId, status: 'ACCEPTED' },
			{ comment: 0, __v: 0, apply: 0, createdAt: 0, companyId: 0, updatedAt: 0, status: 0 },
		);
	}
}
