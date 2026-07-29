import express from "express";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();


// Place Order
router.post("/", protect, placeOrder);


// User Orders
router.get("/user/:userId", protect, getMyOrders);


// Admin All Orders
router.get("/", protect, isAdmin, getAllOrders);

// Admin Single Order Details
router.get(
  "/:id",
  protect,
  isAdmin,
  getSingleOrder
);


// Admin Update Order Status
router.put("/:id", protect, isAdmin, updateOrderStatus);


export default router;