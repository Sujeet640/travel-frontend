import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
import axios from "axios";

export default function Destination() {
  let [fetchDestination, setFetchDestination] = useState([]);

  useEffect(() => {
    axios
      .get(`https://travel-backend-vert.vercel.app/api/destinations/view-destination`)
      .then((res) => res.data)
      .then((final) => {
        // console.log(final.destination);
        setFetchDestination(final.destination);
        console.log(final.destination);
      });
  }, []);
  return (
    <>
      <Header />
      <section className="  w-full">
        <div className="max-w-[1320px] mx-auto lg:py-[50px] p-[20px] ">
          <div className="mb-[50px]">
            <p className="text-pink-400 text-[17px] font-semibold  mb-4">
              <Link to="/">Home</Link> {" / "}
              <Link>Destination</Link>
            </p>
          </div>

          <div className="p-[15px] bg-slate-100 mb-[25px] rounded-[15px] ">
            <div className="max-w-[600px]  ">
              <input
                type="text"
                className="ps-2 outline-none p-3 w-[100%] rounded-[10px] text-[18px] "
                placeholder="seach destnation "
                name=""
                id=""
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 ">
            {fetchDestination.length > 0 ? (
              fetchDestination.map((v, i) => {
                return <AllDestination key={i} value={v} />;
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function AllDestination({ value }) {
  // console.log(value);
  return (
    <div className="relative border-2 w-full h-[450px] cursor-pointer overflow-hidden rounded-lg">
      {/* Image */}
      <img
        src={value.image}
        alt="Tour"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
           <Link to={`/tour-destination/${value.state}-tour-package`}>
        <button className="text-white font-semibold text-center px-4 hover:border-2 hover:rounded-[10px] p-3  ">
          See all tours and activities
        </button>
           </Link>
      </div>
    </div>
  );
}
