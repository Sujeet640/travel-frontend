import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import axios from "axios";
import { AuthContext } from "../Context/ContextApi";

export default function VerifyOtp() {
  const { userId } = useParams(); // Get userId from route
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter OTP.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `https://travel-backend-vert.vercel.app/api/user/verify-otp`,
        { userId, otp }
      );
      alert(res.data.message);
      login(res.data.token);

      // Redirect after successful verification
      navigate("/"); // or any page you want
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid OTP.");
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  let handleResendOtp =async() => {
    const res = await axios.post(
        `https://travel-backend-vert.vercel.app/api/user/resend-otp`,
        { userId, otp }
      );
      alert(res.data.message);
      login(res.data.token);
      if (res.ok) {
        setResendTimer(60);
        setCanResend(false);
      }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center px-4 py-12 bg-[#f9f9f9] min-h-screen">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-[#8B174E] mb-2">
            OTP Verification
          </h2>
          <p className="text-center text-[#655b5b] mb-8 text-sm">
            Enter the OTP sent to your email to complete login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-center mb-3 font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B174E] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#6f123e] transition-all"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={handleResendOtp}
              disabled={!canResend || loading}
              className="text-indigo-600 font-medium hover:underline disabled:text-gray-400"
            >
              {canResend ? "Resend OTP" : `Resend OTP in ${resendTimer}s`}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
