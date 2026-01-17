import React from "react";
import khajuraho from "../Image/khajuraho.webp";
import Citypalace from "../Image/Citypalace.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PopularTour() {
  return (
    <section className="w-full lg:py-[60px] p-[15px] ">
      <div className="max-w-[1320px] mx-auto   ">
        <div className="mb-[25px]">
          <p className=" text-[#8B174E] lg:text-[30px] lg:font-bold text-[17px] font-semibold ">
            Popular India
            <span className="text-[#D12C79] "> Tour Packages</span>
          </p>
          <div className="mt-2  lg:w-[400px]  h-1 bg-[#32547e] rounded" />
        </div>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 p-6 bg-gray-50">
          {/* Card */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
            {/* Image Section */}
            <div className="relative w-full h-[280px] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={khajuraho}
                alt="Khajuraho Tour"
                className="w-full h-full  object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 bg-[#D12C79] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Wildlife
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col justify-between flex-grow">
              {/* Title Section */}
              <div className="mb-4">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
                  Jim Corbett
                </h3>
                <p className="text-sm text-gray-600">
                  21 Days India Wildlife Tour
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-end items-center text-gray-500 text-sm mb-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mr-1"
                />
                <span>0 (0 reviews)</span>
              </div>

              {/* Price Section */}
              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex flex-wrap items-center justify-between mb-1">
                  <p className="text-sm text-gray-400 line-through">
                    ₹22,500.00
                  </p>
                  <p className="text-[16px] font-semibold text-[#D12C79]">
                    20 Nights / 21 Days
                  </p>
                </div>
                <p className="text-gray-700">
                  <span className="text-sm text-gray-500">From </span>
                  <span className="text-lg font-bold text-[#2E2E2E]">
                    ₹21,000.00
                  </span>
                </p>
              </div>

              {/* Button Section */}
              <div className="flex justify-between items-center gap-3 mt-auto">
                <button className="w-1/2 border-2 border-[#D12C79] text-[#D12C79] font-semibold py-2 rounded-lg text-sm lg:text-base transition-all duration-300 hover:bg-[#D12C79] hover:text-white">
                  Call Now
                </button>
                <button className="w-1/2 bg-[#D12C79] text-white font-semibold py-2 rounded-lg text-sm lg:text-base transition-all duration-300 hover:bg-[#b01f66]">
                  Read More
                </button>
              </div>
            </div>
          </div>
          
        </div>

        <div
          className="h-[350px] bg-center bg-cover mt-[50px] rounded-[20px] "
          style={{ backgroundImage: `url(${Citypalace})  ` }}
        >
          <div className="text-center w-full bg-[#26070782] h-full rounded-[20px] ">
            <h1 className="pt-[50px] lg:text-[40px] lg:leading-[55px] text-[20px] leading-[30px] mb-4 lg:mb-0  font-bold text-white ">
              Book Your India Tour Package Now
            </h1>
            <p className="lg:text-[30px] text-[20px] font-bold text-white">
              Get Customised Tour Itinerary
            </p>
            <Link to={'/tours'}>
            
            <button  className="bg-[#D12C79] mt-10 lg:py-3 py-1.5 lg:px-10 px-3 border-2 border-white lg:text-[24px] text-[18px] font-semibold rounded-[10px] text-white transition-all hover:-translate-y-2 duration-300 hover:border-yellow-500 hover:bg-black hover:text-yellow-500 ease-in-out  ">
              JOIN NOW
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
