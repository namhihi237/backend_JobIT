import mongoose from "mongoose";

export const dbConnection = (uri) => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        const db = mongoose.connection;
        db.once("open", () => {
            console.log("Connected to database");
        });
    } catch (error) {
        console.log(error);
    }
};
