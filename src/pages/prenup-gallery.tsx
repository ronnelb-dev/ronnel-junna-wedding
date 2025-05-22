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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface GalleryImage {
  src: string;
}

const imageCount = 139;
const batchSize = 24;

const images: GalleryImage[] = Array.from({ length: imageCount }, (_, i) => ({
  src: `/prenup/DSC${i + 1}.jpg`,
}));

export default function PrenupGalleryPage() {
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>(
    images.slice(0, batchSize)
  );
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

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
  }, [visibleImages.length]);

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
        <meta name="description" content="Ronnel and Junna Prenup" />
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
                onClick={() => showImage(idx)}
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

          {/* Lightbox Modal */}
          {currentIndex !== null && (
            <div className="fixed inset-0 bg-black bg-black/80 flex items-center justify-center z-50 px-4">
              <button
                className="absolute top-4 right-6 text-white text-3xl z-50 cursor-pointer"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

              <button
                className="absolute left-4 text-white text-4xl z-50 cursor-pointer"
                onClick={showPrev}
              >
                <FaChevronLeft />
              </button>

              <div className="flex flex-col items-center">
                <div className="relative w-[90vw] h-[80vh]">
                  <Image
                    src={images[currentIndex].src}
                    alt="Prenup Photo"
                    fill
                    className="object-contain rounded-md shadow-lg"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>

              <button
                className="absolute right-4 text-white text-4xl z-50 cursor-pointer"
                onClick={showNext}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {showVideoModal && (
            <div className="fixed inset-0 z-50 bg-black bg-black/80 flex items-center justify-center px-4">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl md:text-4xl z-50 cursor-pointer"
                onClick={() => setShowVideoModal(false)}
              >
                <FaTimes />
              </button>

              {/* Responsive Video Container */}
              <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/c-LAhOIwb-E?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
}
