// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
import { Manrope } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const manrope = Manrope({ subsets: ["latin"] });

export default function Help() {
  return (
    <>
      <Head>
        <title>Survive Universe | Health and Medical Platform</title>
        <meta
          name="description"
          content="Your personal companion for navigating tough times."
        />
        <meta name="viewport" content="width=deviceWidth, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navbar */}
      {/* <Navbar /> */}
      {/* Main Content */}
      <main
        className={`${manrope.className} bg-[#F3F3F1] h-screen flex items-center justify-center`}
      ></main>
      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
}
