import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";

import "../styles/logincard.css";
import google from "../assets/google.png";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/auth/login",
        formData
      );

      login(data.user, data.token);

      toast.success(data.message);

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="right-panel">
      <div className="glass-card">

        <div className="leaf-circle">
          <FaLeaf />
        </div>

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue your handmade journey
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}

            <FaArrowRight />
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          <img
            src={google}
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="signup">
          Don't have an account?

          <Link to="/register">
            Sign Up
          </Link>

        </div>

      </div>
    </div>
  );
};

export default LoginCard;