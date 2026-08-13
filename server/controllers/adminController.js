import bcrypt from "bcryptjs";
import User from "../models/User.js";

const ALL_PERMISSIONS = [
  "Dashboard",
  "Products",
  "Orders",
  "Customers",
  "Categories",
  "Admin Management",
];

// Convert frontend role into database role
const normalizeRole = (role) => {
  const value = String(role || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  if (value === "superadmin") {
    return "superadmin";
  }

  return "admin";
};

// Convert database role into frontend role
const displayRole = (role) => {
  if (role === "superadmin") {
    return "Super Admin";
  }

  return "Admin";
};


// =====================================================
// CREATE ADMIN
// =====================================================

export const createAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      permissions,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const finalRole = normalizeRole(role);

    const finalPermissions =
      finalRole === "superadmin"
        ? ALL_PERMISSIONS
        : Array.isArray(permissions)
        ? permissions
        : [];

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: finalRole,
      permissions: finalPermissions,
    });

    const adminResponse = admin.toObject();

    delete adminResponse.password;

    adminResponse.role = displayRole(adminResponse.role);

    res.status(201).json({
      success: true,
      message: "Admin Created Successfully",
      admin: adminResponse,
    });

  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL ADMINS
// =====================================================

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find(
      {
        role: {
          $in: ["admin", "superadmin"],
        },
      },
      "-password"
    ).sort({
      createdAt: -1,
    });

    const formattedAdmins = admins.map((admin) => {
      const data = admin.toObject();

      return {
        ...data,

        role: displayRole(data.role),

        permissions:
          data.role === "superadmin"
            ? ALL_PERMISSIONS
            : data.permissions || [],
      };
    });

    res.status(200).json({
      success: true,
      admins: formattedAdmins,
    });

  } catch (error) {
    console.error("GET ADMINS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// UPDATE ADMIN
// =====================================================

export const updateAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!["admin", "superadmin"].includes(admin.role)) {
      return res.status(400).json({
        success: false,
        message: "Selected user is not an administrator",
      });
    }

    const {
      name,
      email,
      phone,
      role,
      permissions,
    } = req.body;

    const finalRole = normalizeRole(role);

    admin.name = name ?? admin.name;
    admin.email = email ?? admin.email;
    admin.phone = phone ?? admin.phone;

    admin.role = finalRole;

    if (finalRole === "superadmin") {
      admin.permissions = ALL_PERMISSIONS;
    } else {
      admin.permissions = Array.isArray(permissions)
        ? permissions
        : [];
    }

    await admin.save();

    const adminResponse = admin.toObject();

    delete adminResponse.password;

    adminResponse.role = displayRole(adminResponse.role);

    adminResponse.permissions =
      admin.role === "superadmin"
        ? ALL_PERMISSIONS
        : admin.permissions;

    res.status(200).json({
      success: true,
      message: "Admin Updated Successfully",
      admin: adminResponse,
    });

  } catch (error) {
    console.error("UPDATE ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE ADMIN
// =====================================================

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!["admin", "superadmin"].includes(admin.role)) {
      return res.status(400).json({
        success: false,
        message: "This user is not an administrator",
      });
    }

    // Prevent deleting yourself
    if (
      req.user &&
      req.user.id &&
      req.user.id.toString() === admin._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin Deleted Successfully",
    });

  } catch (error) {
    console.error("DELETE ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};