import AdminUser from "../../models/adminUser.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";
import SEND_SANITIZED_SUCCESS_RESPONSE from "../../utils/responses/sendSanitizedSuccessResponse.js";
import signJwtToken from "../../utils/signJWT.js";

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isAdminExists = await AdminUser.findOne({ email });
        if (isAdminExists) {
            throw new ApiError('Invalid Request', 400, 'Admin already exists', true);
        }
        const admin = await AdminUser.create({ name, email, password });
        if (!admin) throw new ApiError('Invalid Request', 400, 'Admin not created', true);
        const payload = {
            _id: admin._id,
            role: admin.role,
        };
        const token = signJwtToken(payload);
        const sanitizedAdmin = SEND_SANITIZED_SUCCESS_RESPONSE(admin);
        return sendSuccessResponse(res, 201, true, 'Admin created successfully', 'admin', { admin: sanitizedAdmin, token });
    } catch (error) {
        next(error);
    }
};
export default signup;
