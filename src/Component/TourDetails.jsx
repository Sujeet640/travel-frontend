import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faClose,
  faIndianRupee,
  faIndianRupeeSign,
  faLocationDot,
  faShareNodes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/ContextApi";

const TourDetails = () => {
  const { id } = useParams();

  const [filterTour, setFilterTour] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [multipleImages, setMultipleImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  

  // ===== Booking States =====
  const [showBookingBox, setShowBookingBox] = useState(false);
  const [formData, setFormData] = useState({
    travelDate: "",
    persons: 1,
    travellers: [{ name: "", phone: "" }],
    specialRequest: "",
    paymentType: "payAttravel", // "cod" or "online"
  });

  const { isLoggedIn,token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Package Details",
          text: "Check out this package!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleSwapImage = (img) => {
    const newGallery = [...multipleImages];
    const clickedIndex = newGallery.indexOf(img);
    newGallery.splice(clickedIndex, 1);
    newGallery.unshift(mainImage);
    setMainImage(img);
    setMultipleImages(newGallery);
  };

  useEffect(() => {
    axios
      .get("https://travel-backend-vert.vercel.app/api/tours/view-tour/")
      .then((res) => res.data)
      .then((final) => {
        const data = final.tours;
        const existing = data.find((prod) => prod._id === id);

        if (existing) {
          setFilterTour(existing);
          setMainImage(existing.tourImage);
          setMultipleImages(existing.gallery || []);
        }
      });
  }, [id]);

  // ===== Open Booking Modal =====
  let bookNow = () => {
    if (!isLoggedIn) {
      alert(
        "Oops! You need to be logged in before booking. Please login first."
      );

      navigate("/login");
    } else {
      setShowBookingBox(true);
    }
  };

  // ===== Add Traveller =====
  const addTraveller = () => {
    setFormData((prev) => ({
      ...prev,
      travellers: [...prev.travellers, { name: "", phone: "" }],
    }));
  };

  const handleTravellerChange = (index, field, value) => {
    const newTravellers = [...formData.travellers];
    newTravellers[index][field] = value;
    setFormData((prev) => ({ ...prev, travellers: newTravellers }));
  };

  const deleteTraveller = (index) => {
    setFormData((prev) => ({
      ...prev,
      travellers: prev.travellers.filter((_, i) => i !== index),
    }));
  };

  // ===== API SUBMIT BOOKING =====
  const submitBooking = async () => {
  const { travelDate, persons, travellers, specialRequest, paymentType } =
    formData;

  if (!travelDate) return alert("Please select travel date!");

  for (let i = 0; i < travellers.length; i++) {
    if (!travellers[i].name || !travellers[i].phone) {
      return alert(`Please fill name & phone for traveller ${i + 1}`);
    }
  }

  const totalAmount = filterTour.price * persons;

  // ======= Dummy Online Payment =======
  if (paymentType === "online") {
    const proceed = window.confirm(
      `Total Amount ₹${totalAmount}\n\nProceed to Online Payment?`
    );
    if (!proceed) return alert("Payment Cancelled!");

    const paymentSuccess = Math.random() > 0.1; // 90% success
    if (!paymentSuccess) return alert("Payment Failed! Try again.");
  }

  // ======= Get userId from token =======
  let userId = null;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    userId = decoded._id || decoded.id || decoded.userId;

    if (!userId) {
      alert("User not found in token. Please login again.");
      navigate("/login");
      return;
    }
  } catch (error) {
    console.error("Token decode error:", error);
    return alert("Invalid login session! Login again.");
  }

  // ======= Prepare data EXACT for backend =======
  const bookingData = {
    userId: userId,
    packageId: filterTour._id,
    numberOfPerson: persons,

    packageDetails: {
      title: filterTour.tourName,
      duration: filterTour.duration,
      price: filterTour.price,
      location: filterTour.destination.state,
    },

    paymentMethod: paymentType === "cod" ? "payAttravel" : "online",

    specialRequests: specialRequest,
    totalAmount,
    travelDate,
    travelers: travellers,
  };

  console.log("📦 FINAL DATA SENT TO BACKEND:", bookingData);

  try {
    const res = await axios.post(
      "https://travel-backend-vert.vercel.app/api/order/create",
      bookingData
    );

    alert("Booking Confirmed!");
    setShowBookingBox(false);

    setFormData({
      travelDate: "",
      persons: 1,
      travellers: [{ name: "", phone: "" }],
      specialRequest: "",
      paymentType: "cod",
    });
  } catch (err) {
    console.error(err);
    alert("Booking Failed!");
  }
};


  if (!filterTour) {
    return (
      <>
        <Header />
        <p className="mt-[120px] text-center text-lg font-medium">Loading...</p>
        <Footer />
      </>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "inclusions", label: "Inclusions / Exclusions" },
    { id: "itinerary", label: "Itinerary" },
  ];

  return (
    <>
      <Header />

      {/* ---------------- GALLERY MODAL ---------------- */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[70%] max-h-[90%] p-6 rounded-lg overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon
              icon={faClose}
              className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600"
              onClick={() => setOpenModal(false)}
            />

            <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {multipleImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => {
                    handleSwapImage(img);
                    setOpenModal(false);
                  }}
                  className="w-full h-[160px] object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      <section className="w-full bg-slate-100">
        <div className="max-w-[1320px] mx-auto lg:py-[60px] p-[20px]">
          {/* Breadcrumb */}
          <div className="mb-[50px]">
            <p className="text-pink-400 text-[17px] font-semibold mb-4">
              <Link to="/">Home</Link> {" / "}
              <Link to="/tours">Tours</Link> {" / "}
              {filterTour.tourName}
            </p>
          </div>

          {/* MAIN IMAGE + SIDE IMAGES */}
          <div className="grid grid-cols-1 lg:grid-cols-[63%_35%] gap-6">
            {/* Main Image */}
            <div className="w-full rounded-lg overflow-hidden shadow">
              <img
                src={mainImage}
                className="w-full h-[500px] object-cover"
                alt="Main"
              />
            </div>

            {/* Side Thumbnails */}
            <div className="flex flex-col gap-4">
              {multipleImages[0] && (
                <img
                  src={multipleImages[0]}
                  onClick={() => handleSwapImage(multipleImages[0])}
                  className="w-full h-[240px] object-cover rounded-lg border cursor-pointer hover:opacity-80"
                  alt=""
                />
              )}

              {multipleImages[1] && (
                <img
                  src={multipleImages[1]}
                  onClick={() => handleSwapImage(multipleImages[1])}
                  className="w-full h-[240px] object-cover rounded-lg border cursor-pointer hover:opacity-80"
                  alt=""
                />
              )}

              {multipleImages.length > 2 && (
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full mt-2 bg-[#32547e] text-white py-3 rounded-lg font-semibold hover:bg-[#2a446d] transition"
                >
                  View Full Gallery ({multipleImages.length - 2} more)
                </button>
              )}
            </div>
          </div>

          {/* ---------------- TABS SECTION ---------------- */}
          <div className="grid lg:grid-cols-[63%_35%] gap-6 grid-cols-1 items-start mt-5">
            <div className="w-full bg-white p-5 rounded-[10px]">
              {/* Tab Buttons */}
              <div className="grid grid-cols-3 items-center pb-2 border-b-2">
                {tabs.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveTab(v.id)}
                    className={`text-pink-500 text-[16px] font-semibold px-2 relative ${
                      activeTab === v.id ? "text-pink-600" : "text-pink-400"
                    }`}
                  >
                    {v.label}
                    {activeTab === v.id && (
                      <span className="absolute left-0 right-0 -bottom-2 h-[2px] bg-pink-600 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* -------- TAB CONTENT -------- */}
              <div className="mt-4 text-gray-700">
                {activeTab === "overview" && (
                  <>
                    <p className="text-[16px] leading-7 mb-4">
                      {filterTour.description}
                    </p>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                      {/* Duration */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-[10px] flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-[26px] text-pink-600"
                        />
                        <div>
                          <p className="text-[15px] text-gray-500">Duration</p>
                          <p className="text-[18px] font-semibold">
                            {filterTour.duration}
                          </p>
                        </div>
                      </div>

                      {/* Group Size */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-[10px] flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-[26px] text-pink-600"
                        />
                        <div>
                          <p className="text-[15px] text-gray-500">
                            Group Size
                          </p>
                          <p className="text-[18px] font-semibold">
                            Max 10 people
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-[10px] flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-[26px] text-pink-600"
                        />
                        <div>
                          <p className="text-[15px] text-gray-500">Location</p>
                          <p className="text-[18px] font-semibold">
                            {filterTour?.destination?.state}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-[10px] flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faIndianRupee}
                          className="text-[26px] text-pink-600"
                        />
                        <div>
                          <p className="text-[15px] text-gray-500">Price</p>
                          <p className="text-[18px] font-semibold">
                            {filterTour.price}
                          </p>
                        </div>
                      </div>

                      {/* Available */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-[10px] flex gap-4 items-center">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-[26px] text-pink-600"
                        />
                        <div>
                          <p className="text-[15px] text-gray-500">Available</p>
                          <p className="text-[18px] font-semibold">
                            Year Round
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ================= INCLUSIONS TAB ================= */}
                {activeTab === "inclusions" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">Inclusions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {filterTour.inclusinon?.length > 0 ? (
                          filterTour.inclusinon.map((inc, i) => (
                            <li key={i}>{inc}</li>
                          ))
                        ) : (
                          <p>No inclusions available.</p>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Exclusions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {filterTour.exclusions?.length > 0 ? (
                          filterTour.exclusions.map((exc, i) => (
                            <li key={i}>{exc}</li>
                          ))
                        ) : (
                          <p>No exclusions available.</p>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ================= ITINERARY TAB ================= */}
                {activeTab === "itinerary" && (
                  <div className="space-y-5">
                    {filterTour.itinerary?.length > 0 ? (
                      filterTour.itinerary.map((dayData, i) => (
                        <div
                          key={i}
                          className="p-4 bg-gray-50 border rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-pink-600">
                            Day {dayData.day}: {dayData.title}
                          </h3>
                          <p className="text-[15px] mt-2 text-gray-700">
                            {dayData.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No itinerary available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ------------ Right Side Card ------------ */}
            <div className="w-full bg-white p-5 rounded-[10px]">
              <p className="text-[17px] font-semibold text-gray-500 ">
                Price per person
              </p>
              <p className="text-[25px] text-pink-600 font-bold leading-8 mt-2 ">
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                {filterTour.price}
              </p>
              <p className="text-[#10b981] text-[15px] mt-2 font-semibold ">
                Best Price Guaranteed
              </p>

              <div className="flex justify-between items-center my-4 border-b pb-2 ">
                <p className="text-gray-500 text-[18px] ">Duration</p>
                <p className="text-[18px] ">{filterTour.duration}</p>
              </div>
              <div className="flex justify-between items-center mt-5 border-b pb-2 ">
                <p className="text-gray-500 text-[18px] ">Group Size</p>
                <p className="text-[18px] font-medium ">Max 10 people</p>
              </div>
              <div className="flex justify-between items-center mt-5 border-b pb-2 ">
                <p className="text-gray-500 text-[18px] ">Location</p>
                <p className="text-[18px] font-medium ">
                  {filterTour.destination.state}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={bookNow}
                  className="bg-pink-600 w-full py-4 rounded-[10px] text-[20px] text-white font-semibold hover:bg-pink-500 duration-300 "
                >
                  Book Now
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleShare}
                  className="bg-gray-600 w-full py-4 rounded-[10px] text-[20px] text-white font-semibold hover:bg-gray-500 duration-300 "
                >
                  <FontAwesomeIcon icon={faShareNodes} /> Share package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= BOOKING MODAL ======================= */}
      {showBookingBox && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-[9999]">
          <div className="bg-white w-full max-w-lg max-h-[90vh] p-5 rounded-xl overflow-y-scroll">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{filterTour.tourName}</h2>
              <button
                className="text-3xl"
                onClick={() => setShowBookingBox(false)}
              >
                ×
              </button>
            </div>

            {/* Travel Date */}
            <div className="mt-4">
              <label className="font-semibold">Travel Date</label>
              <input
                type="date"
                value={formData.travelDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    travelDate: e.target.value,
                  }))
                }
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            {/* Persons */}
            <div className="mt-4">
              <label className="font-semibold">Number of Persons</label>
              <div className="mt-2 flex items-center justify-between border rounded-lg p-2">
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      persons: prev.persons > 1 ? prev.persons - 1 : 1,
                    }))
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-md text-2xl font-bold"
                >
                  –
                </button>
                <span className="text-xl font-semibold">
                  {formData.persons}
                </span>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      persons: prev.persons < 10 ? prev.persons + 1 : 10,
                    }))
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-md text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Travellers */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Traveller Details</label>
                <button
                  onClick={addTraveller}
                  className="mt-3 text-pink-400 rounded font-semibold"
                >
                  + Add Traveller
                </button>
              </div>
              {formData.travellers.map((t, i) => (
                <div
                  key={i}
                  className="border p-3 rounded mt-2 bg-gray-50 relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Traveller {i + 1}</span>
                    {i > 0 && (
                      <button
                        onClick={() => deleteTraveller(i)}
                        className="text-red-500 font-bold text-xl"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={t.name}
                      onChange={(e) =>
                        handleTravellerChange(i, "name", e.target.value)
                      }
                      className="flex-1 border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={t.phone}
                      onChange={(e) =>
                        handleTravellerChange(i, "phone", e.target.value)
                      }
                      className="flex-1 border p-2 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Special Request */}
            <div className="mt-4">
              <label className="font-semibold">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.specialRequest}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialRequest: e.target.value,
                  }))
                }
                className="w-full border p-2 rounded mt-1"
                placeholder="Any special requirements?"
              />
            </div>

            {/* Payment Type */}
            <div className="mt-5 flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentType === "payAttravel"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, paymentType: "payAttravel" }))
                  }
                />
                Pay At Travel
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentType === "online"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, paymentType: "online" }))
                  }
                />
                Online
              </label>
            </div>

            {/* Price Summary */}
            <div className="mt-5 p-4 border rounded-lg">
              <div className="flex justify-between">
                <p>Price per person</p>
                <p>₹{filterTour.price}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Number of persons</p>
                <p>× {formData.persons}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total Amount</p>
                <p>₹{filterTour.price * formData.persons}</p>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={submitBooking}
              className="bg-pink-600 w-full py-3 rounded-lg text-white text-lg font-bold mt-5"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default TourDetails;
