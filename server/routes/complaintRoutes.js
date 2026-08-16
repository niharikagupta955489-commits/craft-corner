import express from "express";

import {
  createComplaint,
  getAllComplaints,
  getSingleComplaint,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();


// =====================================================
// CUSTOMER CONTACT FORM
// POST /api/complaints
// =====================================================

router.post("/", createComplaint);


// =====================================================
// ADMIN COMPLAINTS
// =====================================================

// Get all complaints
router.get(
  "/",
  protect,
  isAdmin,
  getAllComplaints
);


// Get single complaint
router.get(
  "/:id",
  protect,
  isAdmin,
  getSingleComplaint
);


// Update status
router.put(
  "/:id",
  protect,
  isAdmin,
  updateComplaintStatus
);


// Delete complaint
router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteComplaint
);


export default router;