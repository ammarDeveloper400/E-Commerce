import express from "express";
import AdminUser from "../models/adminUser.js";
import { addCategory, updateCategory, getCategory, getCategories, deleteCategory } from "../controllers/category/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware(AdminUser), addCategory);
router.put("/update/:id", authMiddleware(AdminUser), updateCategory);
router.get("/get/:id", getCategory);
router.get("/get", getCategories);
router.delete("/delete/:id", authMiddleware(AdminUser), deleteCategory);

export default router;
