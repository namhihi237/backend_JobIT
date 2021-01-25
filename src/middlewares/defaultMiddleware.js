import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import express from "express";

import { envVariables } from "../configs";
const { nodeEnv } = envVariables;

const morgan = nodeEnv !== "production" && require("morgan");

export const defaultMiddleware = (app) => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
    app.use(cors());
    app.use(express.static("public"));
    app.use(express.static(path.join(__dirname, "js")));

    morgan && app.use(morgan("dev"));
};
