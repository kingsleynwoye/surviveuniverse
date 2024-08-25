import { useState, useRef } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const medicalRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`${inter.className} bg-[#FFFFFF] fixed top-0 right-0 w-full shadow-sm px-5 z-50`}
    >
      <div className="h-16 flex items-center justify-between">
        {/* Left side: Logo and Nav Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <button onClick={() => scrollToSection(heroRef)}>
            <svg
              width="208"
              height="23"
              viewBox="0 0 208 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
              <path
                d="M18.75 15.31C18.75 19.42 15.45 22.3 10.05 22.3C4.62 22.3 1.23 19.39 0.9 14.83H5.52C5.64 17.2 7.17 18.73 9.96 18.73C12.27 18.73 13.92 17.71 13.92 15.97C13.92 14.62 12.87 13.81 11.04 13.45L7.5 12.76C4.23 12.13 1.71 10.36 1.71 6.79C1.71 2.95 5.1 0.189998 9.75 0.189998C14.58 0.189998 18.12 3.01 18.42 7.51H13.8C13.65 5.26 12.09 3.73 9.81 3.73C7.59 3.73 6.33 4.99 6.33 6.49C6.33 7.96 7.68 8.59 9.24 8.89L12.93 9.64C16.71 10.39 18.75 12.13 18.75 15.31ZM29.5676 16.375V8.65H33.0176V22H29.8426V20.25C29.1176 21.425 27.6426 22.25 25.9426 22.25C23.2676 22.25 21.3176 20.625 21.3176 17.15V8.65H24.7926V16.475C24.7926 18.35 25.7176 19.175 27.1176 19.175C28.3676 19.175 29.5676 18.175 29.5676 16.375ZM39.6148 15.525V22H36.1398V8.65H39.3398V11.225C40.3148 9.525 42.3898 8.5 44.5398 8.5V12.1C41.5898 11.875 39.6148 12.575 39.6148 15.525ZM58.6141 8.65L53.7141 22H49.9141L44.9891 8.65H48.7391L51.9141 18.05L55.1141 8.65H58.6141ZM64.1639 5.55C64.1639 6.725 63.2139 7.6 61.8389 7.6C60.4889 7.6 59.5389 6.725 59.5389 5.55C59.5389 4.325 60.4889 3.45 61.8389 3.45C63.2139 3.45 64.1639 4.325 64.1639 5.55ZM63.6139 22H60.1389V8.65H63.6139V22ZM78.7313 8.65L73.8313 22H70.0313L65.1062 8.65H68.8563L72.0313 18.05L75.2313 8.65H78.7313ZM85.5922 22.225C81.5922 22.225 78.9172 19.45 78.9172 15.275C78.9172 11.3 81.6922 8.4 85.5422 8.4C89.7672 8.4 92.5672 11.825 91.9422 16.175H82.4672C82.6922 18.35 83.7422 19.55 85.5172 19.55C87.0422 19.55 88.0672 18.8 88.4672 17.475H91.9172C91.1672 20.5 88.8422 22.225 85.5922 22.225ZM85.4672 10.95C83.8422 10.95 82.8172 12 82.5172 13.975H88.2672C88.1672 12.125 87.1172 10.95 85.4672 10.95ZM117.834 0.459998V13.81C117.834 18.91 114.594 22.45 108.984 22.45C103.284 22.45 100.104 18.91 100.104 13.81V0.459998H104.664V13.9C104.664 16.57 105.954 18.37 108.984 18.37C111.984 18.37 113.274 16.57 113.274 13.9V0.459998H117.834ZM125.001 14.725V22H121.526V8.65H124.726V10.55C125.701 9.225 127.076 8.4 128.826 8.4C131.501 8.4 133.351 10.15 133.351 13.375V22H129.901V14.55C129.901 12.575 129.126 11.475 127.551 11.475C126.176 11.475 125.001 12.575 125.001 14.725ZM140.37 5.55C140.37 6.725 139.42 7.6 138.045 7.6C136.695 7.6 135.745 6.725 135.745 5.55C135.745 4.325 136.695 3.45 138.045 3.45C139.42 3.45 140.37 4.325 140.37 5.55ZM139.82 22H136.345V8.65H139.82V22ZM154.937 8.65L150.037 22H146.237L141.312 8.65H145.062L148.237 18.05L151.437 8.65H154.937ZM161.798 22.225C157.798 22.225 155.123 19.45 155.123 15.275C155.123 11.3 157.898 8.4 161.748 8.4C165.973 8.4 168.773 11.825 168.148 16.175H158.673C158.898 18.35 159.948 19.55 161.723 19.55C163.248 19.55 164.273 18.8 164.673 17.475H168.123C167.373 20.5 165.048 22.225 161.798 22.225ZM161.673 10.95C160.048 10.95 159.023 12 158.723 13.975H164.473C164.373 12.125 163.323 10.95 161.673 10.95ZM173.951 15.525V22H170.476V8.65H173.676V11.225C174.651 9.525 176.726 8.5 178.876 8.5V12.1C175.926 11.875 173.951 12.575 173.951 15.525ZM191.956 17.725C191.956 20.525 189.831 22.25 186.031 22.25C182.231 22.25 180.106 20.425 179.831 17.45H183.156C183.181 18.825 184.356 19.7 186.081 19.7C187.431 19.7 188.456 19.275 188.456 18.325C188.456 17.475 187.906 17.125 186.631 16.875L184.231 16.425C181.831 16 180.381 14.675 180.381 12.6C180.381 10.125 182.506 8.4 185.831 8.4C189.181 8.4 191.481 10.175 191.731 13.05H188.406C188.281 11.75 187.306 10.95 185.831 10.95C184.556 10.95 183.706 11.425 183.706 12.275C183.706 13.075 184.256 13.4 185.456 13.625L188.031 14.1C190.631 14.6 191.956 15.8 191.956 17.725ZM200.128 22.225C196.128 22.225 193.453 19.45 193.453 15.275C193.453 11.3 196.228 8.4 200.078 8.4C204.303 8.4 207.103 11.825 206.478 16.175H197.003C197.228 18.35 198.278 19.55 200.053 19.55C201.578 19.55 202.603 18.8 203.003 17.475H206.453C205.703 20.5 203.378 22.225 200.128 22.225ZM200.003 10.95C198.378 10.95 197.353 12 197.053 13.975H202.803C202.703 12.125 201.653 10.95 200.003 10.95Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        {/* Right side: Auth Links */}
        <div className="flex items-center space-x-4">
          {/* Nav Links */}
          <ul className="hidden md:flex items-center space-x-6 text-gray-800">
            <li>
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="hover:text-gray-600 font-semibold"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(healthRef)}
                className="hover:text-gray-600 font-semibold"
              >
                Health
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(medicalRef)}
                className="hover:text-gray-600 font-semibold"
              >
                Medical
              </button>
            </li>
            <button
              onClick={() => scrollToSection(getStartedRef)}
              className="bg-black text-white px-5 py-2 rounded-full font-medium transition duration-200"
            >
              Get Started
            </button>
          </ul>
          <button
            className="text-white md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              width="30"
              height="16"
              viewBox="0 0 30 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.49984 0.5H27.4998C28.0524 0.5 28.5823 0.658035 28.973 0.93934C29.3637 1.22064 29.5832 1.60218 29.5832 2C29.5832 2.39782 29.3637 2.77936 28.973 3.06066C28.5823 3.34196 28.0524 3.5 27.4998 3.5H2.49984C1.9473 3.5 1.4174 3.34196 1.0267 3.06066C0.635997 2.77936 0.416504 2.39782 0.416504 2C0.416504 1.60218 0.635997 1.22064 1.0267 0.93934C1.4174 0.658035 1.9473 0.5 2.49984 0.5ZM2.49984 12.5H27.4998C28.0524 12.5 28.5823 12.658 28.973 12.9393C29.3637 13.2206 29.5832 13.6022 29.5832 14C29.5832 14.3978 29.3637 14.7794 28.973 15.0607C28.5823 15.342 28.0524 15.5 27.4998 15.5H2.49984C1.9473 15.5 1.4174 15.342 1.0267 15.0607C0.635997 14.7794 0.416504 14.3978 0.416504 14C0.416504 13.6022 0.635997 13.2206 1.0267 12.9393C1.4174 12.658 1.9473 12.5 2.49984 12.5ZM2.49984 6.5H27.4998C28.0524 6.5 28.5823 6.65804 28.973 6.93934C29.3637 7.22064 29.5832 7.60218 29.5832 8C29.5832 8.39782 29.3637 8.77935 28.973 9.06066C28.5823 9.34196 28.0524 9.5 27.4998 9.5H2.49984C1.9473 9.5 1.4174 9.34196 1.0267 9.06066C0.635997 8.77935 0.416504 8.39782 0.416504 8C0.416504 7.60218 0.635997 7.22064 1.0267 6.93934C1.4174 6.65804 1.9473 6.5 2.49984 6.5Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <ul className="md:hidden bg-white flex flex-col items-start space-y-4 pb-4 shadow-sm">
          <li>
            <button
              onClick={() => {
                scrollToSection(featuresRef);
                setMenuOpen(false);
              }}
              className="font-semibold text-gray-800 hover:text-gray-600"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection(healthRef);
                setMenuOpen(false);
              }}
              className="font-semibold text-gray-800 hover:text-gray-600"
            >
              Health
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection(medicalRef);
                setMenuOpen(false);
              }}
              className="font-semibold text-gray-800 hover:text-gray-600"
            >
              Medical
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollToSection(getStartedRef);
                setMenuOpen(false);
              }}
              className="bg-black text-white px-5 py-2 rounded-full font-medium transition duration-200"
            >
              Get Started
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
