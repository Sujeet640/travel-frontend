import { Link, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function RoutingPage() {
  const { package: packageSlug } = useParams();

  // Convert slug → actual state name
  const stateName = packageSlug
    .replace("-tour-package", "")
    .replace(/-/g, " ")
    .trim();

  const [tours, setTours] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");

  useEffect(() => {
    const loadTours = async () => {
      try {
        const { data } = await axios.get(
          "https://travel-backend-vert.vercel.app/api/tours/view-tour"
        );

        // Filter tours for selected state
        const filteredTours = data.tours.filter(
          (tour) =>
            tour.destination.state.toLowerCase().trim() ===
            stateName.toLowerCase().trim()
        );

        setTours(filteredTours);

        if (filteredTours.length > 0) {
          setPageTitle(filteredTours[0].destination.state);
          setPageDescription(filteredTours[0].destination.description);
        } else {
          setPageTitle(stateName);
          setPageDescription("No tours available for this destination.");
        }
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };

    loadTours();
  }, [stateName]);

  return (
    <>
      <Header />

      <section className="w-full">
        <div className="max-w-[1320px] mx-auto py-[50px] px-[20px]">
          {/* Breadcrumb */}
          <p className="text-pink-400 text-[17px] font-semibold mb-4">
            <Link to="/">Home</Link> {" / "}
            <Link to="/tours">Tours</Link> {" / "}
            <span>{pageTitle}-tour-package</span>
          </p>

          {/* Title & Description */}
          <h1 className="text-[40px] font-bold">{pageTitle}</h1>
          <p className="text-pink-400">{pageDescription}</p>

          {/* Tour Cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {tours.length > 0 ? (
              tours.map((t, i) => <TourCard key={i} value={t} />)
            ) : (
              <p className="text-gray-500">No Tours Available</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function TourCard({ value }) {
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
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[280px]">
        <img
          src={value.tourImage}
          alt={value.tourName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-[#D12C79] text-white text-xs px-3 py-1 rounded-full">
          On Sale
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold">{value.tourName}</h3>
        <p className="text-sm text-gray-600">{days} Days India Tour</p>

        <div className="flex justify-end text-gray-500 text-sm">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
          <span>0 (0 reviews)</span>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <p className="text-gray-700">
            From{" "}
            <span className="font-bold text-[#2E2E2E]">₹{value.price}</span>
          </p>
          <p className="text-[#D12C79] font-semibold">
            {nights} Nights / {days} Days
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <button className="w-1/2 border-2 border-[#D12C79] text-[#D12C79] py-2 rounded-lg hover:bg-[#D12C79] hover:text-white transition">
            Call Now
          </button>
          <Link to={tourUrl} className="w-1/2">
            <button className="w-full bg-[#D12C79] text-white py-2 rounded-lg hover:bg-[#b01f66] transition">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
