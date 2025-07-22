import dotenv from "dotenv";

dotenv.config({ path: `.env` });

export default {
    PORT: process.env.PORT,
    DATABASE: {
        URL: process.env.MONGODB_URL,
    },
    // SENDGRID: {
    //     API_SECRET: process.env.SENDGRID_API_KEY,
    //     FROM: process.env.SENDGRID_FROM_EMAIL,
    // },
    JWT: {
        SECRET: process.env.JWT_SECRET,
        APP_VERSION_SECRET: process.env.JWT_SECRET_APP_VERSION,
        TOKEN_EXPIRY: "7d",
        VERIFY_EMAIL_TOKEN_EXPIRY: "15m",
    },
};
