import upload from "../middleware/upload.js";
import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
} from "../controllers/productController.js";


import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";


const router = express.Router();


// Create Product
router.post("/", protect, isAdmin, upload.array("images",5), createProduct);

// Search Product
router.get("/search", searchProducts);


// Get All Products
router.get("/", getProducts);


// Category Products
router.get("/category/:category", getProductsByCategory);


// Single Product
router.get("/:id", getProductById);


// Update Product
router.put("/:id", protect, isAdmin, upload.array("images",5), updateProduct);


// Delete Product
router.delete("/:id", protect, isAdmin, deleteProduct);


export default router;