import { HttpServer, envVariables, dbConnection } from './configs';

const { port, mongoURI } = envVariables;
import { defaultMiddleware } from './middlewares';
import { errorHandle } from './middlewares';
import {
	authRouter,
	adminRouter,
	postRouter,
	feedbackRouter,
	iterRouter,
	companyRouter,
	cvRouter,
	imageRouter,
	permissionRouter,
	analysisRouter,
	notificationRouter,
} from './routes';

import { SendEmailJob } from './services';

import { initAccountAmin } from './utils';
export let server;
const main = async () => {
	server = new HttpServer(port);
	server.registerMiddleware(defaultMiddleware);
	server.listen();
	const cron = new SendEmailJob();

	dbConnection(mongoURI);
	// api
	server.registerRouter(authRouter);
	server.registerRouter(adminRouter);
	server.registerRouter(postRouter);
	server.registerRouter(feedbackRouter);
	server.registerRouter(iterRouter);
	server.registerRouter(companyRouter);
	server.registerRouter(cvRouter);
	server.registerRouter(permissionRouter);
	server.registerRouter(imageRouter);
	server.registerRouter(analysisRouter);
	server.registerRouter(notificationRouter);
	// initial default role
	// initialRole();
	initAccountAmin();
	server.registerMiddleware(errorHandle);
	cron.job.start();
};
main();
