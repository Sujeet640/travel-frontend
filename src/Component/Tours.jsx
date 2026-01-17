import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
import khajuraho from "../Image/khajuraho.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function Tours() {
  let [viewAllTours, setViewAllTours] = useState([]);

  useEffect(() => {
    let fetchAllTours = () => {
      axios
        .get(`https://travel-backend-vert.vercel.app/api/tours/view-tour`)
        .then((res) => res.data.tours)
        .then((final) => {
          setViewAllTours(final);
        });
    };

    fetchAllTours();
  }, []);

  return (
    <>
      <Header />
      <section className="  w-full">
        <div className="max-w-[1320px] mx-auto lg:py-[50px] p-[20px] ">
          <div className="mb-[50px]">
            <p className="text-pink-400 text-[17px] font-semibold  mb-4">
              <Link to="/">Home</Link> {" / "}
              Tours
            </p>
            <p className="text-gray-500 text-[17px] font-semibold ">
              Explore experiences, spas, tours and more
            </p>
            <p className="mt-10 text-gray-500 text-[17px] font-semibold ">
              Explore our curated India tours, offering personalized
              itineraries, cultural experiences, and unforgettable adventures
              across the country’s diverse landscapes.
            </p>
          </div>
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 p-6 bg-gray-50">
            {viewAllTours.length > 0
              ? viewAllTours.map((v, i) => {
                  return <AllTours key={i} value={v} />;
                })
              : ""}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

let AllTours = ({ value }) => {
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const slug = `${value.duration}-days-${slugify(value.tourName)}`;
  const tourUrl = `/tour-details/${value._id}/${slug}`;

  const days = Number(value.duration);
  const nights = days > 0 ? days - 1 : 0;

  return (
    <>
      {/* Card */}
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
        {/* Image Section */}
        <div className="relative w-full h-[280px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={value.tourImage}
            alt={value.tourImage}
            className="w-full h-full  object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Tag Badge */}
          <div className="absolute top-3 left-3 bg-[#D12C79] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            On Sale
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          {/* Title Section */}
          <div className="mb-4">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
              {value.tourName}
            </h3>
            <p className="text-sm text-gray-600">
              {days} Day India Wildlife Tour
            </p>
          </div>

          {/* Rating */}
          <div className="flex justify-end items-center text-gray-500 text-sm mb-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
            <span>0 (0 reviews)</span>
          </div>

          {/* Price Section */}
          {/* <div className="border-t border-gray-200 pt-3 mb-4">
            <div className="flex flex-wrap items-center justify-between mb-1">
              <p className="text-sm text-gray-400 line-through">₹22,500.00</p>
              <p className="text-[16px] font-semibold text-[#D12C79]">
                 {nights} Nights / {days} Days
              </p>
            </div>
            <p className="text-gray-700">
              <span className="text-sm text-gray-500">From </span>
              <span className="text-lg font-bold text-[#2E2E2E]">
                ₹21,000.00
              </span>
            </p>
          </div> */}

          <div className="border-t pt-3 mb-4 flex justify-between items-center">
            <p className="text-gray-700">
              From{" "}
              <span className="font-bold text-[#2E2E2E]">₹{value.price}</span>
            </p>
            <p className="text-[#D12C79] font-semibold">
              {nights} Nights / {days} Days
            </p>
          </div>

          {/* Button Section */}
          <div className="flex justify-between items-center gap-3 mt-auto">
            <button className="w-1/2 border-2 border-[#D12C79] text-[#D12C79] font-semibold py-2 rounded-lg text-sm lg:text-base transition-all duration-300 hover:bg-[#D12C79] hover:text-white">
              Call Now
            </button>
            <Link className="w-1/2" to={tourUrl}>
              <button className=" w-full bg-[#D12C79] text-white font-semibold py-2 rounded-lg text-sm lg:text-base transition-all duration-300 hover:bg-[#b01f66]">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
