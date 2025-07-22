import bcrypt from "bcrypt";
import AdminUser from "../../models/adminUser.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/responses/sendSanitizedSuccessResponse.js";
import signJwtToken from "../../utils/signJWT.js";

const login = async (req, res, next) => {
    try {
        const { body: { email, password } } = req;
        const isAdminExists = await AdminUser.findOne({ email })
        if (!isAdminExists) throw new ApiError("Invalid Details", 400, "Invalid Email or password", true);
        const isPasswordMatch = await bcrypt.compare(password, isAdminExists.password);
        if (!isPasswordMatch) throw new ApiError("Invalid Details", 400, "Invalid Email or password", true);
        const payload = {
            _id: isAdminExists._id,
            role: isAdminExists.role,
        };
        const token = signJwtToken(payload);
        const sanitizedAdmin = SEND_SANITIZED_SUCCESS_RESPONSE(isAdminExists);
        return sendSuccessResponse(res, 200, true, "Login successful", "admin", { admin: sanitizedAdmin, token });
    } catch (error) {
        next(error);
    }
};
export default login;
