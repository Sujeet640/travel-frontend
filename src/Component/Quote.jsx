import React from "react";


export default function Quote() {
  return (
    <>
      <div className="w-full bg-gray-400 lg:py-[60px] p-[15px] ">
        <div className="max-w-[1320px] mx-auto  ">
          <h1 className="text-center text-[#8B174E] lg:text-[30px] lg:font-bold text-[18px] font-semibold mb-3 ">
            A Leading Travel Agency :{" "}
            <span className="text-[#D12C79] ">Experience My India</span>
          </h1>
          <p className="mb-[15px] text-white lg:text-[20px] text-[17px] leading-[25px] lg:text-justify lg:leading-[30px] ">
           <span className="text-[#8B174E] font-semibold "> Experience My India </span> is an emerging name in the tourism industry.
            With a customer-centric approach and budget-friendly packages, it is
            one of the primary agencies providing quality trip packages to
            various parts of India and Whole over the world. We are committed to
            providing you with beautiful memories to cherish for the rest of
            your lifetime.
          </p>
          <p className=" text-white lg:text-[20px] lg:text-justify text-[17px] leading-[25px]  lg:leading-[30px]">
            You can get a trip deal at reasonable prices by choosing from the
            existing trip packages. <span className="text-[#8B174E] font-semibold "> Experience My India </span> is also flexible with
            creating a personalized package as per your demand. You can book a
            package for yourself, your friends, family, or colleagues and leave
            the rest to us. We will manage the trip as planned. The only thing
            you should be concerned about is, enjoying the time of the trip to
            the fullest
          </p>
        </div>
      </div>
    </>
  );
}
