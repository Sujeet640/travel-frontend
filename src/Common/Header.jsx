import React, { useContext, useEffect, useState } from "react";
import logo from "../Image/AbstractLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/ContextApi";
import axios from "axios";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // user dropdown
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Destination: "",
    Number: "",
  });

  const navigate = useNavigate(); // <-- FIXED

  const { isLoggedIn, loading, logout } = useContext(AuthContext);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen || modal ? "hidden" : "auto";
  }, [menuOpen, modal]);

  const handleChange = (e) => {
    const { name, value } = event.target;

    if (name === "Number") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  let enquirySubmit =async (e) => {
    e.preventDefault();
    if (formData.Number.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
   let res = await axios.post(`http://localhost:8000/api/user/enquiry`,formData)
    alert(res.data.message )

    setFormData({
      Name: "",
      Email: "",
      Destination: "",
      Number: "",
    });
  };

  return (
    <>
      {/* HEADER */}
      <header className="py-2 px-3 w-full shadow-md bg-white sticky top-0 left-0 z-[100]">
        <nav className="max-w-[1320px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="DreamDestiny Logo"
              className="w-[200px] h-[85px] object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[25px] lg:hidden"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Navigation Menu */}
          <ul
            className={`flex flex-col lg:flex-row lg:static fixed top-0 right-0 bg-white 
              h-full lg:h-auto w-[80%] lg:w-auto 
              justify-start lg:justify-end items-start lg:items-center 
              gap-6 text-[17px] font-semibold text-[#232323] 
              px-6 pt-[90px] lg:p-0 
              transform transition-transform duration-300 ease-in-out
              ${
                menuOpen
                  ? "translate-x-0 shadow-2xl"
                  : "translate-x-full lg:translate-x-0"
              }
            `}
          >
            {/* Close Button (Mobile) */}
            <button
              className="absolute top-5 right-5 text-[22px] lg:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>

            {/* Menu Links */}
            {[
              { name: "Home", path: "/" },
              { name: "Tours", path: "/tours" },
              { name: "Destination", path: "/destination" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-[#32547e] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Enquiry Button */}
            <li>
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="bg-[#32547e] text-white px-4 py-2 rounded-md hover:bg-[#2a446d] transition-colors"
              >
                Enquiry Now
              </button>
            </li>

            {/* Auth Section */}
            {/* Auth Section */}
            {!loading && isLoggedIn ? (
              <div className="relative">
                {/* User Icon */}
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-[35px] text-[#32547e] cursor-pointer"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                />

                {/* Dropdown */}
                {userMenuOpen && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md text-black w-40 z-[999]">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      <Link to="/profile">Profile</Link>
                    </li>

                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      <Link to="/booking">Booking</Link>
                    </li>

                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <li onClick={() => setMenuOpen(false)}>
                  <Link to="/login" className="hover:text-[#32547e]">
                    Log In
                  </Link>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <Link to="/signup" className="hover:text-[#32547e]">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* BACKDROP for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MODAL */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex justify-center items-center"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-white w-[90%] sm:w-[420px] p-6 rounded-lg shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-semibold text-[#32547e]">
                Ready to Plan Your Trip?
              </p>
              <FontAwesomeIcon
                icon={faClose}
                className="cursor-pointer text-gray-600 hover:text-[#32547e]"
                onClick={() => setModal(false)}
              />
            </div>

            <p className="text-gray-500 text-sm mb-4">
              Help us create your dream trip! Share a few details below.
            </p>

            <form onSubmit={enquirySubmit} className="space-y-3">
              <input
                type="text"
                name="Name"
                placeholder="name"
                onChange={handleChange}
                value={formData.Name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#32547e] focus:outline-none"
              />
              <input
                type="text"
                name="Email"
                placeholder="email"
                onChange={handleChange}
                value={formData.Email}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#32547e] focus:outline-none"
              />
              <input
                type="text"
                name="Destination"
                placeholder="Destination"
                onChange={handleChange}
                value={formData.Destination}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#32547e] focus:outline-none"
              />
              <input
                type="text"
                name="Number"
                placeholder="Number"
                onChange={handleChange}
                value={formData.Number}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#32547e] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#32547e] text-white py-3 rounded-md font-semibold hover:bg-[#2a446d] transition-all"
              >
                Talk to Our Expert
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
