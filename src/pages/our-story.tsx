// pages/our-story.tsx
"use client";

import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Preloader from "@/components/preloader";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function OurStoryPage() {
  return (
    <>
      <Head>
        <title>Our Story – Ronnel & Junna</title>
        <meta name="description" content="Our love story – Ronnel & Junna" />
      </Head>
      <NavBar />

      <main className={`${playfair.className} antialiased bg-white text-gray-800`}>
        <Preloader/>
        {/* Hero Section */}
        <motion.section
          className="py-16 text-center bg-pink-50 px-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold">He asked her & she said yes!</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Aenean aliquam augue turpis, in tempor elit condimentum sit amet. Phasellus a sapien tincidunt nunc dapibus mollis.
          </p>
        </motion.section>

        {/* Bride & Groom Section */}
        <motion.section
          className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[{
            name: "Ronnel Barashari",
            img: "/images/slider1.jpg",
            text: "Someone once told me that \"when you meet the right person, you'll know.\" Well, I just knew. Right away, we connected in a way that left me feeling complete.",
          }, {
            name: "Junna Kudo",
            img: "/images/slider2.jpg",
            text: "Someone once told me that \"when you meet the right person, you'll know.\" Well, I just knew. Right away, we connected in a way that left me feeling complete.",
          }].map((person, idx) => (
            <motion.div key={idx} className="text-center" variants={fadeInUp}>
              <Image src={person.img} alt={person.name} width={200} height={250} className="w-52 h-52 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-4" />
              <h2 className="text-2xl font-semibold">{person.name}</h2>
              <p className="text-gray-600 mt-2">{person.text}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Quote Section */}
        <motion.section
          className="py-12 bg-gray-100 text-center px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <blockquote className="text-xl italic max-w-3xl mx-auto text-gray-700">
            “Today and always, beyond tomorrow, I need you beside me, always as my best friend, lover and forever soul mate.”
          </blockquote>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          className="py-16 max-w-4xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Love Story</h2>

          {[{
            title: "Our First Date & Kiss",
            img: "/images/slider3.jpg",
            text: "Ronnel was extremely nervous... It was...PERFECT!",
            date: "September 22, 2018",
            reverse: false
          }, {
            title: "Some of Our Most Memorable Moments",
            img: "/images/slider4.jpg",
            text: "They travelled to the Baltic region...",
            date: "2019",
            reverse: true
          }, {
            title: "She Said Yes!",
            img: "/images/slider5.jpg",
            text: "Ronnel's nerves got the best of him... best proposal a girl could ask for!",
            date: "July 15, 2021",
            reverse: false
          }].map(({ title, img, text, date, reverse }, idx) => (
            <motion.div key={idx} className={`mb-12 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`} variants={fadeInUp}>
              <div className="md:w-1/2">
                <Image src={img} alt={title} width={300} height={300} className="rounded-lg shadow-md w-full" />
              </div>
              <div className={`md:w-1/2 ${reverse ? 'md:pr-8' : 'md:pl-8'} mt-4 md:mt-0`}>
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
              <p className="text-sm text-gray-500 text-center w-full mt-2">{date}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
