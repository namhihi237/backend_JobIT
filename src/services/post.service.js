import { Post, ITer, Cv } from '../models';
import { sendMailJob } from '../utils';
import { envVariables } from '../configs';
const { url_fe } = envVariables;
import queue from 'queue';
import mongo from 'mongoose';

let q = queue({ results: [] });

export default class PostService {
	async create(data) {
		await Post.create(data);
	}

	async getPosts(query, type, page = 0, take = 10) {
		let posts = [];
		page = isNaN(page) ? 1 : page - 0;
		take = isNaN(take) ? 10 : take - 0;
		let count;
		let numPages;

		if (!query) {
			count = await Post.countDocuments({ accept: type });
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
						accept: type,
					},
				},
				{
					$project: {
						__v: 0,
						active: 0,
						accept: 0,
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
			count = await Post.countDocuments({ accept: type, $text: { $search: `${query}` } });
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
						accept: type,
						$text: { $search: `${query}` },
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
						active: 0,
						accept: 0,
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
					active: 0,
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
		if (!(await this.getPost({ _id: id }))) return false;
		await Post.findByIdAndUpdate({ _id: id }, data);
		return true;
	}

	async deletePost(id) {
		if (!(await this.getPost({ _id: id }))) return false;
		await Post.findByIdAndDelete({ _id: id });
		return true;
	}

	async acceptPost(id) {
		const accepted = await Post.findByIdAndUpdate({ _id: id }, { accept: true });
		if (!accepted) return false;

		const skills = accepted.skill.join(' ');
		const listCv = await Cv.find(
			{ $text: { $search: `${skills}` }, receiveMail: true },
			{
				email: 1,
			},
		);

		const sendMailList = listCv.map((cv) => {
			sendMailJob(cv.email, skills, `${url_fe}/job/${accepted._id}`);
		});
		q.push(function () {
			Promise.all(sendMailList);
		});
		q.on('success', function (result, job) {
			console.log('job finished processing:', job.toString().replace(/\n/g, ''));
		});
		q.start(function (err) {
			if (err) throw err;
			console.log('all done:', q.results);
		});
		return true;
	}
	async listsatifieldPosts(skill, email) {
		// check time nua
		let posts = await Post.find({ $text: { $search: skill }, accept: true }, { title: 1, address: 1 })
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
					active: 0,
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
		if (!(await this.getPost({ _id }))) return [];
		const post = await Post.findById({ _id }, { comment: 0 });
		return post.apply;
	}
}
