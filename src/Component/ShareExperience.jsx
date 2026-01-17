import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import kaylo from "../Image/kaylo.webp";

export default function ShareExperience() {
  return (
    <>
      <section className="w-full lg:py-[60px] p-[15px] ">
        <div className="max-w-[1320px] mx-auto bg-[#b05e3866] rounded-[10px] p-6 ">
          <div className="text-center">
            <h1 className="text-[30px] font-bold text-[#8B174E] mb-2  ">
              What Travellers{" "}
              <span className="text-[#D12C79]">say about us </span>
            </h1>
            <p className="text-[17px] text-gray-500 ">
              Read the customers reviews about us
            </p>
          </div>

          <div className="w-full grid lg:grid-cols-[32%_32%_32%] gap-5 items-center justify-between md:grid-cols-2 grid-cols-1 mt-3  ">
            <div className="w-full p-4 bg-white rounded-[8px] ">
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-[#8B174E]"
                />{" "}
              </span>
              <p className="text-[#655b5b] font-semibold text-[15px] leading-[25px] ">
                We felt cared for from the moment we landed in India. The hotel
                bookings were seamless, the taxi service was reliable, and our
                tour guide was incredibly insightful. Experience My India took
                the stress out of travel, allowing us to fully immerse ourselves
                in the beauty and culture of this amazing country. Highly
                recommend their services!
              </p>
              <div className="mt-3 flex gap-4 items-center ">
                <img
                  src={kaylo}
                  className="w-[70px] h-[70px] rounded-[50%] "
                  alt=""
                />
               <div>
                 <span className="text-[#655b5b] font-semibold text-[15px]">Kylo James</span>
                 <p className="text-[13px] text-[#939090] ">Fitness Instructor</p>
               </div>
              </div>
            </div>
            
          </div>

        </div>
          
      </section>
    </>
  );
}
