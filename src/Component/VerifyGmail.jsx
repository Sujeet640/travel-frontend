import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyGmail() {
  const { userId, token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `https://travel-backend-vert.vercel.app/api/user/verify-gmail/${userId}/${token}`
        );

        setMessage(res.data.message || "Email verified successfully!");
        setStatus("success");

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        setStatus("error");
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Verification failed. Please try again.");
        }
      }
    };

    verifyToken();
  }, [userId, token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white w-[350px] text-center p-8 rounded-xl shadow-xl shadow-pink-300">
        
        {/* Loading Spinner */}
        {status === "loading" && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <h2
          className={`text-xl font-semibold ${
            status === "success" ? "text-pink-600" : status === "error" ? "text-red-600" : "text-gray-700"
          }`}
        >
          {message}
        </h2>

        {status === "success" && (
          <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
        )}

      </div>
    </div>
  );
}
