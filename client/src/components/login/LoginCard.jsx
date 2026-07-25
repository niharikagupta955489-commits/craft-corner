

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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

import toast from "react-hot-toast";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
  email: "",
  password: "",
});
  const [showPassword, setShowPassword] = useState(false);

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

    const { data } = await api.post("/auth/login", formData);

    login(data.user, data.token);

    toast.success(data.message);

    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (data.success) {
        login(data.user, data.token);

        alert("Login Successful");

        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
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

        <p>Sign in to continue your handmade journey</p>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
value={formData.email}
onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
value={formData.password}
onChange={handleChange}
            />

            <button
              type="submit"
disabled={loading ? "Logging In..." : "Login"}
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
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

const navigate = useNavigate();
const { login } = useAuth();

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  email: "",
  password: "",
});