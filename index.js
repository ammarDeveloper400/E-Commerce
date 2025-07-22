import AppRoutes from "./src/routes/index.js";
import app from "./src/middlewares/appRouteMiddlewares.js";
import ENV from "./src/config/keys.js";
import print from "./src/utils/print.js";
import DB from "./src/config/db.js";
import { globalErrorHandlerMiddleware, handleApiNotFound, handleSIGINT, handleUncaughtException } from "./src/utils/globalErrorHandlers.js";

const dateDeployed = `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
app.get("/", (req, res) => {
    res.send(`Welcome to BedMatress (${process.env.NODE_ENV})  LDA : ${dateDeployed} . Hello from worker: ${process.pid}`);
});

// apis routes
app.use("/api/v1/", AppRoutes);

// global error handlers
app.use(handleApiNotFound);
app.use(globalErrorHandlerMiddleware);
process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUncaughtException);
process.on("SIGINT", handleSIGINT);

app.listen(ENV.PORT, () => {
    print("info", `Server is running on port ${ENV.PORT}...`);
    print("info", `This is ${process.env.NODE_ENV} environment...`);
    DB();
});