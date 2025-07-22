import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize"; // to prevent sql query attack
import xss from "xss-clean"; // to prevent from injecting scripts like html scripts (alert etc)

const app = express();

// will apply to all requests incoming to the app
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize()); // must come after express.json()
app.use(xss());
app.use(morgan(":method :url :status - :response-time ms - :res[content-length]", {
    skip: (req, res) => req.url === "/",
}));

export default app;
