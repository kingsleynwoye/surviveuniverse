import { useState } from "react";
import Image from "next/image";
import { Manrope } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${manrope.className} w-full bg-[#1A3129] fixed`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-5 md:px-10">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg" // Replace with your logo path
            alt="Logo"
            width={40}
            height={40}
            className="mr-1"
          />
          <span className="text-xl font-bold text-white">Survive Universe</span>
        </div>

        {/* Right side: Navigation text and Login button */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <Link href="/" className="hover:text-[#CBEA7B] transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#CBEA7B] transition">
            About
          </Link>
          <Link href="/services" className="hover:text-[#CBEA7B] transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-[#CBEA7B] transition">
            Contact
          </Link>
          <Link
            href="/login"
            className="px-8 py-2 bg-[#CBEA7B] text-[#1A3129] font-semibold rounded-full hover:bg-[#B5D767] transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25 9.5625C4.25 8.9757 4.7257 8.5 5.3125 8.5H28.6875C29.2743 8.5 29.75 8.9757 29.75 9.5625C29.75 10.1493 29.2743 10.625 28.6875 10.625H5.3125C4.7257 10.625 4.25 10.1493 4.25 9.5625ZM4.25 17C4.25 16.4132 4.7257 15.9375 5.3125 15.9375H28.6875C29.2743 15.9375 29.75 16.4132 29.75 17C29.75 17.5868 29.2743 18.0625 28.6875 18.0625H5.3125C4.7257 18.0625 4.25 17.5868 4.25 17ZM15.9375 24.4375C15.9375 23.8507 16.4132 23.375 17 23.375H28.6875C29.2743 23.375 29.75 23.8507 29.75 24.4375C29.75 25.0243 29.2743 25.5 28.6875 25.5H17C16.4132 25.5 15.9375 25.0243 15.9375 24.4375Z"
                fill="#CBEA7B"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A3129] px-6 py-4 space-y-2">
          <Link href="/home" className="block text-white hover:text-[#CBEA7B]">
            Home
          </Link>
          <Link href="/about" className="block text-white hover:text-[#CBEA7B]">
            About
          </Link>
          <Link
            href="/services"
            className="block text-white hover:text-[#CBEA7B]"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-white hover:text-[#CBEA7B]"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="block w-full text-center px-4 py-2 bg-[#CBEA7B] text-[#1A3129] font-semibold rounded-full hover:bg-[#B5D767] transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
