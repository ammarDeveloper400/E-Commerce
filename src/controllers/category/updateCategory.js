import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";

const updateCategory = async (req, res, next) => {
    try {
        const { params: { id }, body: { name, image } } = req;
        if (!id) throw new ApiError("validation error", 400, "id is required", true);
        if (!name && !image) throw new ApiError("validation error", 400, "name or image is required", true);
        // check category exists with this id and name is unique or not
        const category = await Category.findById(id);
        if (!category) throw new ApiError("Db error", 400, "category not found", true);
        const isAlreadyExists = await Category.findOne({ name, _id: { $ne: id } });
        if (isAlreadyExists) throw new ApiError("validation error", 400, "category already exists with this name", true);
        const updateCategory = await Category.updateOne({ _id: id }, { $set: { name, image } });
        if (!updateCategory.modifiedCount) throw new ApiError("Db error", 400, "category not updated", true);
        return sendSuccessResponse(res, 200, true, "category updated successfully", "category", category);
    } catch (error) {
        next(error);
    }
};
export default updateCategory;
