"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const UnderConstruction: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <Image
          src="/images/under-construction.png"
          alt="Under Construction"
          width={300}
          height={300}
          className="mx-auto mb-6"
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re working hard to bring this page to life. Check back soon!
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
