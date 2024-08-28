import { FormEvent, useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Archivo } from "next/font/google";

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
}) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5 ${archivo.className}`}
  >
    <div className="bg-white text-[#06281C] p-5 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Recommendations</h2>
      <p className="mb-6 text-black">{message}</p>
      <button
        onClick={onClose}
        className="bg-[#234338] text-white px-5 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

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
        <title>Survive Universe | Health and Medical Platform</title>
        <meta
          name="description"
          content="Survive Universe is a health and medical platform that guides users for navigating tough times."
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav */}
      <nav
        className={`${archivo.className} bg-[#FFFFFF] fixed top-0 right-0 w-full shadow-sm px-5 z-50`}
      >
        <div className="h-16 flex items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button onClick={() => scrollToSection(heroRef)}>
              {/* <svg
                width="208"
                height="23"
                viewBox="0 0 208 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  scrollToSection(heroRef);
                  // setMenuOpen(false);
                }}
              >
                <path
                  d="M18.75 15.31C18.75 19.42 15.45 22.3 10.05 22.3C4.62 22.3 1.23 19.39 0.9 14.83H5.52C5.64 17.2 7.17 18.73 9.96 18.73C12.27 18.73 13.92 17.71 13.92 15.97C13.92 14.62 12.87 13.81 11.04 13.45L7.5 12.76C4.23 12.13 1.71 10.36 1.71 6.79C1.71 2.95 5.1 0.189998 9.75 0.189998C14.58 0.189998 18.12 3.01 18.42 7.51H13.8C13.65 5.26 12.09 3.73 9.81 3.73C7.59 3.73 6.33 4.99 6.33 6.49C6.33 7.96 7.68 8.59 9.24 8.89L12.93 9.64C16.71 10.39 18.75 12.13 18.75 15.31ZM29.5676 16.375V8.65H33.0176V22H29.8426V20.25C29.1176 21.425 27.6426 22.25 25.9426 22.25C23.2676 22.25 21.3176 20.625 21.3176 17.15V8.65H24.7926V16.475C24.7926 18.35 25.7176 19.175 27.1176 19.175C28.3676 19.175 29.5676 18.175 29.5676 16.375ZM39.6148 15.525V22H36.1398V8.65H39.3398V11.225C40.3148 9.525 42.3898 8.5 44.5398 8.5V12.1C41.5898 11.875 39.6148 12.575 39.6148 15.525ZM58.6141 8.65L53.7141 22H49.9141L44.9891 8.65H48.7391L51.9141 18.05L55.1141 8.65H58.6141ZM64.1639 5.55C64.1639 6.725 63.2139 7.6 61.8389 7.6C60.4889 7.6 59.5389 6.725 59.5389 5.55C59.5389 4.325 60.4889 3.45 61.8389 3.45C63.2139 3.45 64.1639 4.325 64.1639 5.55ZM63.6139 22H60.1389V8.65H63.6139V22ZM78.7313 8.65L73.8313 22H70.0313L65.1062 8.65H68.8563L72.0313 18.05L75.2313 8.65H78.7313ZM85.5922 22.225C81.5922 22.225 78.9172 19.45 78.9172 15.275C78.9172 11.3 81.6922 8.4 85.5422 8.4C89.7672 8.4 92.5672 11.825 91.9422 16.175H82.4672C82.6922 18.35 83.7422 19.55 85.5172 19.55C87.0422 19.55 88.0672 18.8 88.4672 17.475H91.9172C91.1672 20.5 88.8422 22.225 85.5922 22.225ZM85.4672 10.95C83.8422 10.95 82.8172 12 82.5172 13.975H88.2672C88.1672 12.125 87.1172 10.95 85.4672 10.95ZM117.834 0.459998V13.81C117.834 18.91 114.594 22.45 108.984 22.45C103.284 22.45 100.104 18.91 100.104 13.81V0.459998H104.664V13.9C104.664 16.57 105.954 18.37 108.984 18.37C111.984 18.37 113.274 16.57 113.274 13.9V0.459998H117.834ZM125.001 14.725V22H121.526V8.65H124.726V10.55C125.701 9.225 127.076 8.4 128.826 8.4C131.501 8.4 133.351 10.15 133.351 13.375V22H129.901V14.55C129.901 12.575 129.126 11.475 127.551 11.475C126.176 11.475 125.001 12.575 125.001 14.725ZM140.37 5.55C140.37 6.725 139.42 7.6 138.045 7.6C136.695 7.6 135.745 6.725 135.745 5.55C135.745 4.325 136.695 3.45 138.045 3.45C139.42 3.45 140.37 4.325 140.37 5.55ZM139.82 22H136.345V8.65H139.82V22ZM154.937 8.65L150.037 22H146.237L141.312 8.65H145.062L148.237 18.05L151.437 8.65H154.937ZM161.798 22.225C157.798 22.225 155.123 19.45 155.123 15.275C155.123 11.3 157.898 8.4 161.748 8.4C165.973 8.4 168.773 11.825 168.148 16.175H158.673C158.898 18.35 159.948 19.55 161.723 19.55C163.248 19.55 164.273 18.8 164.673 17.475H168.123C167.373 20.5 165.048 22.225 161.798 22.225ZM161.673 10.95C160.048 10.95 159.023 12 158.723 13.975H164.473C164.373 12.125 163.323 10.95 161.673 10.95ZM173.951 15.525V22H170.476V8.65H173.676V11.225C174.651 9.525 176.726 8.5 178.876 8.5V12.1C175.926 11.875 173.951 12.575 173.951 15.525ZM191.956 17.725C191.956 20.525 189.831 22.25 186.031 22.25C182.231 22.25 180.106 20.425 179.831 17.45H183.156C183.181 18.825 184.356 19.7 186.081 19.7C187.431 19.7 188.456 19.275 188.456 18.325C188.456 17.475 187.906 17.125 186.631 16.875L184.231 16.425C181.831 16 180.381 14.675 180.381 12.6C180.381 10.125 182.506 8.4 185.831 8.4C189.181 8.4 191.481 10.175 191.731 13.05H188.406C188.281 11.75 187.306 10.95 185.831 10.95C184.556 10.95 183.706 11.425 183.706 12.275C183.706 13.075 184.256 13.4 185.456 13.625L188.031 14.1C190.631 14.6 191.956 15.8 191.956 17.725ZM200.128 22.225C196.128 22.225 193.453 19.45 193.453 15.275C193.453 11.3 196.228 8.4 200.078 8.4C204.303 8.4 207.103 11.825 206.478 16.175H197.003C197.228 18.35 198.278 19.55 200.053 19.55C201.578 19.55 202.603 18.8 203.003 17.475H206.453C205.703 20.5 203.378 22.225 200.128 22.225ZM200.003 10.95C198.378 10.95 197.353 12 197.053 13.975H202.803C202.703 12.125 201.653 10.95 200.003 10.95Z"
                  fill="#06281C"
                />
              </svg> */}
              <svg
                width="146"
                height="50"
                viewBox="0 0 146 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M61.88 21.2C57.82 21.2 55.54 19.6 55.54 16.48V16.36H58.54V16.72C58.54 17.96 59.16 18.46 61.88 18.46C64.28 18.46 64.84 18.1 64.84 17.2C64.84 16.38 64.38 16.08 63 15.84L59.24 15.3C56.84 14.92 55.42 13.72 55.42 11.54C55.42 9.52 57.06 7.4 61.56 7.4C65.68 7.4 67.6 9.3 67.6 12.12V12.24H64.58V11.96C64.58 10.68 63.92 10.14 61.26 10.14C59.1 10.14 58.44 10.56 58.44 11.42C58.44 12.2 58.88 12.48 60 12.68L63.76 13.28C66.76 13.76 67.84 15.22 67.84 17.06C67.84 19.24 66.14 21.2 61.88 21.2ZM73.2017 21.2C70.3817 21.2 69.0417 19.46 69.0417 17.22V10.98H72.0417V16.22C72.0417 17.84 72.7217 18.52 74.6217 18.52C76.5817 18.52 77.2817 17.76 77.2817 16.06V10.98H80.2817V21H77.4817V17.94H77.3217C77.0617 19.62 75.8417 21.2 73.2017 21.2ZM84.8156 21H81.8156V10.98H84.5956V13.64H84.7756C85.0556 12.02 86.1156 10.78 88.1356 10.78C90.3756 10.78 91.2956 12.32 91.2956 14.28V15.94H88.2956V14.9C88.2956 13.8 87.8556 13.32 86.6356 13.32C85.2956 13.32 84.8156 13.94 84.8156 15.2V21ZM99.842 21H96.142L91.582 10.98H94.922L97.922 18.08H98.122L101.142 10.98H104.422L99.842 21ZM108.214 9.96H105.214V7.6H108.214V9.96ZM108.214 21H105.214V10.98H108.214V21ZM117.244 21H113.544L108.984 10.98H112.324L115.324 18.08H115.524L118.544 10.98H121.824L117.244 21ZM127.936 21.2C124.596 21.2 122.316 19.56 122.316 16C122.316 12.8 124.576 10.78 127.876 10.78C131.156 10.78 133.336 12.5 133.336 15.64C133.336 16 133.296 16.26 133.256 16.6H125.096C125.176 18.14 125.896 18.8 127.836 18.8C129.616 18.8 130.236 18.34 130.236 17.48V17.28H133.236V17.5C133.236 19.68 131.116 21.2 127.936 21.2ZM127.816 13.12C126.036 13.12 125.276 13.72 125.136 15.02H130.456C130.376 13.7 129.576 13.12 127.816 13.12ZM62.28 41.2C57.92 41.2 55.7 39 55.7 35.4V27.6H58.7V35.18C58.7 37.46 59.56 38.28 62.28 38.28C65.02 38.28 65.86 37.46 65.86 35.18V27.6H68.86V35.4C68.86 39 66.66 41.2 62.28 41.2ZM73.3703 41H70.3703V30.98H73.1503V34.06H73.3303C73.5903 32.38 74.7903 30.78 77.4103 30.78C80.1503 30.78 81.4503 32.54 81.4503 34.76V41H78.4503V35.76C78.4503 34.16 77.7903 33.48 75.9503 33.48C74.0503 33.48 73.3703 34.24 73.3703 35.94V41ZM85.968 29.96H82.968V27.6H85.968V29.96ZM85.968 41H82.968V30.98H85.968V41ZM94.9983 41H91.2983L86.7383 30.98H90.0783L93.0783 38.08H93.2783L96.2983 30.98H99.5783L94.9983 41ZM105.69 41.2C102.35 41.2 100.07 39.56 100.07 36C100.07 32.8 102.33 30.78 105.63 30.78C108.91 30.78 111.09 32.5 111.09 35.64C111.09 36 111.05 36.26 111.01 36.6H102.85C102.93 38.14 103.65 38.8 105.59 38.8C107.37 38.8 107.99 38.34 107.99 37.48V37.28H110.99V37.5C110.99 39.68 108.87 41.2 105.69 41.2ZM105.57 33.12C103.79 33.12 103.03 33.72 102.89 35.02H108.21C108.13 33.7 107.33 33.12 105.57 33.12ZM115.363 41H112.363V30.98H115.143V33.64H115.323C115.603 32.02 116.663 30.78 118.683 30.78C120.923 30.78 121.842 32.32 121.842 34.28V35.94H118.843V34.9C118.843 33.8 118.403 33.32 117.183 33.32C115.843 33.32 115.363 33.94 115.363 35.2V41ZM127.989 41.2C124.609 41.2 122.749 39.88 122.749 37.56V37.5H125.749V37.68C125.749 38.58 126.309 38.82 128.009 38.82C129.609 38.82 129.989 38.56 129.989 37.96C129.989 37.4 129.689 37.24 128.509 37.08L125.689 36.74C123.689 36.52 122.569 35.62 122.569 33.94C122.569 32.18 124.069 30.78 127.509 30.78C130.789 30.78 132.649 32.02 132.649 34.46V34.52H129.649V34.4C129.649 33.58 129.249 33.16 127.409 33.16C125.909 33.16 125.529 33.42 125.529 34.06C125.529 34.58 125.809 34.8 127.129 34.96L129.269 35.22C131.949 35.52 132.949 36.42 132.949 38.08C132.949 39.96 131.089 41.2 127.989 41.2ZM139.479 41.2C136.139 41.2 133.859 39.56 133.859 36C133.859 32.8 136.119 30.78 139.419 30.78C142.699 30.78 144.879 32.5 144.879 35.64C144.879 36 144.839 36.26 144.799 36.6H136.639C136.719 38.14 137.439 38.8 139.379 38.8C141.159 38.8 141.779 38.34 141.779 37.48V37.28H144.779V37.5C144.779 39.68 142.659 41.2 139.479 41.2ZM139.359 33.12C137.579 33.12 136.819 33.72 136.679 35.02H141.999C141.919 33.7 141.119 33.12 139.359 33.12Z"
                  fill="#06281C"
                />
                <g clip-path="url(#clip0_132_22)">
                  <path
                    d="M42.9315 24.7696C42.5046 25.3494 41.1492 27.0525 38.4861 29.7823C37.9138 30.3677 37.46 30.7652 36.8754 31.2753C35.4215 32.5487 34.2508 33.376 32.4031 34.6766C30.8577 35.7671 29.6538 36.5462 28.8846 37.0456C27.5761 37.8943 26.8661 38.3779 25.8531 38.9424C24.9585 39.4418 23.4985 40.2317 21.6308 41.1019C16.6531 43.4285 13.3315 44.1266 10.7869 44.5943C9.11615 44.9006 7.07076 45.1582 5.69692 44.1968C4.92692 43.6215 4.42076 42.8266 4.26999 41.9722C3.88153 39.6785 7.34076 34.9557 11.8123 29.9595C11.8585 29.9108 11.8846 29.8519 11.8846 29.7873C11.8846 29.7551 11.8846 29.7228 11.8846 29.6854C12.3323 31.9525 13.6477 33.9779 15.5346 35.5361C16.0346 35.9443 16.7708 36.1 17.4554 35.9601C23.7354 34.6551 28.9769 30.7703 30.5423 28.4063C30.7392 28.1108 30.8508 27.7835 30.8638 27.45C31.0946 22.6798 25.7808 19.6867 20.25 20.4715C21.7692 19.8804 23.3608 19.5576 24.9654 19.4665C25.5046 19.4342 26.0438 19.4291 26.5761 19.4449C30.5423 19.5741 34.3954 21.0139 37.0592 23.1253C37.1185 23.1734 37.1646 23.2114 37.1838 23.2222C37.1969 23.238 37.2169 23.2544 37.23 23.276C37.2431 23.2595 37.2561 23.2487 37.2631 23.2329C35.5469 20.4335 32.0808 18.2848 28.1023 17.5057L35.8685 11.0639C35.9215 11.0209 35.8492 10.9456 35.7831 10.9835C31.5746 13.6589 30.7131 13.9652 26.4846 17.2367C26.6223 17.2589 26.7538 17.2905 26.8923 17.3177C25.6692 17.1671 24.4131 17.1405 23.15 17.2747C20.6115 17.543 18.29 18.4082 16.4092 19.6975C13.9961 21.3525 12.3123 23.7 11.8454 26.3544C11.8454 26.3544 11.8454 26.3544 11.8454 26.3595C11.7338 26.9987 11.6946 27.6272 11.7138 28.2456C8.32692 31.7158 5.0323 35.9013 3.04615 38.8829C2.32999 39.9576 1.78384 40.8766 1.46846 41.5481C1.09307 42.4076 0.725378 43.1652 0.468455 43.9063C0.185378 44.7336 -0.0638523 45.4968 0.0146092 46.4798C0.05384 46.926 0.126917 47.2589 0.396148 47.7589C1.00153 48.8924 2.38846 49.5424 3.83538 49.8215C5.13076 50.069 9.08999 50.5848 16.7054 47.0544C18.9154 46.0285 20.8946 44.9222 22.6569 43.788C30.5685 39.157 38.6438 32.0437 43.0569 24.8228C43.0961 24.7589 42.9777 24.7051 42.9315 24.7696Z"
                    fill="#06281C"
                  />
                  <path
                    d="M49.7577 17.2582C48.9485 17.1133 46.9561 16.8987 46.64 16.6354C46.2654 16.3399 45.9692 14.6956 45.7985 13.9652C45.7854 13.9006 45.6738 13.9006 45.6608 13.9652C45.4831 14.6956 45.1938 16.3342 44.8123 16.6354C44.4961 16.8987 42.4446 17.1133 41.6162 17.2582C41.5438 17.269 41.5438 17.3551 41.6162 17.3709C42.4377 17.5165 44.4961 17.731 44.8123 17.9943C45.1869 18.2956 45.4831 19.8747 45.6608 20.5892C45.6738 20.6487 45.7854 20.6487 45.7985 20.5892C45.9761 19.8747 46.2654 18.2956 46.64 17.9943C46.9561 17.731 48.9485 17.5165 49.7577 17.3709C49.83 17.3601 49.83 17.2747 49.7577 17.2582Z"
                    fill="#06281C"
                  />
                  <path
                    d="M28.2277 8.60318C30.4838 8.74305 35.4615 8.92533 37.0861 9.14558C37.3692 9.18356 37.5531 9.2209 37.5992 9.26394C37.6446 9.30128 37.6908 9.40381 37.7308 9.55951C38.0592 10.7469 38.3292 15.0342 38.5069 17.0272C38.52 17.1506 38.7431 17.1506 38.75 17.0272C38.9538 14.776 39.2692 9.58103 39.6577 9.26394C39.9861 8.99558 46.3915 8.76457 49.0415 8.60318C49.1931 8.59242 49.1931 8.40951 49.0415 8.40445C46.3915 8.24305 39.9931 8.01204 39.6577 7.74369C39.2692 7.4266 38.9538 2.3171 38.75 0.0930516C38.7369 -0.0303662 38.5131 -0.0303662 38.5069 0.0930516C38.3031 2.31204 37.9938 7.43166 37.5992 7.74369C37.27 8.01774 30.8715 8.24305 28.2277 8.40445C28.0769 8.4152 28.0769 8.59748 28.2277 8.60318Z"
                    fill="#06281C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_132_22">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          {/* Right side: Auth Links */}
          <div className="flex items-center space-x-4">
            {/* Nav Links */}
            <ul className="hidden md:flex items-center space-x-6 text-[#06281C]">
              <li>
                <button
                  onClick={() => scrollToSection(featuresRef)}
                  className="hover:text-gray-600 font-medium text-lg"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(healthRef)}
                  className="hover:text-gray-600 font-medium text-lg"
                >
                  Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(medicalRef)}
                  className="hover:text-gray-600 font-medium text-lg"
                >
                  Medical
                </button>
              </li>
              <button
                onClick={() => scrollToSection(getStartedRef)}
                className="bg-[#101010] text-white px-5 py-2 rounded-full font-medium transition duration-200 text-lg"
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
          <ul className="md:hidden bg-white flex flex-col items-start space-y-4 pb-4 shadow-sm text-[#06281C]">
            <li>
              <button
                onClick={() => {
                  scrollToSection(featuresRef);
                  // setMenuOpen(false);
                }}
                className="text-lg font-medium text-gray-800 hover:text-gray-600"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(healthRef);
                  // setMenuOpen(false);
                }}
                className="text-lg font-medium text-gray-800 hover:text-gray-600"
              >
                Health
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(medicalRef);
                  // setMenuOpen(false);
                }}
                className="text-lg font-medium text-gray-800 hover:text-gray-600"
              >
                Medical
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  scrollToSection(getStartedRef);
                  // setMenuOpen(false);
                }}
                className="bg-[#101010] text-white px-5 py-2 rounded-full text-lg font-medium transition duration-200"
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
          className="bg-[#06281C]"
        >
          <div className="h-[50vh] md:h-[60vh] flex items-center justify-center mt-16">
            <div className="container max-w-6xl mx-auto md:px-20 flex flex-col items-center justify-center text-center space-y-5">
              <h1 className="text-4xl md:text-8xl font-extrabold text-[#FFFFFF]">
                {texts[currentTextIndex]}
              </h1>
              <p className="text-lg text-[#FFFFFF] max-w-3xl">
                {/* Check your health to get medical recommendations. */}
                We care about your Health.
              </p>
              <button
                onClick={() => scrollToSection(getStartedRef)}
                className="bg-[#234338] text-white px-12 h-12 rounded-full font-medium transition duration-200 shadow-2xl"
              >
                Let's check it
              </button>
            </div>
          </div>
        </section>
        {/* Features Content */}
        <section ref={featuresRef} className="bg-[#FFFFFF]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#06281C]">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1: Personalized Health Guidance */}
              <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md text-center">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#06281C]">
                  Personalized Health Guidance
                </h3>
                <p className="text-gray-600">
                  Receive advice tailored to your specific health needs, helping
                  you stay on track with your wellness goals.
                </p>
              </div>
              {/* Feature 2: Medical Resources */}
              <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md text-center">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#06281C]">
                  Medical Resources
                </h3>
                <p className="text-gray-600">
                  Access a curated library of reliable medical resources to
                  educate yourself on various health topics.
                </p>
              </div>
              {/* Feature 3: 24/7 Chat Support */}
              <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md text-center">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#06281C]">
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
        <section ref={healthRef} className="bg-[#06281C]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FFFFFF]">
              Health is Wealth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Health Assistance */}
              <div className="bg-[#234338] p-8 rounded-3xl shadow-md">
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
                <p className="text-gray-400 text-center">
                  Our platform offers comprehensive health assistance to guide
                  you through your wellness journey. From fitness tips to diet
                  recommendations, we have you covered.
                </p>
              </div>
              {/* Health Monitoring */}
              <div className="bg-[#234338] p-8 rounded-3xl shadow-md">
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
                <p className="text-gray-400 text-center">
                  Monitor your health metrics with our advanced tracking tools.
                  Keep an eye on your progress and stay motivated with real-time
                  updates.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Medical Content */}
        <section ref={medicalRef} className="bg-[#FFFFFF]">
          <div className="container mx-auto px-6 md:px-20 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#06281C]">
              Medical is Vitamin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Medical Consultation */}
              <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#06281C] text-center">
                  Medical Consultation
                </h3>
                <p className="text-gray-600 text-center">
                  Get expert medical consultations through our platform. Speak
                  to qualified professionals who can provide you with the
                  assistance you need.
                </p>
              </div>
              {/* Prescription Assistance */}
              <div className="bg-[#EEF8D3] p-8 rounded-3xl shadow-md">
                <Image
                  src="/health-icon.svg"
                  alt="Health Assistance"
                  width={60}
                  height={60}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold mb-4 text-[#06281C] text-center">
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
        {/* Get Started Section */}
        <section ref={getStartedRef} className="bg-[#000000]">
          <div className="px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Get Started
            </h2>
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto">
              <div className="mb-4">
                <label htmlFor="age" className="block text-lg font-medium">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
                  placeholder="Your age eg: 20years"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="symptoms" className="block text-lg font-medium">
                  Symptoms
                </label>
                <input
                  type="text"
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
                  placeholder="Your symptoms eg: Headache"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="medicalHistory"
                  className="block text-lg font-medium"
                >
                  Medical History
                </label>
                <input
                  type="text"
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
                  placeholder="Your medical history eg: Allergies"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="healthDescription"
                  className="block text-lg font-medium"
                >
                  Health Description
                </label>
                <textarea
                  id="healthDescription"
                  name="healthDescription"
                  value={formData.healthDescription}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg text-white outline-none bg-[#2f2f2f]"
                  placeholder="Your health description eg: I'm having fever"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className={`bg-[#234338] text-white px-4 py-3 rounded w-full ${
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
      <footer className={`bg-[#000000] ${archivo.className}`}>
        <div className="flex items-center justify-between p-5 h-16">
          <p className="text-white py-2 text-base">
            &copy; 2024 Survive Universe
          </p>
          <div className="flex items-center gap-2">
            <p className="text-white py-2 text-base">Got To Top</p>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => {
                scrollToSection(heroRef);
                setMenuOpen(false);
              }}
            >
              <rect width="48" height="48" rx="24" fill="#234338" />
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
