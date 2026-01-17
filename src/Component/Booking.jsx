import React, { useContext, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { AuthContext } from "../Context/ContextApi";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faEye,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faCalendar, faUserAlt } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

export default function Booking() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // ✅ For modal

 useEffect(() => {
  if (!token) return;

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://travel-backend-vert.vercel.app/api/order/view-order",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(res.data?.orders || []);
    } catch (err) {
      console.error("❌ Failed to fetch bookings:", err);
      setError("Failed to load booking history");
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [token]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-pink-100 text-pink-800"; // ✅ pink for pending
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
      <Header />
      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-center mb-8 text-pink-600">
            My Bookings
          </h2>

          {loading && (
            <p className="text-center text-gray-600">Loading bookings...</p>
          )}
          {error && (
            <p className="text-center text-red-600 font-medium">{error}</p>
          )}
          {!loading && bookings.length === 0 && (
            <p className="text-center text-gray-700 text-lg">
              You have no bookings yet.
            </p>
          )}

          {bookings.map((b) => {
            const travelDate = new Date(b.travelDate);

            //  const travelDate = new Date(b.travelDate);
            const formattedDate = travelDate.toLocaleDateString("en-GB"); // DD/MM/YYYY
            // Agar time chahiye user ke input ke saath, to time field backend me bhi save karo

            return (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Package Image */}
                <div className="md:w-1/3">
                  <img
                    src={b.packageId?.tourImage}
                    alt={b.packageDetails?.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Booking Info */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {b.packageDetails?.title}
                      </h2>
                      <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-pink-400 mr-1"
                        />
                        <span>{b.packageDetails?.location}</span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        b.status
                      )}`}
                    >
                      {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                    </span>
                  </div>

                  {/* Travel Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                      <div>
                        <div className="text-sm text-gray-600">Travel Date</div>
                        <div>{formattedDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faUserAlt}
                        className="text-gray-400 mr-2"
                      />
                      <div>
                        <div className="text-sm text-gray-600">Travelers</div>
                        <div>
                          <span className="text-[20px]">
                            {b.numberOfPerson}
                          </span>{" "}
                          Person(s)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-semibold">
                        ₹{b.totalAmount}
                      </span>
                    </div>
                    <div
                      className="flex items-center text-pink-600 cursor-pointer"
                      onClick={() => setSelectedBooking(b)} // ✅ open modal
                    >
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Modal */}
          {/* VIEW DETAILS MODAL */}
          {selectedBooking && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex justify-center items-start  overflow-auto pt-20 px-10"
              onClick={() => setSelectedBooking(null)}
            >
              <div
                className="bg-white w-full max-w-lg rounded-lg shadow-2xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="border-b-2">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-pink-600 text-2xl font-bold"
                    onClick={() => setSelectedBooking(null)}
                  >
                    &times;
                  </button>

                  <h2 className="text-2xl font-semibold  mb-4">
                    Booking Details
                  </h2>
                </div>

                <div className="space-y-3 mt-3 text-gray-700">
                  <div>
                    <h3 className="font-semibold mb-2 ">Package Information</h3>
                    <div className="flex justify-between items-center ">
                      <div className=" py-3 px-4 flex items-center gap-2  ">
                        <div className="bg-pink-200 p-2 rounded-[5px] ">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="text-[20px] text-pink-500"
                          />
                        </div>
                        <div>
                          <p className="text-[15px] text-gray-400 ">
                            Travel Date
                          </p>
                          <p className="text-[20px] font-semibold ">
                            {new Date(
                              selectedBooking.travelDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className=" py-3 px-4 flex items-center gap-2  ">
                        <div className="bg-pink-200 p-2 rounded-[5px] ">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="text-[20px] text-pink-500"
                          />
                        </div>
                        <div>
                          <p className="text-[15px] text-gray-400 ">Location</p>
                          <p className="text-[20px] font-semibold ">
                            {selectedBooking.packageDetails?.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" py-3 px-4 flex items-center gap-2  ">
                      <div className="bg-pink-200 p-2 rounded-[5px] ">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="text-[20px] text-pink-500"
                        />
                      </div>
                      <div>
                        <p className="text-[15px] text-gray-400 ">
                          Number of Travelers
                        </p>
                        <p className="text-[20px] font-semibold ">
                          {selectedBooking.numberOfPerson} Person(s)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold  mb-4">Booking Status</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status?.charAt(0).toUpperCase() +
                        selectedBooking.status?.slice(1)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 ">Payment Details</h3>
                    <div className="bg-gray-50 p-2">
                      <div className="flex justify-between">
                        <p className="mb-3">Payment Method</p>
                        <p className="text-[20px] font-semibold ">
                          {" "}
                          {selectedBooking.paymentMethod}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Total Amount</p>
                        <p className="text-[20px] font-semibold ">
                          ₹{selectedBooking.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold my-3 ">Travel Details</h3>

                    <div className="flex justify-between items-center  ">
                      <div className="bg-gray-50 p-2 w-[50%] ">
                        Name
                        {selectedBooking.travelers.map((t) => (
                          <p key={t._id}>{t.name}</p>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-2 w-[50%]">
                        Name
                        {selectedBooking.travelers.map((t) => (
                          <p key={t._id}>{t.phone}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-[18px] bg-gray-300 text-pink-500 py-2 px-6 rounded-[5px]  "
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
