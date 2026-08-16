import express from "express";

import {
  getProductReviews,
  createProductReview,
  deleteOwnReview,
  getAllReviews,
  deleteReviewByAdmin,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();


// Public
// Get all reviews of a product
router.get(
  "/:productId",
  getProductReviews
);


// Customer
// Add review
router.post(
  "/:productId",
  protect,
  createProductReview
);


// Customer/Admin
// Delete review
router.delete(
  "/:productId/:reviewId",
  protect,
  deleteOwnReview
);


// Admin
// Get all reviews
router.get(
  "/admin/all",
  protect,
  isAdmin,
  getAllReviews
);


// Admin
// Delete any review
router.delete(
  "/admin/:reviewId",
  protect,
  isAdmin,
  deleteReviewByAdmin
);


export default router;