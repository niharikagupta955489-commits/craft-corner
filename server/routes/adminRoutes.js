import express from "express";

import {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

import {
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  isAdmin,
  createAdmin
);

router.get(
  "/all",
  protect,
  isAdmin,
  getAdmins
);

router.put(
  "/:id",
  protect,
  isAdmin,
  updateAdmin
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteAdmin
);

export default router;