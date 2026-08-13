import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
} from "../controllers/productController.js";

import {
  protect,
  checkPermission,
} from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin + Products permission
router.post(
  "/",
  protect,
  isAdmin,
  checkPermission("Products"),
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  protect,
  isAdmin,
  checkPermission("Products"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  checkPermission("Products"),
  deleteProduct
);

export default router;