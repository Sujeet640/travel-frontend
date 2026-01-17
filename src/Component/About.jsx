import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="w-full bg-[#b05e3866] text-[#8B174E]  py-32 px-6 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg text-center">
          About Us
        </h1>
        <p className="max-w-3xl text-center text-lg text-[#655b5b] mt-4">
          A modern travel platform designed to help you explore India with
          beautifully curated destinations, categories, and smooth user
          experience.
        </p>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-white px-6 py-20 flex flex-col items-center">

        <p className="max-w-4xl text-center text-[#655b5b] text-lg mb-16 leading-relaxed">
          From tranquil beaches to breathtaking mountains and modern cities,
          our mission is to bring the rich diversity of India closer to you.
          Built with premium UI, smooth navigation, and category-based browsing,
          our platform empowers travelers to find the perfect destination.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">

          {/* Card */}
          <div className="p-8 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-[#b05e3866] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-3">
              Who We Are
            </h2>
            <p className="text-[#655b5b] leading-relaxed">
              A passionate team of developers and travel lovers dedicated to
              crafting a beautiful and easy-to-use travel discovery experience.
            </p>
          </div>

          {/* Card */}
          <div className="p-8 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-[#b05e3866] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-3">
              What We Do
            </h2>
            <p className="text-[#655b5b] leading-relaxed">
              We simplify travel planning with curated destination lists,
              category filters, imagery, and a premium-feeling modern UI.
            </p>
          </div>

          {/* Card */}
          <div className="p-8 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-[#b05e3866] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-3">
              Our Vision
            </h2>
            <p className="text-[#655b5b] leading-relaxed">
              To become one of the best Indian travel platforms with clean UI,
              powerful filtering, and smooth user experience.
            </p>
          </div>

          {/* Card */}
          <div className="p-8 rounded-2xl shadow-xl border border-[#8B174E]/20 bg-[#b05e3866] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold text-[#8B174E] mb-3">
              Our Promise
            </h2>
            <p className="text-[#655b5b] leading-relaxed">
              We deliver accuracy, fast performance, and a premium feel across
              every page — letting your travel journey begin beautifully.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center max-w-3xl">
          <h3 className="text-4xl font-bold text-[#8B174E] mb-4">
            Ready to Explore India?
          </h3>
          <p className="text-[#655b5b] text-lg mb-6">
            Discover amazing destinations, explore categories, and start your
            travel journey with confidence.
          </p>

          <Link
            to="/destination"
            className="px-8 py-3 bg-[#8B174E] text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 font-medium"
          >
            Start Exploring
          </Link>
        </div>
      </div>

      <Footer/>
    </>
  );
}
