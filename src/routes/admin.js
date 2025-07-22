import express from "express"
import AdminUser from "../models/adminUser.js";
import { signup, login, changePassword } from "../controllers/admin/index.js";
import { adminJoiSchema, loginJoiSchema, changePasswordJoiSchema, } from "../controllers/admin/adminJoiSchema.js"
import validateUserInputs from "../middlewares/validateUserInputs.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("signup", validateUserInputs(adminJoiSchema), signup);
routes.post("login", validateUserInputs(loginJoiSchema), login);
routes.post("change-password", validateUserInputs(changePasswordJoiSchema), authMiddleware(AdminUser), changePassword);

export default routes;
