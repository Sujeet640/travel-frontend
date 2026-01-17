import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TrendingPackage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios
      .get("https://travel-backend-vert.vercel.app/api/destinations/view-destination")
      .then((res) => res.data)
      .then((final) => {
        setDestinations(final.destination.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  const slugifyState = (state) =>
    state.trim().replace(/\s+/g, "-").toLowerCase();

  return (
    <section className="lg:py-[60px] p-[15px] w-full ">
      <div className="max-w-[1320px] mx-auto lg:p-6">
        <h1 className="text-[#8B174E] lg:text-[30px] lg:font-bold text-[17px] font-semibold mb-6">
          Top Tour Destination <span className="text-[#D12C79]">in India</span>
        </h1>

        {/* Destination Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {destinations.map((dest, i) => (
            <TopDestination key={i} value={dest} slugifyState={slugifyState} />
          ))}
        </div>

        {/* Button */}
        <Link to="/destination">
          <button className="block mx-auto mt-5 text-[#8B174E] text-[18px] border border-[#D12C79] p-4 rounded-[30px] hover:bg-[#D12C79] hover:text-white hover:-translate-y-3 transition-all duration-300">
            See All Destination
          </button>
        </Link>
      </div>
    </section>
  );
}

function TopDestination({ value, slugifyState }) {
  return (
    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg">
      {/* Image */}
      <img
        src={value.image}
        alt={value.state}
        className="h-[380px] w-full object-cover rounded-xl"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-6 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <h1 className="text-xl md:text-2xl font-bold mb-3">{value.state}</h1>
        <p className="text-base md:text-lg mb-4 line-clamp-3">{value.description}</p>

        <Link to={`/tour-destination/${slugifyState(value.state)}-tour-package`}>
          <button className="border-2 border-white rounded-full px-5 py-2 hover:bg-[#8B174E] hover:border-[#8B174E] transition-all">
            See All Tours
          </button>
        </Link>
      </div>

      {/* State Label */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-md text-white text-xl font-bold group-hover:opacity-0 transition-opacity duration-500">
        {value.state}
      </div>
    </div>
  );
}
