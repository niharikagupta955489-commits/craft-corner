import express from "express";

import {
  getWishlist,
  addWishlist,
  removeWishlist
} from "../controllers/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();



// Get wishlist

router.get(
  "/",
  protect,
  getWishlist
);



// Add product to wishlist

router.post(
  "/:id",
  protect,
  addWishlist
);



// Remove product from wishlist

router.delete(
  "/:id",
  protect,
  removeWishlist
);



export default router;