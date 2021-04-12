import { Post, ITer, Company, Cv } from "../models";
import { sendMailJob } from "../utils";
import { envVariables } from "../configs";
const { url_fe } = envVariables;

export default class PostService {
    async create(data) {
        await Post.create(data);
    }

    async getPosts(query, type, page = 0, take = 10) {
        let posts = [];
        page = isNaN(page) ? 1 : page - 0;
        take = isNaN(take) ? 10 : take - 0;
        let count = await Post.countDocuments({ accept: type });
        let numPages = Math.ceil(count / take);

        if (page > numPages) page = numPages;
        page = page <= 0 ? 1 : page;

        const skip = (page - 1) * take;
        if (!query) {
            posts = await Post.find(
                { accept: type },
                { __v: 0, active: 0, accept: 0, createdAt: 0, updatedAt: 0, apply: 0 }
            )
                .skip(skip)
                .limit(take);
        } else {
            posts = await Post.find(
                { $text: { $search: `${query}` }, accept: type },
                { __v: 0, active: 0, accept: 0, createdAt: 0, updatedAt: 0, apply: 0 }
            )
                .skip(skip)
                .limit(take);
        }

        return {
            currentPage: page,
            numPages,
            posts,
        };
    }

    async getPost(arg) {
        const post = await Post.findOne(arg);
        return post;
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

        const skills = accepted.skill;
        const listCv = await Cv.find(
            { skill: { $in: [...skills] }, receiveMail: true },
            {
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                education: 0,
                description: 0,
                personalSkill: 0,
                linkGit: 0,
                experience: 0,
                _id: 0,
                receiveMail: 0,
                iterId: 0,
            }
        );
        const sendMailList = listCv.map((cv) => {
            sendMailJob(cv.email, skills, `${url_fe}/job/${accepted._id}`);
        });
        await Promise.all(sendMailList);
        return true;
    }

    async getCompanyPost(companyId) {
        const posts = await Post.find(
            { companyId },
            { __v: 0, active: 0, createdAt: 0, updatedAt: 0, apply: 0 }
        );
        return posts;
    }

    async applyPost(_id, iterId) {
        console.log(_id, iterId);
        const existIter = await Post.findOne({ _id, apply: { $elemMatch: { iterId } } });
        console.log(existIter);
        if (existIter) return false;
        const cv = await Cv.findOne({ iterId });
        if (!cv) return false;
        const cvId = cv._id;
        const post = await Post.findByIdAndUpdate({ _id }, { $push: { apply: { iterId, cvId } } });
        console.log(post);
        return true;
    }

    async listApply(_id) {
        if (!(await this.getPost({ _id }))) return [];
        const post = await Post.findById({ _id }, { comment: 0 });
        return post.apply;
    }
}
