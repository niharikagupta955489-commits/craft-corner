import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";

const googleClient = new OAuth2Client();


// =====================================================
// CREATE JWT
// =====================================================

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// =====================================================
// PUBLIC USER DATA
// =====================================================

const publicUser = (user) => {
  return {
    id: user._id,
    _id: user._id,

    name: user.name,
    email: user.email,

    phone: user.phone || "",
    address: user.address || "",
    avatar: user.avatar || "",

    role: user.role || "user",

    permissions: user.permissions || [],

    isVerified: !!user.isVerified,
  };
};


// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name: name.trim(),

        email: normalizedEmail,

        password:
          hashedPassword,

        phone: phone || "",

        authProvider:
          "local",

        isVerified: false,

        role: "user",

        permissions: [],
      });

    return res.status(201).json({
      success: true,

      message:
        "Registration Successful",

      user:
        publicUser(user),
    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};


// =====================================================
// LOGIN
// =====================================================

export const login = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    // Google-only account
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Sign-In. Please continue with Google.",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid password",
      });
    }

    const token =
      createToken(user);

    return res.json({
      success: true,

      message:
        "Login Successful",

      token,

      user:
        publicUser(user),
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};


// =====================================================
// GOOGLE LOGIN
// =====================================================

export const googleLogin = async (
  req,
  res
) => {
  try {

    const {
      credential,
    } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message:
          "Google credential is required",
      });
    }

    if (
      !process.env.GOOGLE_CLIENT_ID
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Google login is not configured on the server",
      });
    }

    // Verify Google ID token
    const ticket =
      await googleClient.verifyIdToken({
        idToken: credential,

        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Google token",
      });
    }

    const {
      sub,
      email,
      email_verified,
      name,
      picture,
    } = payload;

    if (
      !sub ||
      !email ||
      !email_verified
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid or unverified Google account",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    let user =
      await User.findOne({
        email: normalizedEmail,
      });


    // =================================================
    // NEW GOOGLE USER
    // =================================================

    if (!user) {

      user =
        await User.create({

          name:
            name ||
            normalizedEmail.split("@")[0],

          email:
            normalizedEmail,

          password: null,

          phone: "",

          avatar:
            picture || "",

          address: "",

          authProvider:
            "google",

          googleId:
            sub,

          isVerified: true,

          role: "user",

          permissions: [],
        });

    }


    // =================================================
    // EXISTING USER
    // =================================================

    else {

      // Don't allow another Google account
      // to take over an already linked account.

      if (
        user.googleId &&
        user.googleId !== sub
      ) {
        return res.status(409).json({
          success: false,
          message:
            "This email is linked to a different Google account",
        });
      }

      // Link Google account
      user.googleId =
        sub;

      // IMPORTANT:
      // Existing role is NOT changed.
      //
      // admin remains admin
      // superadmin remains superadmin
      // user remains user

      if (
        !user.authProvider
      ) {
        user.authProvider =
          user.password
            ? "local"
            : "google";
      }

      if (
        !user.avatar &&
        picture
      ) {
        user.avatar =
          picture;
      }

      user.isVerified =
        true;

      await user.save();
    }

    const token =
      createToken(user);

    return res.json({
      success: true,

      message:
        "Google Login Successful",

      token,

      user:
        publicUser(user),
    });

  } catch (error) {

    console.error(
      "Google Login Error:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Google authentication failed",
    });
  }
};


// =====================================================
// GET ALL USERS
// =====================================================

export const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      return res.json({
        success: true,
        users,
      });

    } catch (error) {

      console.error(
        "Get Users Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// =====================================================
// DELETE USER
// =====================================================

export const deleteUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      await user.deleteOne();

      return res.json({
        success: true,
        message:
          "User deleted successfully",
      });

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// =====================================================
// GET PROFILE
// =====================================================

export const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      return res.json({
        success: true,
        user,
      });

    } catch (error) {

      console.error(
        "Get Profile Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (
        req.body.name !== undefined
      ) {
        user.name =
          req.body.name;
      }

      if (
        req.body.email !== undefined
      ) {
        user.email =
          req.body.email
            .trim()
            .toLowerCase();
      }

      if (
        req.body.phone !== undefined
      ) {
        user.phone =
          req.body.phone;
      }

      if (
        req.body.address !== undefined
      ) {
        user.address =
          req.body.address;
      }

      // Password is optional.
      // Existing password remains unchanged
      // when no new password is provided.

      if (
        req.body.password
      ) {

        user.password =
          await bcrypt.hash(
            req.body.password,
            10
          );

        user.authProvider =
          "local";
      }

      await user.save();

      return res.json({
        success: true,

        message:
          "Profile Updated Successfully",

        user:
          publicUser(user),
      });

    } catch (error) {

      console.error(
        "Update Profile Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// =====================================================
// UPLOAD PROFILE PHOTO
// =====================================================

export const uploadProfilePhoto =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload an image",
        });
      }

      // Cloudinary / upload middleware
      // should provide the final URL in req.file.path

      user.avatar =
        req.file.path;

      await user.save();

      return res.json({
        success: true,

        message:
          "Profile photo updated",

        avatar:
          user.avatar,
      });

    } catch (error) {

      console.error(
        "Profile Photo Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };