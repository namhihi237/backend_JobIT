import { HttpServer, envVariables, dbConnection } from "./configs";

const { port, mongoURI } = envVariables;
import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";
import {
    authRouter,
    adminRouter,
    postRouter,
    modRouter,
    feedbackRouter,
    iterRouter,
    companyRouter,
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
    server.registerRouter(modRouter);
    server.registerRouter(feedbackRouter);
    server.registerRouter(iterRouter);
    server.registerRouter(companyRouter);
    // initial default role
    initialRole();

    server.registerMiddleware(errorHandle);
};
main();
