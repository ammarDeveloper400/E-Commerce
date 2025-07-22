import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import sendSuccessResponse from "../../utils/responses/sendSuccessResponse.js";

const getCategories = async (req, res, next) => {
    try {
        const { query: { page, limit, name } } = req;
        const pageNo = parseInt(page) || 1;
        const limitNo = parseInt(limit) || 10;
        const skip = (pageNo - 1) * limitNo;
        const query = name ? { name: { $regex: name, $options: "i" } } : {};
        const categories = await Category.find(query).skip(skip).limit(limitNo).sort({ createdAt: -1 });
        if (!categories.length) throw new ApiError("Db error", 400, "categories not found", true);
        const totalCategories = await Category.countDocuments(query);
        return sendSuccessResponse(res, 200, true, "categories fetched successfully", "categories", { categories, totalPages: Math.ceil(totalCategories / limitNo), totalCategories, currentPage: pageNo });
    } catch (error) {
        next(error);
    }
};
export default getCategories;
