import Image from "next/image";
import { Manrope } from "next/font/google";
// import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });

export default function IndexCopy() {
  return (
    <>
      <Head>
        <title>Survive Universe | Health and Medical Platform</title>
      </Head>
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className={`${manrope.className} bg-[#F6FBE9]`}>
        {/* Container for image and text */}
        <div className="flex flex-col md:flex-row container">
          {/* Left side: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
            <Image
              src="/health-image.png" // Replace with your image path
              alt="Health and Medical"
              width={500}
              height={500}
              className="object-contain w-full rounded-b-[50px] md:rounded-b-none md:rounded-br-[50px]"
            />
          </div>

          {/* Right side: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left p-5 md:p-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A3129]">
              Health and Medical Assistant
            </h1>
            <p className="text-base mb-6 text-[#333333]">
              Welcome to Survive Universe, your personalized health and medical
              assistant. We are here to provide you with tailored support on
              your health journey. Get personalized guidance and resources to
              manage your well-being effectively.
            </p>
            <div className="flex flex-row gap-4 justify-center md:justify-start">
              <button className="w-full py-3 bg-[#CBEA7B] text-[#262626] hover:bg-[#B5D767] transition rounded-xl font-semibold">
                Get Started
              </button>
              <button className="w-full py-3 bg-[#F6FBE9] text-[#262626] transition rounded-xl font-semibold border-2 border-[#E5F5BD]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${manrope.className} bg-[#F6FBE9] py-20`}>
        <div className="container mx-auto px-5 md:px-10">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A3129] mb-4">
              Features
            </h2>
            <p className="text-base md:text-lg text-[#333333]">
              Your ultimate destination for health and medical assistant.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature1.svg" // Replace with your icon path
                  alt="Feature 1"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Personalized Guidance
              </h3>
              <p className="text-base text-[#555555]">
                Receive tailored health advice and recommendations based on your
                unique needs and goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature2.svg" // Replace with your icon path
                  alt="Feature 2"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Appointment Scheduling
              </h3>
              <p className="text-base text-[#555555]">
                Easily schedule, manage, and track your medical appointments all
                in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature3.svg" // Replace with your icon path
                  alt="Feature 3"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Health Monitoring
              </h3>
              <p className="text-base text-[#555555]">
                Keep track of your vital signs, activity levels, and overall
                health metrics effortlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature4.svg" // Replace with your icon path
                  alt="Feature 4"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Medication Reminders
              </h3>
              <p className="text-base text-[#555555]">
                Never miss a dose with timely medication reminders tailored to
                your schedule.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature5.svg" // Replace with your icon path
                  alt="Feature 5"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Health Insights
              </h3>
              <p className="text-base text-[#555555]">
                Gain valuable insights into your health trends and progress over
                time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src="/feature6.svg" // Replace with your icon path
                  alt="Feature 6"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A3129]">
                Secure Data Storage
              </h3>
              <p className="text-base text-[#555555]">
                Your health data is securely stored and accessible only to you
                and authorized personnel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className={`${manrope.className} bg-[#1A3129] text-white py-20 px-10 md:px-10`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section: Logo and Brief Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.svg" // Replace with your logo path
              alt="Logo"
              width={50}
              height={50}
              className="mb-4"
            />
            <h2 className="text-xl font-bold">Survive Universe</h2>
            <p className="mt-4 text-gray-400 text-center md:text-left">
              Your companion in managing health and wellness, providing
              personalized assistance and resources.
            </p>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href="/" className="hover:text-[#CBEA7B] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#CBEA7B] transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#CBEA7B] transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#CBEA7B] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section: Newsletter Signup */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-center md:text-left">
              Subscribe to our newsletter for the latest updates and health
              tips.
            </p>
            <form className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-2">
              <input
                type="email"
                required
                className="px-4 py-2 w-full md:w-auto rounded-md text-black"
                placeholder="Enter your email"
              />
              <button className="px-4 py-2 bg-[#CBEA7B] text-black hover:bg-[#B5D767] rounded-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Survive Universe. All rights
          reserved.
        </div>
      </footer>
    </>
  );
}
