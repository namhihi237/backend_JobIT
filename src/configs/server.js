import express from "express";
export class HttpServer {
    constructor(port) {
        this.port = port;
        this.app = express();
    }

    registerMiddleware(middleware) {
        middleware(this.app);
    }

    registerRouter(router) {
        this.app.use(router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("server is listening on port", this.port);
        });
    }
}
