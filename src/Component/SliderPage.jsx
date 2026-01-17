import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import image1 from '../Image/Taj-Mahal.jpg'
import image2 from '../Image/IndiaTour.webp'
import image3 from '../Image/Jal-Mahal-Palace-Jaipur.jpg'
import image4 from '../Image/Prem-Mandir.jpg'

export default function SliderPage() {
  const sliderRef = useRef(null);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const data=[
    {
      image:image1
    },
    {
      image:image2
    },
    {
      image:image3
    },
    {
      image:image4
    }
  ]

  return (
   <section className="w-full relative overflow-hidden pb-8">
  {/* Left Button */}
  <button
    className="absolute left-3 sm:left-10 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-md transition-all"
    onClick={() => sliderRef.current.slickPrev()}
  >
    <FontAwesomeIcon icon={faChevronLeft} className="text-[20px] sm:text-[28px]" />
  </button>

  {/* Right Button */}
  <button
    className="absolute right-3 sm:right-10 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-md transition-all"
    onClick={() => sliderRef.current.slickNext()}
  >
    <FontAwesomeIcon icon={faChevronRight} className="text-[20px] sm:text-[28px]" />
  </button>

  {/* Slider */}
  <Slider ref={sliderRef} {...settings}>
    {data.map((item, index) => (
      <div key={index} className="w-full h-[50vh] sm:h-[70vh] lg:h-[600px]">
        <img
          src={item.image}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    ))}
  </Slider>
</section>

  );
}
