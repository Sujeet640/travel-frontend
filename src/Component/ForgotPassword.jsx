import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://travel-backend-vert.vercel.app/api/user/forget-password",
        { email }
      );

      if (res.status === 200) {
        alert(res.data.message);
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex lg:py-[100px] py-[30px] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Forgot Password?
          </h2>
          <p className="mt-2 text-gray-500 text-center">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-[20px] font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-2.5 text-white font-medium transition ${
                  loading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-[16px] text-gray-600">
                Remember your password?{" "}
                <Link to="/login" className="text-pink-600 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          ) : (
            <div className="mt-8 text-center space-y-4">
              <div className="text-green-600 font-medium">
                ✅ Password reset link sent!
              </div>
              <p className="text-gray-600 text-sm">
                Check your inbox. It may take a few minutes to arrive.
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 text-indigo-600 hover:underline text-sm"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
