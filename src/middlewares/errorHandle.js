import { HttpError } from "../utils";

export const errorHandle = (server) => {
    server.use((req, res, next) => {
        const err = new HttpError("Not Found", 404);
        next(err);
    });

    server.use((err, req, res, next) => {
        const status = err.status ? err.status : 500;
        return res.status(status).json({
            msg: err.message,
            status,
        });
    });
};
