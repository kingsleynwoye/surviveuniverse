import { FormEvent, useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Archivo } from "next/font/google";
import jsPDF from "jspdf";

const archivo = Archivo({ subsets: ["latin"] });

type Message = {
  text: string;
  sender: "user" | "bot";
};

const Modal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  const saveHandle = () => {
    const doc = new jsPDF();

    // Set the title of the document
    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.text("Recommendations", 20, 20);

    // Add the message content
    doc.setFontSize(12);
    doc.text(message, 20, 40);

    // Save the PDF with a specific name
    doc.save("recommendations.pdf");
  };

  // Function to read out the message
  const readMessage = () => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5 ${archivo.className}`}
    >
      <div className="bg-white text-[#00319d] p-5 rounded-3xl shadow-lg max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold">Recommendations</h3>
          <button
            className="bg-[#7ccf24] p-2 w-8 h-8 flex items-center rounded-full"
            onClick={onClose}
          >
            <svg
              width="44"
              height="45"
              viewBox="0 0 44 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="44" height="45" fill="url(#pattern0_16_9453)" />
              <defs>
                <pattern
                  id="pattern0_16_9453"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_16_9453"
                    transform="matrix(0.0104167 0 0 0.0101852 0 0.0111111)"
                  />
                </pattern>
                <image
                  id="image0_16_9453"
                  width="96"
                  height="96"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACZ0lEQVR4nO2dO27bUBBFh95AkK3YhVOmCQJ4Q3Znl9lamuwkgbKC60IeYExY1vuR82Z4D6BOJIfnkKBAPEAihBBCCCGEEEIIIYSQWAB4AnDvPcfWALgH8OQ9xzsAvODMCcA373m2AsAdgH9v5/rLex4ReScfmSOs5GOKCB/ITxnhgnzfCJ/ITxXhinyfCDg/cEs4IfCDGecH7qnwXPd7MAO4BfC3IkK4OwFlV77fhZY5wvTyzaDpIoSRbwZOEyGcfCVDhLDylcgRwstXIkZII1+JFCGdfCVChLTylZkjpJevzBjhMPKVmSIcTr4yQ4TDylc8IxxevuIRgfJX7BmB8i+wRwTKv8KWESi/kC0iUH4lIyNQfiMjIlB+Jz0RKH8QLREofzCoW4tzqvwu5ZeAujuB8rdgYATKb2VABMrvpSMC5Y+iIUIY+TfeAxSyvH1qtyG9oO53/voucF93FJoO+YzQywD5jNDKQPmMUAv4KsIPNLxYwwRLXlLQIt9sywg99Mg3+2CEFkbIN/tihBpGyjf7ZIQStpBv9s0In7GlfHMMRviIPeSbYzGCZU/55piMIOK7dOTwETzlmxmOGWEG+WaWY0WYSb6Z6RgRZpRvZssdYWb5ZsacESLIN7PmihBJvpk5R4SI8pXwESLLV8JGyCBfCRchk3wlTISM8pXpI2SWr+wVoXVx7g8R+Vrwvf8i8nNZlt+Nx3FjWZY/IvIg53O4xhcR+b7tRCsAPGa88tcU3gnPXsNdipBCvnIlgo98M9w6Qir5yoUIvvIVEyGlfGUVYQ75CvgnPoQQQgghhBBCCCGEkJl5BVu5aGpI3grTAAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          </button>
        </div>
        <p className="mb-6 text-black">{message}</p>
        <div className="flex gap-5">
          <button
            onClick={readMessage}
            className="bg-[#7ccf24] text-white w-full h-12 rounded-full"
          >
            Read
          </button>
          <button
            onClick={saveHandle}
            className="bg-[#7ccf24] text-white w-full h-12 rounded-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    "How you dey?", // Pidgin
    "How are you?", // English
    "Yaya?", // Spanish
    "Kedu?", // Igbo
    "Bawo ni?", // Yoruba
    "Comment ça va?", // French
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const medicalRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, [texts.length]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Form state management
  const [formData, setFormData] = useState({
    age: "",
    symptoms: "",
    medicalHistory: "",
    healthDescription: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataMessage = `
      Age: ${formData.age}
      Symptoms: ${formData.symptoms}
      Medical History: ${formData.medicalHistory}
      Health Description: ${formData.healthDescription}
    `;

    if (formDataMessage.trim()) {
      setIsLoading(true);
      const userMessage: Message = { text: formDataMessage, sender: "user" };
      setMessages([...messages, userMessage]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: formDataMessage }),
        });

        const data = await response.json();
        // console.log(data);
        const botMessage: Message = { text: data.text, sender: "bot" };
        setMessages([...messages, userMessage, botMessage]);

        // Set the response message and open the modal
        setModalMessage(data.text);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error:", error);
        const errorMessage: Message = {
          text: "Error getting response from bot",
          sender: "bot",
        };
        setMessages([...messages, userMessage, errorMessage]);
      } finally {
        setIsLoading(false); // Reset loading state

        // Reset form data to empty strings
        setFormData({
          age: "",
          symptoms: "",
          medicalHistory: "",
          healthDescription: "",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Survive Universe - Ace your sicknesses</title>
        <meta
          name="description"
          content="Take control of your health with Survive Universe! Get expert guidance, personalized care, and real-time support to tackle any illness and stay on top of your well-being."
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav */}
      <nav
        className={`${archivo.className} bg-white fixed top-0 right-0 w-full shadow-sm px-5 z-50`}
      >
        <div className="h-16 flex items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
              <svg
                width="144"
                height="50"
                viewBox="0 0 144 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M59.88 21.2C55.82 21.2 53.54 19.6 53.54 16.48V16.36H56.54V16.72C56.54 17.96 57.16 18.46 59.88 18.46C62.28 18.46 62.84 18.1 62.84 17.2C62.84 16.38 62.38 16.08 61 15.84L57.24 15.3C54.84 14.92 53.42 13.72 53.42 11.54C53.42 9.52 55.06 7.4 59.56 7.4C63.68 7.4 65.6 9.3 65.6 12.12V12.24H62.58V11.96C62.58 10.68 61.92 10.14 59.26 10.14C57.1 10.14 56.44 10.56 56.44 11.42C56.44 12.2 56.88 12.48 58 12.68L61.76 13.28C64.76 13.76 65.84 15.22 65.84 17.06C65.84 19.24 64.14 21.2 59.88 21.2ZM71.2017 21.2C68.3817 21.2 67.0417 19.46 67.0417 17.22V10.98H70.0417V16.22C70.0417 17.84 70.7217 18.52 72.6217 18.52C74.5817 18.52 75.2817 17.76 75.2817 16.06V10.98H78.2817V21H75.4817V17.94H75.3217C75.0617 19.62 73.8417 21.2 71.2017 21.2ZM82.8156 21H79.8156V10.98H82.5956V13.64H82.7756C83.0556 12.02 84.1156 10.78 86.1356 10.78C88.3756 10.78 89.2956 12.32 89.2956 14.28V15.94H86.2956V14.9C86.2956 13.8 85.8556 13.32 84.6356 13.32C83.2956 13.32 82.8156 13.94 82.8156 15.2V21ZM97.842 21H94.142L89.582 10.98H92.922L95.922 18.08H96.122L99.142 10.98H102.422L97.842 21ZM106.214 9.96H103.214V7.6H106.214V9.96ZM106.214 21H103.214V10.98H106.214V21ZM115.244 21H111.544L106.984 10.98H110.324L113.324 18.08H113.524L116.544 10.98H119.824L115.244 21ZM125.936 21.2C122.596 21.2 120.316 19.56 120.316 16C120.316 12.8 122.576 10.78 125.876 10.78C129.156 10.78 131.336 12.5 131.336 15.64C131.336 16 131.296 16.26 131.256 16.6H123.096C123.176 18.14 123.896 18.8 125.836 18.8C127.616 18.8 128.236 18.34 128.236 17.48V17.28H131.236V17.5C131.236 19.68 129.116 21.2 125.936 21.2ZM125.816 13.12C124.036 13.12 123.276 13.72 123.136 15.02H128.456C128.376 13.7 127.576 13.12 125.816 13.12Z"
                  fill="#7CCF24"
                />
                <path
                  d="M60.28 41.2C55.92 41.2 53.7 39 53.7 35.4V27.6H56.7V35.18C56.7 37.46 57.56 38.28 60.28 38.28C63.02 38.28 63.86 37.46 63.86 35.18V27.6H66.86V35.4C66.86 39 64.66 41.2 60.28 41.2ZM71.3703 41H68.3703V30.98H71.1503V34.06H71.3303C71.5903 32.38 72.7903 30.78 75.4103 30.78C78.1503 30.78 79.4503 32.54 79.4503 34.76V41H76.4503V35.76C76.4503 34.16 75.7903 33.48 73.9503 33.48C72.0503 33.48 71.3703 34.24 71.3703 35.94V41ZM83.968 29.96H80.968V27.6H83.968V29.96ZM83.968 41H80.968V30.98H83.968V41ZM92.9983 41H89.2983L84.7383 30.98H88.0783L91.0783 38.08H91.2783L94.2983 30.98H97.5783L92.9983 41ZM103.69 41.2C100.35 41.2 98.0703 39.56 98.0703 36C98.0703 32.8 100.33 30.78 103.63 30.78C106.91 30.78 109.09 32.5 109.09 35.64C109.09 36 109.05 36.26 109.01 36.6H100.85C100.93 38.14 101.65 38.8 103.59 38.8C105.37 38.8 105.99 38.34 105.99 37.48V37.28H108.99V37.5C108.99 39.68 106.87 41.2 103.69 41.2ZM103.57 33.12C101.79 33.12 101.03 33.72 100.89 35.02H106.21C106.13 33.7 105.33 33.12 103.57 33.12ZM113.363 41H110.363V30.98H113.143V33.64H113.323C113.603 32.02 114.663 30.78 116.683 30.78C118.923 30.78 119.842 32.32 119.842 34.28V35.94H116.843V34.9C116.843 33.8 116.403 33.32 115.183 33.32C113.843 33.32 113.363 33.94 113.363 35.2V41ZM125.989 41.2C122.609 41.2 120.749 39.88 120.749 37.56V37.5H123.749V37.68C123.749 38.58 124.309 38.82 126.009 38.82C127.609 38.82 127.989 38.56 127.989 37.96C127.989 37.4 127.689 37.24 126.509 37.08L123.689 36.74C121.689 36.52 120.569 35.62 120.569 33.94C120.569 32.18 122.069 30.78 125.509 30.78C128.789 30.78 130.649 32.02 130.649 34.46V34.52H127.649V34.4C127.649 33.58 127.249 33.16 125.409 33.16C123.909 33.16 123.529 33.42 123.529 34.06C123.529 34.58 123.809 34.8 125.129 34.96L127.269 35.22C129.949 35.52 130.949 36.42 130.949 38.08C130.949 39.96 129.089 41.2 125.989 41.2ZM137.479 41.2C134.139 41.2 131.859 39.56 131.859 36C131.859 32.8 134.119 30.78 137.419 30.78C140.699 30.78 142.879 32.5 142.879 35.64C142.879 36 142.839 36.26 142.799 36.6H134.639C134.719 38.14 135.439 38.8 137.379 38.8C139.159 38.8 139.779 38.34 139.779 37.48V37.28H142.779V37.5C142.779 39.68 140.659 41.2 137.479 41.2ZM137.359 33.12C135.579 33.12 134.819 33.72 134.679 35.02H139.999C139.919 33.7 139.119 33.12 137.359 33.12Z"
                  fill="#00319D"
                />
                <path
                  d="M34.3672 28.8886V33.1204C34.3672 33.4128 34.3538 33.7023 34.3264 33.9874C33.8873 38.7978 29.8245 42.5794 24.8947 42.5794C19.9822 42.5794 15.9311 38.8235 15.4685 34.0365C11.2029 33.1204 8 29.3215 8 24.7923C8 20.2631 11.2041 16.4664 15.4702 15.5459C16.1276 15.4044 16.7983 15.3331 17.4708 15.3333H19.1631C19.0849 15.7153 19.046 16.1044 19.0469 16.4944V20.8021C19.0469 21.2821 18.856 21.7424 18.516 22.0819C18.1762 22.4212 17.7152 22.6119 17.2345 22.6119C16.7538 22.6119 16.2928 22.4212 15.953 22.0819C15.6131 21.7424 15.4222 21.2821 15.4222 20.8021V19.3246C14.3073 19.7417 13.3465 20.4887 12.6682 21.4657C11.9899 22.4428 11.6265 23.6034 11.6265 24.7923C11.6265 25.9812 11.9899 27.1418 12.6682 28.1188C13.3465 29.0959 14.3073 29.8429 15.4222 30.2599C16.077 30.5061 16.7711 30.6316 17.4708 30.6304H20.2592C20.7345 30.6387 21.1874 30.8331 21.5206 31.1716C21.8537 31.5103 22.0403 31.9659 22.0403 32.4405C22.0403 32.9152 21.8537 33.3709 21.5206 33.7095C21.1874 34.048 20.7345 34.2424 20.2592 34.2507H19.1569C19.4381 35.6737 20.2394 36.9411 21.405 37.8064C22.5705 38.6717 24.0167 39.0729 25.4622 38.9319C26.9076 38.7908 28.2488 38.1176 29.2245 37.0434C30.2002 35.9691 30.7408 34.5707 30.7408 33.1204V28.8886C30.7408 28.4085 30.9317 27.9482 31.2716 27.6087C31.6115 27.2694 32.0724 27.0787 32.5531 27.0787C33.0338 27.0787 33.4948 27.2694 33.8347 27.6087C34.1746 27.9482 34.3655 28.4085 34.3655 28.8886H34.3672Z"
                  fill="#00319D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.3787 19.3967V19.3976C33.6632 19.0969 32.8946 18.9425 32.1184 18.9438H29.2522C28.7713 18.9438 28.3101 18.7528 27.9701 18.4127C27.6301 18.0727 27.439 17.6115 27.439 17.1306C27.439 16.6497 27.6301 16.1885 27.9701 15.8485C28.3101 15.5085 28.7713 15.3174 29.2522 15.3174H30.6339C30.3658 13.9946 29.6485 12.8051 28.6035 11.9507C27.5586 11.0963 26.2504 10.6295 24.9006 10.6295C23.5508 10.6295 22.2426 11.0963 21.1977 11.9507C20.1528 12.8051 19.4355 13.9946 19.1674 15.3174H17.4749C16.8022 15.3163 16.1313 15.3867 15.4734 15.5276C15.9491 10.7454 19.9946 7 24.9003 7C29.8223 7 33.8807 10.7711 34.3335 15.5768L34.3338 15.5797C38.4938 16.5775 41.5934 20.329 41.5934 24.7908C41.5934 29.251 38.4953 33.0021 34.3363 34.0031C34.3636 33.7175 34.377 33.4274 34.377 33.1345V30.1867C35.4406 29.7414 36.3489 28.9917 36.9876 28.0317C37.6264 27.0717 37.9672 25.9444 37.9672 24.7914C37.9672 23.6383 37.6264 22.511 36.9876 21.551C36.3492 20.5916 35.4416 19.8421 34.3787 19.3967Z"
                  fill="#7CCF24"
                />
              </svg>
            </button>
          </div>
          {/* Right side: Auth Links */}
          <div className="flex items-center space-x-4">
            {/* Nav Links */}
            <ul className="hidden md:flex items-center space-x-6">
              <li>
                <button
                  onClick={() => {
                    scrollToSection(featuresRef);
                    setMenuOpen(false);
                  }}
                  className="text-[#00319d] font-medium text-lg"
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
                  className="text-[#00319d] font-medium text-lg"
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
                  className="text-[#00319d] font-medium text-lg"
                >
                  Medical
                </button>
              </li>
              <button
                onClick={() => {
                  scrollToSection(getStartedRef);
                  setMenuOpen(false);
                }}
                className="bg-[#00319d] text-[#7ccf24] px-5 py-2 rounded-full font-medium transition duration-200 text-lg"
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
                className="text-lg font-medium text-[#00319d]"
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
                className="text-lg font-medium text-[#00319d]"
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
                className="text-lg font-medium text-[#00319d]"
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
                className="bg-[#00319d] text-[#7ccf24] px-5 py-2 rounded-full text-lg font-medium transition duration-200"
              >
                Get Started
              </button>
            </li>
          </ul>
        )}
      </nav>
      {/* Main Content */}
      <main className={`${archivo.className}`}>
        {/* Hero Content */}
        <section
          ref={heroRef}
          // className="inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"
          className="bg-[#00319d]"
        >
          <div className="h-[50vh] md:h-[60vh] flex items-center justify-center mt-16">
            <div className="container max-w-6xl mx-auto md:px-20 flex flex-col items-center justify-center text-center space-y-5">
              <h1 className="text-4xl md:text-8xl font-extrabold text-[#FFFFFF]">
                {texts[currentTextIndex]}
              </h1>
              <p className="text-lg text-[#fff9] max-w-3xl">
                We care about your Health.
              </p>
              <button
                onClick={() => scrollToSection(getStartedRef)}
                className="bg-[#7ccf24] text-[#00319d] px-12 h-12 rounded-none font-medium transition duration-200 shadow-2xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
        {/* Features Content */}
        <section ref={featuresRef} className="bg-[#00319d]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#7ccf24]">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-transparent p-8 rounded-none border">
                {/* <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mb-6"
                /> */}
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M22.3335 6.81066L35.5228 20L22.3335 33.1893V27.5V26.75H21.5835H17.3335V13.25H21.5835H22.3335V12.5V6.81066Z"
                    fill="#B1FF5C"
                    stroke="#B1FF5C"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M21.5835 5L36.5835 20L21.5835 35V27.5H16.5835V12.5H21.5835V5Z"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold my-4 text-[#e3f6cf]">
                  Master Every Topic
                </h3>
                <p className="text-[#fff9]">
                  Sharpen your answer to every question through our AI-powered
                  interview
                </p>
              </div>
              <div className="bg-transparent p-8 rounded-none border">
                {/* <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mb-6"
                /> */}
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M22.3335 6.81066L35.5228 20L22.3335 33.1893V27.5V26.75H21.5835H17.3335V13.25H21.5835H22.3335V12.5V6.81066Z"
                    fill="#B1FF5C"
                    stroke="#B1FF5C"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M21.5835 5L36.5835 20L21.5835 35V27.5H16.5835V12.5H21.5835V5Z"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold my-4 text-[#e3f6cf]">
                  Tailored Recommendation
                </h3>
                <p className="text-[#fff9]">
                  Get expert advice on how to show your expertise in each
                  question effectively
                </p>
              </div>
              <div className="bg-transparent p-8 rounded-none border">
                {/* <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mb-6"
                /> */}
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    d="M22.3335 6.81066L35.5228 20L22.3335 33.1893V27.5V26.75H21.5835H17.3335V13.25H21.5835H22.3335V12.5V6.81066Z"
                    fill="#B1FF5C"
                    stroke="#B1FF5C"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M21.5835 5L36.5835 20L21.5835 35V27.5H16.5835V12.5H21.5835V5Z"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5835 27.5V12.5"
                    stroke="#B1FF5C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold my-4 text-[#e3f6cf]">
                  Real-Time Feedback
                </h3>
                <p className="text-[#fff9]">
                  Improve your answers through real-time feedback
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Health Content */}
        <section ref={healthRef} className="bg-[#00319d]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#7ccf24]">
              Health is Wealth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Health Assistance */}
              {/* <div className="bg-[#7ccf24] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF] text-center">
                  Health Assistance
                </h3>
                <p className="text-black text-center">
                  Our platform offers comprehensive health assistance to guide
                  you through your wellness journey. From fitness tips to diet
                  recommendations, we have you covered.
                </p>
              </div> */}
              {/* Health Monitoring */}
              {/* <div className="bg-[#7ccf24] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF] text-center">
                  Health Monitoring
                </h3>
                <p className="text-black text-center">
                  Monitor your health metrics with our advanced tracking tools.
                  Keep an eye on your progress and stay motivated with real-time
                  updates.
                </p>
              </div> */}
            </div>
          </div>
        </section>
        {/* Medical Content */}
        <section ref={medicalRef} className="bg-[#00319d]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#7ccf24]">
              Medical is Vitamin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Medical Consultation */}
              {/* <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#00319d] text-center">
                  Medical Consultation
                </h3>
                <p className="text-[#fff9] text-center">
                  Get expert medical consultations through our platform. Speak
                  to qualified professionals who can provide you with the
                  assistance you need.
                </p>
              </div> */}
              {/* Prescription Assistance */}
              {/* <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#00319d] text-center">
                  Prescription Assistance
                </h3>
                <p className="text-[#fff9] text-center">
                  Obtain guidance on prescriptions and medications with ease.
                  Our platform helps you manage your medication effectively.
                </p>
              </div> */}
            </div>
          </div>
        </section>
        {/* Get Started Section */}
        <section ref={getStartedRef} className="bg-[#00319d]">
          <div className="px-6 py-20">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-bold text-center text-white">
                Get Started
              </h2>
              <p className="text-gray-400">
                Fill with correct information to get best results.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-lg font-medium text-gray-400"
                >
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-none text-white outline-none bg-white"
                  placeholder="Your age eg: 20years"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="symptoms"
                  className="block text-lg font-medium text-gray-400"
                >
                  Symptoms
                </label>
                <input
                  type="text"
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-none text-white outline-none bg-white"
                  placeholder="Your symptoms eg: Headache"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="medicalHistory"
                  className="block text-lg font-medium text-gray-400"
                >
                  Medical History
                </label>
                <input
                  type="text"
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-none text-white outline-none bg-white"
                  placeholder="Your medical history eg: Allergies"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="healthDescription"
                  className="block text-lg font-medium text-gray-400"
                >
                  Health Description
                </label>
                <textarea
                  id="healthDescription"
                  name="healthDescription"
                  value={formData.healthDescription}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-none text-white outline-none bg-white"
                  placeholder="Your health description eg: I'm having Fever"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className={`bg-[#7ccf24] text-[#00319d] px-4 py-3 rounded-none w-full ${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className={`bg-[#00319d] ${archivo.className}`}>
        <div className="flex items-center justify-between p-5 h-16">
          <p className="text-white py-2 text-base">
            &copy; 2024 Survive Universe
          </p>
          <div className="flex items-center gap-2">
            {/* <p className="text-white py-2 text-base">Got To Top</p> */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer w-10 h-10"
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
              <rect width="48" height="48" rx="24" fill="#7ccf24" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.0002 30C23.5031 30 23.1002 29.5971 23.1002 29.1L23.1002 21.1345L20.7489 23.7238C20.4044 24.0821 19.8347 24.0933 19.4764 23.7487C19.1181 23.4042 19.1069 22.8345 19.4514 22.4762L23.3514 18.2762C23.5211 18.0997 23.7554 18 24.0002 18C24.245 18 24.4793 18.0997 24.6489 18.2762L28.5489 22.4762C28.8935 22.8345 28.8823 23.4042 28.524 23.7487C28.1657 24.0933 27.596 24.0821 27.2514 23.7238L24.9002 21.1345V29.1C24.9002 29.5971 24.4973 30 24.0002 30Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </footer>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
