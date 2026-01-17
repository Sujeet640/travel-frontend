import React, { useContext, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSave } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/ContextApi";

export default function Profile() {
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const { token } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  let profileSubmit = async (e) => {
  e.preventDefault();

  // Frontend validation for phone number
  if (formData.phoneNumber.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
  }

  try {
    const res = await axios.put(
      `http://localhost:8000/api/user/update-profile`,
      {
        // Request body: what you want to update
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      },
      {
        // Headers go here
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      alert("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Try again.");
  }
};


  useEffect(() => {
    if (!token) return; // wait for token

    const fetchProfileData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/user/user-profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = res.data.message || {}; // <-- message contains _id and name
        setFormData({
          name: userData.name || "",
          phoneNumber: userData.phoneNumber || "", // might be undefined if backend doesn't send it
        });
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <>
      <Header />

      <section className="w-full lg:py-16 py-8 px-4 bg-pink-100">
        <div className="max-w-[1000px] mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-[25px] font-bold mb-4 sm:mb-0">
              Profile Settings
            </p>
            <Link to={"/booking"}>
              <button className="flex items-center text-[16px] sm:text-[18px] text-pink-500 font-bold bg-gray-100 py-2 px-4 sm:px-5 rounded-[5px] hover:bg-gray-200 transition">
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                View Booking
              </button>
            </Link>
          </div>

          <form onSubmit={profileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="w-full">
                <p className="text-[15px] text-gray-600 font-semibold mb-2">
                  Full Name
                </p>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-gray-500 rounded-[5px] w-full pl-10 p-2 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#32547e]"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="w-full">
                <p className="text-[15px] text-gray-600 font-semibold mb-2">
                  Phone Number
                </p>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border-2 border-gray-500 rounded-[5px] w-full pl-10 p-2 text-[16px] sm:text-[18px] focus:outline-none focus:ring-2 focus:ring-[#32547e]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button className="flex items-center bg-pink-600 text-white py-2 px-4 sm:px-6 rounded-[5px] hover:bg-pink-500 transition-all duration-300">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
