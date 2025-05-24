// pages/our-story.tsx
"use client";

import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import UnderConstruction from "@/components/UnderConstruction";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function WeddingDetailsPage() {
  return (
    <>
      <Head>
        <title>Our Story – Ronnel & Junna</title>
        <meta name="description" content="Our love story – Ronnel & Junna" />
      </Head>
      <NavBar />

      <main
        className={`${playfair.className} antialiased bg-white text-gray-800`}
      >
        <UnderConstruction />
      </main>

      <Footer />
    </>
  );
}
