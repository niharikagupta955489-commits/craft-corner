import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getDashboardStats } from "../controllers/adminV2Controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  isAdmin,
  getDashboardStats
);

export default router;