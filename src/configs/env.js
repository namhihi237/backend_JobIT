require("dotenv").config();

export const envVariables = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.DB_URI || "mongodb://localhost:27017/cnpm",
    jwtSecret: "doancnpm!@#",
    nodeEnv: process.env.NODE_ENV || "development",
    gmail: process.env.GMAIL,
    pass: process.env.PASS,
    text: process.env.TEXT || "Code reset password: ",
    subject: process.env.SUBJECT || "[CODE RESET :]",
    cloudName: process.env.CLOUD_NAME,
    api_key_cloud: process.env.API_KEY_CLOUD,
    api_secret_cloud: process.env.API_SECRET_CLOUD,
    key_admin: "123qwe!@#",
};
