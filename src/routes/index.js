import express from "express";
import welcome from "./welcome.js";
import admin from "./admin.js";
import category from "./category.js";

const router = express.Router();

router.use("/welcome", welcome);
router.use("/admin/", admin);
router.use("/category", category);

export default router;