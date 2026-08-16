import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email:
            formData.email
              .trim()
              .toLowerCase(),

          password:
            formData.password,
        }
      );

      const data =
        response.data;

      if (!data.success) {
        toast.error(
          data.message ||
            "Login Failed"
        );

        return;
      }

      login(
        data.user,
        data.token
      );

      toast.success(
        data.message ||
          "Login Successful"
      );

      navigate("/");

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleResponse =
    async (response) => {

      try {

        setGoogleLoading(true);

        const credential =
          response?.credential;

        if (!credential) {
          toast.error(
            "Google login failed"
          );

          return;
        }

        const result =
          await axios.post(
            `${API_URL}/auth/google`,
            {
              credential,
            }
          );

        const data =
          result.data;

        if (!data.success) {
          toast.error(
            data.message ||
              "Google Login Failed"
          );

          return;
        }

        login(
          data.user,
          data.token
        );

        toast.success(
          data.message ||
            "Google Login Successful"
        );

        navigate("/");

      } catch (error) {

        console.error(
          "Google Login Error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Google Login Failed"
        );

      } finally {

        setGoogleLoading(false);

      }
    };


  // =====================================================
  // LOAD GOOGLE LOGIN
  // =====================================================

  useEffect(() => {

    if (!GOOGLE_CLIENT_ID) {
      console.error(
        "VITE_GOOGLE_CLIENT_ID is missing"
      );

      return;
    }


    const initializeGoogle =
      () => {

        if (
          !window.google ||
          !window.google.accounts
        ) {
          return;
        }

        if (
          !googleButtonRef.current
        ) {
          return;
        }


        window.google.accounts.id.initialize({
          client_id:
            GOOGLE_CLIENT_ID,

          callback:
            handleGoogleResponse,

          auto_select: false,

          cancel_on_tap_outside:
            true,
        });


        googleButtonRef.current.innerHTML =
          "";


        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: "outline",

            size: "large",

            width: 420,

            text: "continue_with",

            shape: "rectangular",

            logo_alignment:
              "left",
          }
        );
      };


    if (window.google) {

      initializeGoogle();

      return;

    }


    const script =
      document.createElement(
        "script"
      );

    script.src =
      "https://accounts.google.com/gsi/client";

    script.async = true;

    script.defer = true;

    script.onload =
      initializeGoogle;

    document.head.appendChild(
      script
    );


    return () => {

      script.onload = null;

    };

  }, []);


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="right-panel">

      <div className="glass-card">

        <div className="leaf-circle">
          <FaLeaf />
        </div>


        <h1>
          Welcome Back
        </h1>


        <p>
          Sign in to continue
          your handmade journey
        </p>


        {/* ================= LOGIN FORM ================= */}

        <form
          onSubmit={
            handleLogin
          }
        >

          {/* EMAIL */}

          <div className="input-box">

            <FaEnvelope
              className="input-icon"
            />

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              autoComplete="email"
            />

          </div>


          {/* PASSWORD */}

          <div className="input-box">

            <FaLock
              className="input-icon"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              autoComplete="current-password"
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


          {/* OPTIONS */}

          <div className="login-options">

            <label>

              <input
                type="checkbox"
              />

              Remember Me

            </label>


            <Link
              to="/forgot-password"
            >
              Forgot Password?
            </Link>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Logging In..."
              : "Login"}

            {!loading && (
              <FaArrowRight />
            )}

          </button>

        </form>


        {/* ================= DIVIDER ================= */}

        <div className="divider">

          <span>
            OR
          </span>

        </div>


        {/* ================= GOOGLE ================= */}

        <div
          className="google-login-wrapper"
          style={{
            width: "100%",
            display: "flex",
            justifyContent:
              "center",
            marginTop: "10px",
          }}
        >

          <div
            ref={
              googleButtonRef
            }
            style={{
              minHeight:
                "44px",
            }}
          />

        </div>


        {/* ================= SIGN UP ================= */}

        <div className="signup">

          Don't have an account?

          <Link
            to="/register"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
};

export default LoginCard;