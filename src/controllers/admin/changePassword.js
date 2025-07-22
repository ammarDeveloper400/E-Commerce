import bcrypt from "bcrypt";
import AdminUser from "../../models/adminUser.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";
const changePassword = async (req, res, next) => {
    try {
        const { body: { currentPassword, password: Pass, confirmPassword }, user: { _id, password } } = req;
        const isPasswordMatch = bcrypt.compare(currentPassword, password);
        if (!isPasswordMatch) throw new ApiError("Invalid Details", 400, "Current Password is Invalid", true);
        const updateAdmin = await AdminUser.updateOne({ _id }, { $set: { password: Pass } });
        if (!updateAdmin.modifiedCount) throw new ApiError("Db Error", 400, "password is not updated")
        return sendSuccessResponse(res, 400, true, "password change successfully", "changePassword");
    } catch (error) {
        next(error);
    }
}
export default changePassword;
