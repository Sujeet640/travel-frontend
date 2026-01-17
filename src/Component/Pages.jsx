import React from "react";
import fImage from "../Image/Jaipur.jpg";
import indiaTour from "../Image/IndiaTour.webp";
import khajuraho from "../Image/khajuraho.webp";

export default function Pages() {
  return (
    <>
      <section className="w-full lg:py-[60px] p-[15px]  ">
        <div className="max-w-[1320px] mx-auto ">
          <div className="mb-[25px]">
            <p className="text-center text-[#8B174E] lg:text-[40px] lg:font-bold text-[17px] font-semibold ">
              Exclusive Offers On
              <span className="text-[#D12C79] "> India Tour Packages</span>
            </p>
            <div className="mt-2 mx-auto lg:w-[350px]  h-1 bg-[#32547e] rounded" />
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-10 px-6 py-12 bg-gray-50">
            {/* Left Section - Text */}
            <div className="space-y-5">
              <h2 className="text-[#32547e] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Enjoy Your Trips to the{" "}
                <span className="text-[#D12C79]">Fullest</span>
              </h2>
              <p className="text-gray-600 text-lg sm:text-xl max-w-md">
                Make your travel dreams a reality! Explore breathtaking
                destinations, immerse in vibrant cultures, and create
                unforgettable memories with our curated tours.
              </p>

              <button className="mt-4 bg-[#D12C79] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#b01f66] transition-all duration-300">
                Plan Your Journey
              </button>
            </div>

            {/* Right Section - Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="relative group overflow-hidden rounded-xl shadow-md">
                <img
                  src={fImage}
                  alt="Destination 1"
                  className="h-[350px] w-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="relative group overflow-hidden rounded-xl shadow-md sm:mt-10">
                <img
                  src={fImage}
                  alt="Destination 2"
                  className="h-[350px] w-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="relative group overflow-hidden rounded-xl shadow-md">
                <img
                  src={fImage}
                  alt="Destination 3"
                  className="h-[350px] w-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full lg:pt-[60px] lg:pb-[150px] p-[15px] bg-gray-100  ">
        <div className="max-w-[1320px] mx-auto ">
          <div className="mb-[25px]">
            <p className="text-center text-[#8B174E] lg:text-[40px] lg:font-bold text-[17px] font-semibold ">
              Best India
              <span className="text-[#D12C79] "> Tour Packages</span>
            </p>
            <div className="mt-2 mx-auto lg:w-[350px]  h-1 bg-[#32547e] rounded" />
          </div>

          {/* desktop */}
          <div
            className={`w-full relative h-[370px] hidden lg:block bg-center bg-cover rounded-[5px] `}
            style={{ backgroundImage: `url(${indiaTour})  ` }}
          >
            <div className="w-[90%] grid lg:grid-cols-[23%_23%_23%_23%] absolute left-1/2 -translate-x-1/2 top-[65%] gap-7">
              

              <div className="border-2 w-full bg-white p-3 rounded-[11px]  transition-all hover:shadow-lg duration-300 ease-in-out ">
                <img
                  src={khajuraho}
                  alt=""
                  className="rounded-[13px] h-[170px]  w-full"
                />
                <p className="mt-3 text-[19px] text-[#8B174E] font-bold ">
                  Khajuraho Tour Packages
                </p>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 w-full bg-white p-3 rounded-[11px] transition-all hover:shadow-lg duration-300 ease-in-out">
              <img
                src={khajuraho}
                alt=""
                className="rounded-[13px] h-[170px] w-full"
              />
              <p className="mt-3 text-[19px] text-[#8B174E] font-bold">
                Khajuraho Tour Packages
              </p>
            </div>

            <div className="border-2 w-full bg-white p-3 rounded-[11px] transition-all hover:shadow-lg duration-300 ease-in-out">
              <img
                src={khajuraho}
                alt=""
                className="rounded-[13px] h-[170px] w-full"
              />
              <p className="mt-3 text-[19px] text-[#8B174E] font-bold">
                Khajuraho Tour Packages
              </p>
            </div>

            <div className="border-2 w-full bg-white p-3 rounded-[11px] transition-all hover:shadow-lg duration-300 ease-in-out">
              <img
                src={khajuraho}
                alt=""
                className="rounded-[13px] h-[170px] w-full"
              />
              <p className="mt-3 text-[19px] text-[#8B174E] font-bold">
                Khajuraho Tour Packages
              </p>
            </div>

            <div className="border-2 w-full bg-white p-3 rounded-[11px] transition-all hover:shadow-lg duration-300 ease-in-out">
              <img
                src={khajuraho}
                alt=""
                className="rounded-[13px] h-[170px] w-full"
              />
              <p className="mt-3 text-[19px] text-[#8B174E] font-bold">
                Khajuraho Tour Packages
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
