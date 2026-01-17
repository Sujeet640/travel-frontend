import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../Context/ContextApi";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); // or homepage
    }
  }, [token, navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loginForm = async (event) => {
    event.preventDefault();

    if (!formData.agree) {
      setError("Please select the checkbox.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://travel-backend-vert.vercel.app/api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      // Show backend message
      alert(res.data.message);

      // Redirect to OTP verification
      navigate(`/verify-otp/${res.data.userId}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Something went wrong!");
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center px-4 py-12 bg-[#f9f9f9] min-h-screen">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-[#8B174E] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-[#655b5b] mb-8 text-sm">
            Log in to continue exploring and planning your travels.
          </p>

          <form onSubmit={loginForm} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-5 h-5 text-pink-600 rounded border-gray-300"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="text-pink-600 underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-center mb-3 font-semibold">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B174E] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#6f123e] transition-all"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="mr-2 animate-spin"
                  />
                  Logging In...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                  Log In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#655b5b] mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#8B174E] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
