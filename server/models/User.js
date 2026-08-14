import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: false,
        default: null,
      },

      authProvider: {
        type: String,

        enum: [
          "local",
          "google",
        ],

        default: "local",
      },

      googleId: {
        type: String,
        default: "",
        index: true,
      },

      phone: {
        type: String,
        default: "",
      },

      avatar: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      role: {
        type: String,

        enum: [
          "user",
          "admin",
          "superadmin",
        ],

        default: "user",
      },

      permissions: {
        type: [String],
        default: [],
      },

      isVerified: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);