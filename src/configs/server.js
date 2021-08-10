import express from 'express';
import log from 'datalog';
import socketIo from 'socket.io';
import http from 'http';
export class HttpServer {
	constructor(port) {
		this.port = port;
		this.app = express();
		this.server = http.Server(this.app);
		this.io = socketIo(this.server);
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

	socketEventHandler(eventsHandler) {
		eventsHandler(this.io);
	}

	listen() {
		this.server.listen(this.port, () => {
			log.info(`server is listening on port ${this.port}`);
		});
	}
}
