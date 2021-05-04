import { CronJob } from 'cron';

export const job = new CronJob(
	'0 * * * * *',
	() => {
		console.log('You will see this message every minute');
	},
	null,
	true,
	'Asia/Ho_Chi_Minh',
);
