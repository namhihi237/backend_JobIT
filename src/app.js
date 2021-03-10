import { HttpServer, envVariables, dbConnection } from "./configs";

const { port, mongoURI } = envVariables;
import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";
import {
    authRouter,
    adminRouter,
    postRouter,
    feedbackRouter,
    iterRouter,
    companyRouter,
    cvRouter,
} from "./routes";

import { initialRole } from "./utils";

const main = async () => {
    const server = new HttpServer(port);
    server.registerMiddleware(defaultMiddleware);
    server.listen();

    dbConnection(mongoURI);
    // api
    server.registerRouter(authRouter);
    server.registerRouter(adminRouter);
    server.registerRouter(postRouter);
    server.registerRouter(feedbackRouter);
    server.registerRouter(iterRouter);
    server.registerRouter(companyRouter);
    server.registerRouter(cvRouter);
    // initial default role
    initialRole();

    server.registerMiddleware(errorHandle);
};
main();
