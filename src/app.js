import { HttpServer, envVariables } from "./configs";

const { port } = envVariables;
import { defaultMiddleware } from "./middlewares";
import { errorHandle } from "./middlewares";

const main = async () => {
    const server = new HttpServer(port);
    server.registerMiddleware(defaultMiddleware);
    server.listen();

    // dbConnection(mongoURI);
    // api
    // server.registerRouter(authRouter);

    server.registerMiddleware(errorHandle);
};
main();
