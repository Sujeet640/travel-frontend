import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../Context/ContextApi";

export default function Signup() {
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
    agree: false,
  });

  let handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  let signupForm = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.conPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agree) {
      setError("please select checkbox.");
      return;
    }

    setLoading(true);

    try {
      setError(false);
      setLoading(true);

      const res = await axios.post(
        "https://travel-backend-vert.vercel.app/api/user/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Show backend success message
      alert(res.data.message || "Signup successful!");

      // 🔹 Correct redirect in React Router v6
      navigate("/verify-info");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };


  
    useEffect(() => {
      if (token) {
        navigate("/"); // or homepage
      }
    }, [token, navigate]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center px-4 py-12 bg-[#f9f9f9]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-7">
          <h2 className="text-3xl font-bold text-center text-[#8B174E] mb-2">
            Create Your Account
          </h2>

          <p className="text-center text-[#655b5b] mb-8 text-sm">
            Join us to explore beautiful destinations and plan your next
            journey.
          </p>

          <form onSubmit={signupForm} className="space-y-5">
            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#655b5b] font-semibold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="conPassword"
                value={formData.conPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B174E] outline-none"
              />
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5 text-pink-600 rounded border-gray-300"
              />
              <label htmlFor="terms" className="ml-2 text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-pink-600 ">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-pink-600 ">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-center mb-3 font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B174E] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#6f123e] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="mr-2 cursor-pointer"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[#655b5b] mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#8B174E] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
