import React from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const manrope = Manrope({ subsets: ["latin"] });

function Footer() {
  return (
    <footer className={`${manrope.className} bg-[#000] text-white py-12`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-4">Survive Universe</h3>
            <p className="mb-4">
              Your personal companion for navigating tough times.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xl font-bold mb-4">Product</h3>
            <ul>
              <li className="mb-2">
                <Link href="/about" className="hover:text-gray-400">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul>
              <li className="mb-2">
                <Link href="/feedback" className="hover:text-gray-400">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">More</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                {/* <FaFacebookF size={20} /> */}
              </Link>
              <Link
                href="https://www.twitter.com"
                target="_blank"
                aria-label="Twitter"
                className="hover:text-gray-400"
              >
                {/* <FaTwitter size={20} /> */}
              </Link>
              <Link
                href="https://www.linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-gray-400"
              >
                {/* <FaLinkedinIn size={20} /> */}
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                {/* <FaInstagram size={20} /> */}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Survive Universe</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
