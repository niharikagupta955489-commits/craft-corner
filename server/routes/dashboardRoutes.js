import express from "express";

import {
  protect,
  checkPermission,
} from "../middleware/authMiddleware.js";

import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  checkPermission("Dashboard"),
  getDashboardStats
);

export default router;