import { FormEvent, useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["How are you?", "Yaya kake?", "Kedu?"];

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const medicalRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, [texts.length]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        const botMessage: Message = { text: data.text, sender: "bot" };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error("Error:", error);
        const errorMessage: Message = {
          text: "Error getting response from bot",
          sender: "bot",
        };
        setMessages([...messages, userMessage, errorMessage]);
      }
    }
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Survive Universe | Health and Medical Assistant</title>
        <meta
          name="description"
          content="Your personal companion for navigating tough times."
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav */}
      <nav
        className={`${inter.className} bg-[#FFFFFF] fixed top-5 left-0 right-0 mx-auto max-w-6xl rounded-full shadow-md px-5`}
      >
        <div className="h-16 flex items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button
              className="text-2xl font-bold text-black"
              onClick={() => scrollToSection(heroRef)}
            >
              Survive Universe
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
                onClick={() => scrollToSection(chatRef)}
                className="bg-black text-white px-5 py-2 rounded-full font-medium transition duration-200"
              >
                Chat
              </button>
            </ul>
            <button
              className="text-white md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
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

      {/* Main Content */}
      <main className={`${inter.className}`}>
        {/* Hero Content */}
        <section
          ref={heroRef}
          className="bg-[#0C513F] h-[60vh] flex items-center justify-center"
        >
          <div className="container max-w-6xl mx-auto md:px-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-8xl font-extrabold">
              {texts[currentTextIndex]}
            </h1>
          </div>
        </section>

        {/* Features Content */}
        <section ref={featuresRef} className="bg-[#22ad80] py-20">
          <div className="container mx-auto px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1: Personalized Health Guidance */}
              <div className="bg-[#F1F5F9] p-8 rounded-lg shadow-md text-center">
                <Image
                  src="/guidance-icon.png"
                  alt="Personalized Health Guidance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Personalized Health Guidance
                </h3>
                <p className="text-gray-600">
                  Receive advice tailored to your specific health needs, helping
                  you stay on track with your wellness goals.
                </p>
              </div>
              {/* Feature 2: Medical Resources */}
              <div className="bg-[#F1F5F9] p-8 rounded-lg shadow-md text-center">
                <Image
                  src="/resources-icon.png"
                  alt="Medical Resources"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black">
                  Medical Resources
                </h3>
                <p className="text-gray-600">
                  Access a curated library of reliable medical resources to
                  educate yourself on various health topics.
                </p>
              </div>
              {/* Feature 3: 24/7 Chat Support */}
              <div className="bg-[#F1F5F9] p-8 rounded-lg shadow-md text-center">
                <Image
                  src="/chat-icon.png"
                  alt="24/7 Chat Support"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black">
                  24/7 Chat Support
                </h3>
                <p className="text-gray-600">
                  Connect with health experts anytime, anywhere, and get
                  real-time advice for any challenges you face.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Content */}
        <section ref={healthRef} className="bg-[#8c77ec] py-20">
          <div className="container mx-auto px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Health is Wealth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Health Assistance */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Image
                  src="/health-icon.png"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black text-center">
                  Health Assistance
                </h3>
                <p className="text-gray-600 text-center">
                  Our platform offers comprehensive health assistance to guide
                  you through your wellness journey. From fitness tips to diet
                  recommendations, we have you covered.
                </p>
              </div>
              {/* Health Monitoring */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Image
                  src="/monitoring-icon.png"
                  alt="Health Monitoring"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black text-center">
                  Health Monitoring
                </h3>
                <p className="text-gray-600 text-center">
                  Monitor your health metrics with our advanced tracking tools.
                  Keep an eye on your progress and stay motivated with real-time
                  updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Content */}
        <section ref={medicalRef} className="bg-[#ff884d] py-20">
          <div className="container mx-auto px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Medical is Vitamin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Medical Consultation */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Image
                  src="/consultation-icon.png"
                  alt="Medical Consultation"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black text-center">
                  Medical Consultation
                </h3>
                <p className="text-gray-600 text-center">
                  Get expert medical consultations through our platform. Speak
                  to qualified professionals who can provide you with the
                  assistance you need.
                </p>
              </div>
              {/* Prescription Assistance */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Image
                  src="/prescription-icon.png"
                  alt="Prescription Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-black text-center">
                  Prescription Assistance
                </h3>
                <p className="text-gray-600 text-center">
                  Obtain guidance on prescriptions and medications with ease.
                  Our platform helps you manage your medication effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section ref={chatRef} className="bg-[#212121] py-20">
          <div className="container mx-auto px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Chat Now
            </h2>
            <div className="bg-[#000000] p-8 rounded-lg shadow-md">
              {/* Chat Interface */}
              <div className="overflow-y-auto h-64">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-[#27BC4D] text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="mt-4 flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-2 rounded-l-lg bg-[#2f2f2f] outline-none"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-[#27BC4D] text-white px-4 rounded-r-lg"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
