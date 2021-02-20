require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    mongoURI:
        process.env.DB_URI ||
        "mongodb+srv://cnpm:cnpm17t1@cluster0.n1nom.mongodb.net/todoapp?retryWrites=true&w=majority",
    jwtSecret: process.env.JWT_SECRET || "doancnpm!@#",
    nodeEnv: process.env.NODE_ENV || "development",
    gmail: process.env.GMAIL,
    pass: process.env.GMAIL,
    text: process.env.TEXT || "Code reset password: ",
    subject: process.env.SUBJECT || "[CODE RESET :]",
    cloudName: process.env.CLOUD_NAME,
    api_key_cloud: process.env.API_KEY_CLOUD,
    api_secret_cloud: process.env.API_SECRET_CLOUD,
    key_admin: "123qwe!@#",
};
