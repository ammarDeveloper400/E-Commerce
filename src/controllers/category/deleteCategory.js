import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";

const deleteCategory = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        if (!id) throw new ApiError("validation error", 400, "id is required", true);
        const category = await Category.findByIdAndDelete(id);
        if (!category) throw new ApiError("Db error", 400, "category not deleted", true);
        return sendSuccessResponse(res, 200, true, "category deleted successfully", "category", category);
    } catch (error) {
        next(error);
    }
};
export default deleteCategory;
