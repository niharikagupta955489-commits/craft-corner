import express from "express";

import {
  protect,
  checkPermission,
} from "../middleware/authMiddleware.js";

import { getDashboardStats } from "../controllers/adminV2Controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  checkPermission("Dashboard"),
  getDashboardStats
);

export default router;