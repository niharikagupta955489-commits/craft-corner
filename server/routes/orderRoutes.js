import express from "express";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  checkPermission,
} from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User Orders
router.post("/", protect, placeOrder);
router.get("/user/:userId", protect, getMyOrders);

// Admin Orders - Orders permission required
router.get(
  "/",
  protect,
  isAdmin,
  checkPermission("Orders"),
  getAllOrders
);

router.get(
  "/:id",
  protect,
  isAdmin,
  checkPermission("Orders"),
  getSingleOrder
);

router.put(
  "/:id",
  protect,
  isAdmin,
  checkPermission("Orders"),
  updateOrderStatus
);

export default router;