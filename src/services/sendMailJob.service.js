import { CronJob } from 'cron';
import { PostService, CvService, IterService } from '../services';
import { sendMailJobShedule } from '../utils';
import queue from 'queue';
import _ from 'lodash';
/*
    - flow
    + step 1: get all cv (receiveMail = true) => iters =  { email , skill}
    + step 2: loop iters
        - find satifield posts iter.skill match post.skill (address)
        - add send mail into array Promisse
    + step 3: add queue
 */
export default class SendEmailJob {
	postService = new PostService();
	cvService = new CvService();
	iterService = new IterService();
	q = queue({ results: [] });

	job = new CronJob(
		'* 0 * * * *',
		async () => {
			console.log('You will see this message every minute');
			// step 1: get all cv (receiveMail = true) => iters =  { email , skill}\
			// List email + name
			try {
				let listItersReceiveEmails = await this.iterService.getIterReceiveEmail();
				const listSkillsPromise = listItersReceiveEmails.map((_ITM) =>
					this.cvService.getCvFilterSkill(_ITM.accountId),
				);
				let listSkills = await Promise.all(listSkillsPromise);

				// list info email need send { email , name, skill }
				let listNeedEmails = listItersReceiveEmails.map((el) => {
					return {
						...JSON.parse(JSON.stringify(el)),
						skill: _.get(
							listSkills.find((e) => JSON.stringify(e.iterId) == JSON.stringify(el.accountId)),
							'skill',
						),
					};
				});

				//post send email
				let postSendEmail = await Promise.all(
					listNeedEmails.map((el) => {
						return this.postService.listsatifieldPosts(el.skill, el.email);
					}),
				);

				let sendEmail = postSendEmail.map((el) => {
					sendMailJobShedule('trungnam23799@gmail.com', el.posts[0].title);
				});
				this.q.push(function () {
					Promise.all(sendEmail);
				});
				this.q.on('success', function (result, job) {
					console.log('job finished processing:', job.toString().replace(/\n/g, ''));
				});
				this.q.start(function (err) {
					if (err) throw err;
					console.log('all done:', q.results);
				});
			} catch (error) {
				console.log(error);
			}
		},
		null,
		true,
		'Asia/Ho_Chi_Minh',
	);
}
