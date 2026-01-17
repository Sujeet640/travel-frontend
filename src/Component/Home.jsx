import React, { useState } from "react";
import Header from "../Common/Header";
import SliderPage from "./SliderPage";
import Pages from "./Pages";
import TrendingPackage from "./TrendingPackage";
import PopularTour from "./PopularTour";
import ShareExperience from "./ShareExperience";
import Quote from "./Quote";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons/faWhatsappSquare";

export default function Home() {
  const whatsAppNumber = "918235966829";
  const [message, setMessage] = useState("");

  const encodedMessage = encodeURIComponent(message || "May I Help You!");
  return (
    <>
      <Header />
      <SliderPage />
      <Pages />
      <TrendingPackage />
      <PopularTour />
      <ShareExperience />
      <Quote />
      <Footer />
      <div className="w-full relative h-full ">
        <a
          href={`https://wa.me/${whatsAppNumber}?text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className='fixed z-50  bottom-[20px] text-[#075E54]  right-[20px]  cursor-pointer '>
            <FontAwesomeIcon
              className=" text-[50px] "
              icon={faWhatsappSquare}
            />{" "}
           
          </button>
        </a>
      </div>
    </>
  );
}

