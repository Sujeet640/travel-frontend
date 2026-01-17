import React from "react";
import AbstractLogo from '../Image/AbstractLogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMailchimp } from "@fortawesome/free-brands-svg-icons/faMailchimp";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import visa from '../Image/visa.png.jpg'
import bottomBanner from "../Image/bottomBanner.webp";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
      <section className="w-full mt-8 bg-black lg:py-[60px] p-[15px] ">
          <img src={bottomBanner} alt="" className="w-full mb-[30px] " />

        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[29%_19%_19%_29%] grid-cols-1 md:grid-cols-2  gap-5 justify-between text-white border-b-2 pb-5 ">
          <div className="w-full  p-2 ">
            <img src={AbstractLogo} className="w-[60%]" alt="" />
            <p className="mt-5">Don't just get there, get there in style.</p>
            <div className="my-3">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <span>Delhi,India</span>
            </div>
            <div className="mb-3">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <span>+91 1234567890</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>info@experience.com</span>
            </div>
          </div>
          <div className="w-full p-2 ">
            <h1>Top Destination</h1>
            <ul className="mt-3">
                <li className="mb-2">Delhi</li>
                <li className="mb-2">Agra</li>
                <li className="mb-2">Ayodhya</li>
                <li className="mb-2">Varanasi</li>
                <li>Jaipur</li>
            </ul>
          </div>
         <div className="w-full p-2 ">
            <h1>Information</h1>
            <ul className="mt-3">
              <Link to={'/about'}>
                <li className="mb-2">About us</li>
              </Link>
              <Link to={'/contact'}>
                <li className="mb-2">Contact us</li>
              </Link>
            </ul>
          </div>
          <div className="w-full p-2 ">
            <h1>Follow Us</h1>
            <ul className="mt-3 flex gap-4 items-center">
                <li className="mb-2"><FontAwesomeIcon className="text-[50px] text-gray-500 " icon={faTwitter} /></li>
                <li className="mb-2"><FontAwesomeIcon className="text-red-500 text-[50px] " icon={faInstagram} /></li>
            </ul>
            <div className="mt-4">
                <h1 className="text-[20px] mb-3 ">Payments Channel</h1>
                <img src={visa} alt="" />
            </div>
          </div>
        </div>
        <div className="max-w-[1320px] mx-auto mt-4 text-white ">
            <p className="text-center">
                Copyright © 2025 Experiencemyindia . All Rights Reserved.
            </p>
        </div>
      </section>
    </>
  );
}
