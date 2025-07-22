import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";

const addCategory = async (req, res, next) => {
    try {
        const { body: { name, image } } = req;
        if (!name || !image) throw new ApiError("validation error", 400, "name and image is required", true);
        const isAlreadyExists = await Category.findOne({ name });
        if (isAlreadyExists) throw new ApiError("validation error", 400, "category already exists with this name", true);
        const category = await Category.create({ name, image });
        if (!category) throw new ApiError("Db error", 400, "category not created", true);
        return sendSuccessResponse(res, 201, true, "category created successfully", "category", category);
    } catch (error) {
        next(error);
    }
};
export default addCategory;
