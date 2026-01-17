import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

export default function Contact() {
  return (
    <>
      <Header />

      {/* Hero Section - Adjusted to stick to header */}
      <div className="w-full bg-[#b05e3866] py-32 px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-[#8B174E]">Contact Us</h1>
        <p className="max-w-2xl text-[#655b5b] text-lg mt-4">
          Have questions, feedback, or collaboration ideas? We're here to help
          you plan your next unforgettable journey.
        </p>
      </div>

      {/* Main Section */}
      <div className="bg-white min-h-screen py-16 px-6 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
          {/* Contact Info */}
          <div className="p-10 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-[#b05e3866]">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-5">
              Get In Touch
            </h2>

            <p className="text-[#655b5b] mb-6 leading-relaxed">
              Whether you're looking for travel guidance, support with our
              platform, or want to work with us — feel free to reach out. We
              usually respond within 24 hours.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#8B174E] text-lg">Email</h3>
                <p className="text-[#655b5b]">support@travelindia.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#8B174E] text-lg">Phone</h3>
                <p className="text-[#655b5b]">+91 98765 43210</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#8B174E] text-lg">
                  Address
                </h3>
                <p className="text-[#655b5b]">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-white">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-5">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-[#8B174E] font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-[#8B174E]/30 rounded-lg focus:outline-none focus:ring focus:ring-[#8B174E]/40"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[#8B174E] font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-[#8B174E]/30 rounded-lg focus:outline-none focus:ring focus:ring-[#8B174E]/40"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[#8B174E] font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full p-3 border border-[#8B174E]/30 rounded-lg focus:outline-none focus:ring focus:ring-[#8B174E]/40"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B174E] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}
