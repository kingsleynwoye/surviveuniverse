import { useState } from "react";
import Image from "next/image";
import { Manrope } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login"); // Can be 'login' or 'signup'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav
        className={`${manrope.className} bg-[#FFFFFF] fixed top-5 left-0 right-0 mx-auto max-w-6xl rounded-full shadow-md px-5 md:px-8`}
      >
        <div className="h-20 flex items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7679 10.3887C8.87513 6.60116 11.5566 0 16.988 0C22.4193 0 25.1008 6.60116 21.208 10.3888L16.988 14.4947L12.7679 10.3887Z"
                  fill="#27BC4D"
                />
                <path
                  d="M12.7925 23.6113C8.89967 27.3988 11.5811 34 17.0125 34C22.4439 34 25.1253 27.3988 21.2326 23.6112L17.0125 19.5053L12.7925 23.6113Z"
                  fill="#27BC4D"
                />
                <path
                  d="M10.3887 21.232C6.60116 25.1248 0 22.4434 0 17.012C0 11.5806 6.60116 8.89916 10.3888 12.792L14.4947 17.012L10.3887 21.232Z"
                  fill="#27BC4D"
                />
                <path
                  d="M23.6113 21.2075C27.3988 25.1003 34 22.4189 34 16.9875C34 11.5561 27.3988 8.87467 23.6112 12.7675L19.5053 16.9875L23.6113 21.2075Z"
                  fill="#27BC4D"
                />
              </svg>
            </Link>
            {/* Nav Links */}
            <ul className="hidden md:flex items-center space-x-6 text-gray-800">
              <li>
                <Link
                  href="/discover"
                  className="hover:text-gray-600 font-semibold"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="hover:text-gray-600 font-semibold"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-gray-600 font-semibold"
                >
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-gray-600 font-semibold"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
          {/* Right side: Auth Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => openModal("login")}
              className="text-gray-800 px-5 py-2 rounded-md font-semibold bg-[#EFF0EC] hover:text-gray-600 transition duration-200"
            >
              Log in
            </button>
            <button
              onClick={() => openModal("signup")}
              className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-[#27BC4D] transition duration-200"
            >
              Sign up free
            </button>
            <button className="text-white md:hidden" aria-label="Toggle menu">
              <svg
                width="25"
                height="33"
                viewBox="0 0 25 33"
                fill="none"
                className="text-black"
              >
                <line
                  x1="1.04297"
                  y1="12.75"
                  x2="23.543"
                  y2="12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></line>
                <line
                  x1="1.04297"
                  y1="16.75"
                  x2="23.543"
                  y2="16.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></line>
                <line
                  x1="1.04297"
                  y1="20.75"
                  x2="23.543"
                  y2="20.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5 ${manrope.className}`}
        >
          <div className="bg-white p-5 rounded-lg max-w-md w-full">
            <button
              onClick={closeModal}
              className="text-black font-bold float-right"
            >
              <svg width="16" height="16" fill="none" className="_9s6z">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.495 1.353L14.364.222 7.859 6.727 1.637.505.507 1.636l6.22 6.222-6.505 6.506 1.131 1.131L7.86 8.99l6.79 6.79 1.13-1.132-6.788-6.79 6.504-6.504z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {modalContent === "login" ? "Log In" : "Sign Up"}
            </h2>
            <form>
              {modalContent === "signup" && (
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  required
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-[#27BC4D] transition duration-200"
              >
                {modalContent === "login" ? "Continue" : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
