import express from 'express';
import log from 'datalog';
export class HttpServer {
	constructor(port) {
		this.port = port;
		this.app = express();
	}

	getApp() {
		return this.app;
	}
	registerMiddleware(middleware) {
		middleware(this.app);
	}

	registerRouter(router) {
		this.app.use(router);
	}

	listen() {
		this.app.listen(this.port, () => {
			log.info(`server is listening on port ${this.port}`);
		});
	}
}
