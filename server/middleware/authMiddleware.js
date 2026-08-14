import jwt from "jsonwebtoken";
import User from "../models/User.js";


// =====================================================
// PROTECT
// =====================================================

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.error(
      "AUTH ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};


// =====================================================
// ADMIN
// =====================================================

export const isAdmin = (
  req,
  res,
  next
) => {

  if (
    !req.user ||
    ![
      "admin",
      "superadmin",
    ].includes(req.user.role)
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Admin only.",
    });
  }

  next();
};


// =====================================================
// SUPER ADMIN
// =====================================================

export const isSuperAdmin = (
  req,
  res,
  next
) => {

  if (
    !req.user ||
    req.user.role !== "superadmin"
  ) {
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Super Admin only.",
    });
  }

  next();
};


// =====================================================
// PERMISSION CHECK
// =====================================================

export const checkPermission = (
  permission
) => {

  return (
    req,
    res,
    next
  ) => {

    // Superadmin has all permissions
    if (
      req.user?.role ===
      "superadmin"
    ) {
      return next();
    }

    // Admin must have permission
    if (
      req.user?.role === "admin" &&
      Array.isArray(
        req.user.permissions
      ) &&
      req.user.permissions.includes(
        permission
      )
    ) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message:
        `Access denied. ${permission} permission required.`,
    });
  };
};