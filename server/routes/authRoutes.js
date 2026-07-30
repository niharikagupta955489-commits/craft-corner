import express from "express";

import {

  register,

  login,

  getAllUsers,

  deleteUser,

  getProfile,

  updateProfile

} from "../controllers/authController.js";


import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();



// Authentication

router.post(
  "/register",
  register
);


router.post(
  "/login",
  login
);



// Admin Users

router.get(
  "/users",
  getAllUsers
);


router.delete(
  "/users/:id",
  deleteUser
);



// User Profile

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



export default router;