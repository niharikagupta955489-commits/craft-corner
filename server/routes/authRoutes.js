import express from "express";

import {
  register,
  login,
  googleLogin,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile,
  uploadProfilePhoto
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();


// ===============================
// AUTH
// ===============================

router.post("/register", register);

router.post("/login", login);

router.post("/google", googleLogin);


// ===============================
// USERS
// ===============================

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);


// ===============================
// PROFILE
// ===============================

router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);


// ===============================
// PROFILE PHOTO
// ===============================

router.put(
  "/profile/photo",
  protect,
  upload.single("avatar"),
  uploadProfilePhoto
);


export default router;