"use client";
import { useCallback, useEffect, useState } from "react";
import "@/styles/globals.css";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface GalleryImage {
  src: string;
}

const batchSize = 24;

export async function getStaticProps() {
  const directoryPath = path.join(process.cwd(), "public/prenup");
  const files = fs.readdirSync(directoryPath);

  const images: GalleryImage[] = files
    .filter((file: string) => file.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((file: string) => ({ src: `/prenup/${file}` }));

  return {
    props: {
      images,
    },
  };
}

export default function PrenupGalleryPage({
  images,
}: {
  images: GalleryImage[];
}) {
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>(
    images.slice(0, batchSize)
  );
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageLoading, setModalImageLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const showImage = (index: number) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);
  const showNext = () =>
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  const showPrev = () =>
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );

  const loadMoreImages = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const nextImages = images.slice(
        visibleImages.length,
        visibleImages.length + batchSize
      );

      if (nextImages.length === 0) {
        setHasMore(false);
      } else {
        setVisibleImages((prev) => [...prev, ...nextImages]);
      }

      setIsLoading(false);
    }, 1000);
  }, [visibleImages.length, images]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;

      if (scrollY >= threshold && hasMore && !isLoading) {
        loadMoreImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadMoreImages]);

  return (
    <>
      <Head>
        <title>Ronnel & Junna - Prenup Gallery</title>
        <meta name="description" content="Prenup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${playfair.className} antialiased`}>
        <Preloader />
        <NavBar />

        <div className="bg-gray-100 min-h-screen py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
            Prenup Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {visibleImages.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer group transform transition-transform duration-300 ease-in-out hover:scale-105 opacity-0 animate-fade-in"
                onClick={() => {
                  setModalImageLoading(true);
                  showImage(idx);
                }}
              >
                <div className="relative w-full h-60">
                  <Image
                    src={img.src}
                    alt="Prenup Photo"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority={idx < 8}
                  />
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center mt-10">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 animate-spin border-t-blue-500"></div>
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-gray-600 mt-10 text-lg">
              🎉 You’ve reached the end of the gallery.
            </p>
          )}

          {currentIndex !== null && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
              onClick={(e) => {
                // Close modal only if backdrop itself is clicked
                if (e.target === e.currentTarget) {
                  closeModal();
                }
              }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-6 text-white text-3xl z-50 cursor-pointer"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

              {/* Previous Button */}
              <button
                className="absolute left-4 text-white text-4xl z-50 cursor-pointer"
                onClick={() => {
                  setModalImageLoading(true);
                  setSlideDirection("left");
                  showPrev();
                }}
              >
                <FaChevronLeft />
              </button>

              {/* Image with animation */}
              <div className="flex flex-col items-center relative w-[90vw] h-[80vh] overflow-hidden">
                {modalImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin border-t-blue-500"></div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={images[currentIndex].src}
                    initial={{
                      x: slideDirection === "left" ? -300 : 300,
                      opacity: 0,
                    }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                      x: slideDirection === "left" ? 300 : -300,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    onDragEnd={(event, info) => {
                      const offset = info.offset.x;
                      const velocity = info.velocity.x;

                      // Swipe left (next)
                      if (offset < -100 || velocity < -500) {
                        setModalImageLoading(true);
                        setSlideDirection("right");
                        showNext();
                      }
                      // Swipe right (previous)
                      else if (offset > 100 || velocity > 500) {
                        setModalImageLoading(true);
                        setSlideDirection("left");
                        showPrev();
                      }
                    }}
                  >
                    <Image
                      src={images[currentIndex].src}
                      alt="Prenup Photo"
                      fill
                      className={`object-contain rounded-md shadow-lg transition-opacity duration-700 ${
                        modalImageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, 80vw"
                      onLoadStart={() => setModalImageLoading(true)}
                      onLoadingComplete={() => setModalImageLoading(false)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                className="absolute right-4 text-white text-4xl z-50 cursor-pointer"
                onClick={() => {
                  setModalImageLoading(true);
                  setSlideDirection("right");
                  showNext();
                }}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
}
