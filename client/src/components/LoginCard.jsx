import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../services/api";

import "../styles/logincard.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleButtonRef = useRef(null);

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

      const { data } = await api.post("/auth/login", formData);

      login(data.user, data.token);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (response) => {
    if (!response?.credential) {
      toast.error("Google login failed");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/google", {
        credential: response.credential,
      });

      login(data.user, data.token);
      toast.success(data.message || "Google login successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Google login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const setupGoogle = async () => {
      if (!GOOGLE_CLIENT_ID || !googleButtonRef.current) return;

      try {
        await loadGoogleScript();

        if (cancelled || !window.google?.accounts?.id) return;

        googleButtonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: 330,
          }
        );
      } catch {
        if (!cancelled) {
          toast.error("Unable to load Google Sign-In");
        }
      }
    };

    setupGoogle();

    return () => {
      cancelled = true;
    };
  }, []);

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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

        {GOOGLE_CLIENT_ID ? (
          <div
            ref={googleButtonRef}
            className="google-signin-container"
          />
        ) : (
          <button type="button" className="google-btn" disabled>
            Continue with Google
          </button>
        )}

        <div className="signup">
          Don't have an account?
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
