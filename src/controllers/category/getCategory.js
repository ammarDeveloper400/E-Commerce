import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";

const getCategory = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        if (!id) throw new ApiError("validation error", 400, "id is required", true);
        const category = await Category.findById(id);
        if (!category) throw new ApiError("Db error", 400, "category not found", true);
        return sendSuccessResponse(res, 200, true, "category fetched successfully", "category", category);
    } catch (error) {
        next(error);
    }
};
export default getCategory;
