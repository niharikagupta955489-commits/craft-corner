import express from "express";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import {
  protect,
  checkPermission,
} from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCategories);

// Admin + Categories permission
router.post(
  "/",
  protect,
  isAdmin,
  checkPermission("Categories"),
  createCategory
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  checkPermission("Categories"),
  deleteCategory
);

export default router;